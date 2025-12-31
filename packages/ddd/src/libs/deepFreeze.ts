export function deepFreeze<T>(obj: T): T {
  // 基本型や null、Date はすでに不変な値なので、そのまま返す
  if (typeof obj !== "object" || obj === null || obj instanceof Date) {
    return obj;
  }

  // すでに凍結されているオブジェクトはそのまま返す
  if (Object.isFrozen(obj)) {
    return obj;
  }

  // オブジェクトのプロパティを再帰的に凍結する
  Object.keys(obj).forEach((key) => {
    const value = (obj as Record<string, unknown>)[key];
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof Date)
    ) {
      deepFreeze(value);
    }
  });

  return obj as T;
}
