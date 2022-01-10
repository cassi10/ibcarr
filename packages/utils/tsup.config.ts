import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    format: ["cjs", "esm"],
    dts: true,
    entry: ["./src/index.ts"],
    minify: !options.watch
  };
});
