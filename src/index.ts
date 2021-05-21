type DefaultType = { [key: string]: unknown };

export function mapping<FROM = DefaultType, TO = DefaultType>({
  from,
  mapper,
  handle
}: {
  from: FROM;
  mapper: {
    [key: string]: keyof FROM;
  };
  handle?: (from: FROM) => Partial<TO>;
}): Partial<TO> {
  const result: Partial<TO> = {};

  for (const key of Object.keys(mapper)) {
    const fromKey = mapper[key];
    if (from[fromKey] != undefined) {
      result[key] = from[fromKey];
    }
  }

  return {
    ...result,
    ...(handle ? handle(from) : null)
  };
}
