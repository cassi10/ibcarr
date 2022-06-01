type KeysOf<T> = keyof T;

export type Words = typeof import("./words.json");
export type WordLengths = KeysOf<Words>;
