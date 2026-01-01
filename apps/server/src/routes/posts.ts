import { zValidator } from "@hono/zod-validator";
import type { User } from "@packages/auth/types";
import {
  and,
  asc,
  countDistinct,
  db,
  desc,
  eq,
  getISOFormatDateQuery,
  isNull,
  sql,
} from "@packages/db";
import { usersTable } from "@packages/db/schemas/auth";
import {
  commentsTable,
  createCommentSchema,
} from "@packages/db/schemas/comments";
import { createPostSchema, postsTable } from "@packages/db/schemas/posts";
import {
  commentUpvotesTable,
  postUpvotesTable,
} from "@packages/db/schemas/upvotes";
import type { SuccessResponse } from "@packages/shared/types";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import z from "zod";
import type { Context } from "../context";
import { loggedIn } from "../middlewares/loggedIn";

export type Post = {
  id: number;
  title: string;
  url: string;
  points: number;
  createdAt: string;
  commentCount: number;
  author: {
    id: string;
    name: string;
  };
  isUpvoted: boolean;
};

export type Comment = {
  id: number;
  userId: string;
  content: string;
  points: number;
  depth: number;
  commentCount: number;
  createdAt: string;
  postId: number;
  parentCommentId: number | null;
  commentUpvotes: {
    userId: string;
  }[];
  author: {
    id: string;
    name: string;
  };
  childComments?: Comment[];
};

export type PaginatedResponse<T> = {
  pagination: {
    page: number;
    totalPages: number;
  };
  data: T;
} & Omit<SuccessResponse<unknown>, "data">;

const sortBySchema = z.enum(["points", "recent"]);
const orderSchema = z.enum(["asc", "desc"]);

const paginationSchema = z.object({
  limit: z.coerce.number().optional().default(10),
  page: z.coerce.number().optional().default(1),
  sortBy: sortBySchema.optional().default("points"),
  order: orderSchema.optional().default("desc"),
  author: z.string().optional(),
  site: z.string().optional(),
});

