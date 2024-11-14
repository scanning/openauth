export interface StorageAdapter {
  get(key: string[]): Promise<any | null>;
  remove(key: string[]): Promise<void>;
  set(key: string[], value: any, ttl?: number): Promise<void>;
  scan(prefix: string[]): AsyncIterable<[string, any]>;
}

const SEPERATOR = String.fromCharCode(0x1f);

export function joinKey(key: string[]) {
  return key.join(SEPERATOR);
}

export function splitKey(key: string) {
  return key.split(SEPERATOR);
}

export namespace Storage {
  function encode(key: string[]) {
    return key.map((k) => k.replaceAll(SEPERATOR, ""));
  }
  export function get<T>(adapter: StorageAdapter, key: string[]) {
    return adapter.get(encode(key)) as Promise<T | null>;
  }

  export function set(
    adapter: StorageAdapter,
    key: string[],
    value: any,
    ttl?: number,
  ) {
    return adapter.set(encode(key), value, ttl);
  }

  export function remove(adapter: StorageAdapter, key: string[]) {
    return adapter.remove(encode(key));
  }

  export function scan(adapter: StorageAdapter, key: string[]) {
    return adapter.scan(encode(key));
  }
}