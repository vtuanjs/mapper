type DefaultType = { [key: string]: unknown };

type OptionProp = {
  setValueWhenNull?: string;
  setValueWhenUndefined?: string;
};

type PartialDeep<T> = { [P in keyof T]?: PartialDeep<T[P]> };

export function mapping<SOURCE = DefaultType, DESTINATION = DefaultType>({
  from,
  mapper,
  handle,
  option
}: {
  from: SOURCE;
  mapper: {
    [key: string]: keyof SOURCE;
  };
  handle?: (from: SOURCE) => PartialDeep<DESTINATION>;
  option?: OptionProp;
}): DESTINATION {
  const result: DESTINATION = {} as any;

  for (const key of Object.keys(mapper)) {
    const fromKey = mapper[key];
    if (!(from[fromKey] === undefined || from[fromKey] === null)) {
      result[key] = from[fromKey];
    }

    if (from[fromKey] === null && option?.setValueWhenNull != undefined) {
      result[key] = option.setValueWhenNull;
    }

    if (from[fromKey] === undefined && option?.setValueWhenUndefined != undefined) {
      result[key] = option.setValueWhenUndefined;
    }
  }

  return {
    ...result,
    ...(handle ? handle(from) : null)
  };
}