export const postsRoutes = new Hono<Context>()
  .post("/", loggedIn, zValidator("form", createPostSchema), async (c) => {
    const { title, url, content } = c.req.valid("form");
    const user = c.get("user") as User;
    const [post] = await db
      .insert(postsTable)
      .values({ title, content, url, userId: user.id })
      .returning({ id: postsTable.id });
    return c.json<SuccessResponse<{ postId: number }>>(
      {
        success: true,
        message: "Post created successfully",
        data: { postId: post?.id ?? 0 },
      },
      201,
    );
  })
  .get("/", zValidator("query", paginationSchema), async (c) => {
    const { limit, page, sortBy, order, author, site } = c.req.valid("query");
    const user = c.get("user") as User;

    const offset = (page - 1) * limit;

    const sortByColumn =
      sortBy === "points" ? postsTable.points : postsTable.createdAt;
    const sortOrder = order === "asc" ? asc(sortByColumn) : desc(sortByColumn);

    const [count] = await db
      .select({ count: countDistinct(postsTable.id) })
      .from(postsTable)
      .where(
        and(
          author ? eq(postsTable.userId, author) : undefined,
          site ? eq(postsTable.url, site) : undefined,
        ),
      );

    const postsQuery = db
      .select({
        id: postsTable.id,
        title: postsTable.title,
        url: postsTable.url,
        points: postsTable.points,
        createdAt: getISOFormatDateQuery(postsTable.createdAt),
        commentCount: postsTable.commentCount,
        author: {
          id: usersTable.id,
          name: usersTable.name,
        },
        isUpvoted: user
          ? sql<boolean>`CASE WHEN ${postUpvotesTable.userId} IS NOT NULL THEN true ELSE false END`
          : sql<boolean>`false`,
      })
      .from(postsTable)
      .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
      .orderBy(sortOrder)
      .limit(limit)
      .offset(offset)
      .where(
        and(
          author ? eq(postsTable.userId, author) : undefined,
          site ? eq(postsTable.url, site) : undefined,
        ),
      );

    if (user) {
      postsQuery.leftJoin(
        postUpvotesTable,
        and(
          eq(postUpvotesTable.postId, postsTable.id),
          eq(postUpvotesTable.userId, user.id),
        ),
      );
    }

    const posts = await postsQuery;

    return c.json<PaginatedResponse<Post[]>>(
      {
        data: posts as Post[],
        success: true,
        message: "Posts fetched successfully",
        pagination: {
          page,
          totalPages: Math.ceil((count?.count ?? 1) / limit) as number,
        },
      },
      200,
    );
  })
  .post(
    "/:id/upvote",
    loggedIn,
    zValidator("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const user = c.get("user") as User;
      let pointsChange: -1 | 1 = 1;

      const points = await db.transaction(async (tx) => {
        const [existingUpvote] = await tx
          .select()
          .from(postUpvotesTable)
          .where(
            and(
              eq(postUpvotesTable.postId, id),
              eq(postUpvotesTable.userId, user.id),
            ),
          )
          .limit(1);

        pointsChange = existingUpvote ? -1 : 1;

        const [updated] = await tx
          .update(postsTable)
          .set({ points: sql`${postsTable.points} + ${pointsChange}` })
          .where(eq(postsTable.id, id))
          .returning({ points: postsTable.points });

        if (!updated) {
          throw new HTTPException(404, { message: "Post not found" });
        }

        if (existingUpvote) {
          await tx
            .delete(postUpvotesTable)
            .where(eq(postUpvotesTable.id, existingUpvote.id));
        } else {
          await tx.insert(postUpvotesTable).values({
            postId: id,
            userId: user.id,
          });
        }

        return updated.points;
      });

      return c.json<SuccessResponse<{ count: number; isUpvoted: boolean }>>(
        {
          success: true,
          message: "Post upvoted successfully",
          data: { count: points, isUpvoted: pointsChange > 0 },
        },
        200,
      );
    },
  )
  .post(
    "/:id/comment",
    loggedIn,
    zValidator("param", z.object({ id: z.coerce.number() })),
    zValidator("form", createCommentSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const { content } = c.req.valid("form");
      const user = c.get("user") as User;

      const [comment] = await db.transaction(async (tx) => {
        const [updated] = await tx
          .update(postsTable)
          .set({ commentCount: sql`${postsTable.commentCount} + 1` })
          .where(eq(postsTable.id, id))
          .returning({ commentCount: postsTable.commentCount });

        if (!updated) {
          throw new HTTPException(404, { message: "Post not found" });
        }

        return await tx
          .insert(commentsTable)
          .values({
            content,
            userId: user.id,
            postId: id,
          })
          .returning({
            id: commentsTable.id,
            userId: commentsTable.userId,
            content: commentsTable.content,
            postId: commentsTable.postId,
            points: commentsTable.points,
            depth: commentsTable.depth,
            parentCommentId: commentsTable.parentCommentId,
            createdAt: getISOFormatDateQuery(commentsTable.createdAt).as(
              "created_at",
            ),
            commentCount: commentsTable.commentCount,
          });
      });

      return c.json<SuccessResponse<Comment>>(
        {
          success: true,
          message: "Comment created successfully",
          data: {
            ...comment,
            commentUpvotes: [],
            childComments: [],
            author: {
              id: user.id,
              name: user.name,
            },
          } as Comment,
        },
        201,
      );
    },
  )
  .get(
    "/:id/comments",
    zValidator("param", z.object({ id: z.coerce.number() })),
    zValidator(
      "query",
      paginationSchema.extend({
        includeChildren: z.coerce.boolean().optional(),
      }),
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const { limit, page, sortBy, order, includeChildren } =
        c.req.valid("query");
      const user = c.get("user");

      const offset = (page - 1) * limit;

      const [postExists] = await db
        .select({ exists: sql`1` })
        .from(postsTable)
        .where(eq(postsTable.id, id))
        .limit(1);

      if (!postExists) {
        throw new HTTPException(404, { message: "Post not found" });
      }

      const sortByColumn =
        sortBy === "points" ? commentsTable.points : commentsTable.createdAt;
      const sortOrder =
        order === "asc" ? asc(sortByColumn) : desc(sortByColumn);

      const [count] = await db
        .select({ count: countDistinct(commentsTable.id) })
        .from(commentsTable)
        .where(
          and(
            eq(commentsTable.postId, id),
            isNull(commentsTable.parentCommentId),
          ),
        )
        .limit(1);

      const comments = await db.query.commentsTable.findMany({
        where: and(
          eq(commentsTable.postId, id),
          isNull(commentsTable.parentCommentId),
        ),
        orderBy: sortOrder,
        limit: limit,
        offset: offset,
        with: {
          author: { columns: { name: true, id: true } },
          commentUpvotes: {
            columns: { userId: true },
            where: eq(commentUpvotesTable.userId, user?.id ?? ""),
            limit: 1,
          },
          childComments: {
            limit: includeChildren ? 2 : 0,
            with: {
              author: { columns: { id: true, name: true } },
              commentUpvotes: {
                columns: { userId: true },
                where: eq(commentUpvotesTable.userId, user?.id ?? ""),
                limit: 1,
              },
            },
            orderBy: sortOrder,
            extras: {
              createdAt: getISOFormatDateQuery(commentsTable.createdAt).as(
                "created_at",
              ),
            },
          },
        },
        extras: {
          createdAt: getISOFormatDateQuery(commentsTable.createdAt).as(
            "created_at",
          ),
        },
      });

      return c.json<PaginatedResponse<Comment[]>>(
        {
          success: true,
          message: "Comments fetched successfully",
          data: comments as Comment[],
          pagination: {
            page,
            totalPages: Math.ceil((count?.count ?? 1) / limit) as number,
          },
        },
        200,
      );
    },
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.coerce.number() })),
    async (c) => {
      const user = c.get("user");
      const { id } = c.req.valid("param");

      const postQuery = db
        .select({
          id: postsTable.id,
          title: postsTable.title,
          url: postsTable.url,
          points: postsTable.points,
          createdAt: getISOFormatDateQuery(postsTable.createdAt),
          commentCount: postsTable.commentCount,
          author: {
            id: usersTable.id,
            name: usersTable.name,
          },
          isUpvoted: user
            ? sql<boolean>`CASE WHEN ${postUpvotesTable.userId} IS NOT NULL THEN true ELSE false END`
            : sql<boolean>`false`,
        })
        .from(postsTable)
        .leftJoin(usersTable, eq(postsTable.userId, usersTable.id))
        .where(eq(postsTable.id, id));

      if (user) {
        postQuery.leftJoin(
          postUpvotesTable,
          and(
            eq(postUpvotesTable.postId, postsTable.id),
            eq(postUpvotesTable.userId, user.id),
          ),
        );
      }

      const [post] = await postQuery;
      if (!post) {
        throw new HTTPException(404, { message: "Post not found" });
      }

      return c.json<SuccessResponse<Post>>(
        {
          success: true,
          message: "Post fetched successfully",
          data: post as Post,
        },
        200,
      );
    },
  );
