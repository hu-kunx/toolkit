import {safeParserJSON} from '../shared/parser';

type Params = Record<string, string | Object>;
type Control<T extends Record<string, unknown>, Auto extends boolean = true> = {
  [P in keyof T]: {
    set: (value: T[P]) => void;
    get: <A extends boolean | undefined = undefined>(
      automaticDecode?: A
    ) => A extends true ? T[P] : A extends false ? string : Auto extends true ? T[P] : string;
    del: () => void;
  };
};

type StorageControl<T extends Record<string, unknown>, Auto extends boolean = true> = Control<T, Auto> & {
  clear: () => void;
};

type Options<Auto extends boolean = true> = {
  // 是否进行 JSON 解码
  automaticDecode?: Auto;
};

// storage 的简单包装，自动转换JSON字符串
export function getStorageControl<K extends Params, Auto extends boolean = true>(
  storage: Storage,
  kv: K,
  options: Options<Auto> = {}
): StorageControl<K, Auto> {
  const keys = Object.keys(kv);
  const result = {} as StorageControl<K, Auto>;
  for (const key of keys) {
    // @ts-ignore
    result[key] = {
      set(value: string | object) {
        if (typeof value === 'object') {
          storage.setItem(key, JSON.stringify(value));
          return;
        }
        storage.setItem(key, value.toString());
      },
      get(automaticDecode?: boolean) {
        const defaultValue = kv[key];
        const value = storage.getItem(key);
        if (!value) return defaultValue;
        const isNeedDecode = automaticDecode ?? options.automaticDecode;
        return isNeedDecode ? safeParserJSON(value, defaultValue) : defaultValue;
      },
      del() {
        storage.removeItem(key);
      },
    };
  }
  result.clear = () => {
    for (const key of keys) {
      storage.removeItem(key);
    }
  };
  return result;
}

getStorageControl(sessionStorage, {
  userInfo: {
    name: '',
  },
}).userInfo.get();
