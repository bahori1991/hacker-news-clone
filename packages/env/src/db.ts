export function getDatabaseUrl() {
  const user = process.env.POSTGRES_USER;
  const password = process.env.POSTGRES_PASSWORD;
  const host = process.env.POSTGRES_HOST;
  const port = process.env.POSTGRES_PORT;
  const database = process.env.POSTGRES_DB;

  const missingVariables: string[] = [];
  if (!user) missingVariables.push("POSTGRES_USER");
  if (!password) missingVariables.push("POSTGRES_PASSWORD");
  if (!host) missingVariables.push("POSTGRES_HOST");
  if (!port) missingVariables.push("POSTGRES_PORT");
  if (!database) missingVariables.push("POSTGRES_DB");

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing Environment Variables: ${missingVariables.join(", ")}`,
    );
  }

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}
