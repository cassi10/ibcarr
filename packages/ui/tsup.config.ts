import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    clean: true,
    format: ["cjs", "esm"],
    dts: true,
    external: ["react"],
    entry: ["./src/index.ts"],
    minify: !options.watch,
    inject: ["./src/react-import.ts"]
  };
});
