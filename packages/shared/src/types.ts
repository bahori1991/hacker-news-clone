type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? Record<string, never> : { data: T });

type Equals<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

type Identify<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

type NestedIdentify<T> = T extends object
  ? T extends infer U
    ? { [K in keyof U]: NestedIdentify<U[K]> }
    : never
  : T;

export type { SuccessResponse, Equals, Identify, NestedIdentify };
