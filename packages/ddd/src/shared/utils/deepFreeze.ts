function deepFreeze<T>(value: T): T {
  // 基本型や null、Date はすでに不変な値なので、そのまま返す
  if (typeof value !== "object" || value === null || value instanceof Date) {
    return value;
  }

  // すでに凍結されているオブジェクトはそのまま返す
  if (Object.isFrozen(value)) {
    return value;
  }

  // 配列を凍結する
  if (Array.isArray(value)) {
    value.forEach((item) => {
      deepFreeze(item);
    });
    return Object.freeze(value) as T;
  }

  // オブジェクトのプロパティを再帰的に凍結する
  Object.keys(value).forEach((key) => {
    const item = (value as Record<string, unknown>)[key];
    if (typeof item === "object" && item !== null && !(item instanceof Date)) {
      deepFreeze(item as T);
    }
  });

  return Object.freeze(value) as T;
}

export { deepFreeze };