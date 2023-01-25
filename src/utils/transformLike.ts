// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as deepcopy from 'deepcopy';
import { Between, Like } from 'typeorm';
export const transformLike = <T extends object>(options: T) => {
  const newOptions = deepcopy(options);
  for (const option in options) {
    if (typeof options[option] === 'string') {
      newOptions[option] = Like(`%${options[option]}%`) as T[Extract<
        keyof T,
        string
      >];
    } else if (typeof options[option] === 'number') {
      newOptions[option] = options[option];
    } else if (options[option] instanceof Array) {
      if (options[option][1]) {
        newOptions[option] = Between(
          options[option][0],
          options[option][1],
        ) as T[Extract<keyof T, string>];
      }
    }
  }
  return newOptions;
};
