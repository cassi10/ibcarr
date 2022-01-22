import { defineConfig } from "tsup";

const config = defineConfig((options) => {
  return {
    format: ["cjs", "esm"],
    dts: true,
    entry: ["./src/index.ts"],
    minify: !options.watch
  };
});

export default config;
