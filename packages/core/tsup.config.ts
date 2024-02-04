import type { Options } from "tsup";
import { defineConfig } from "tsup";

const defaultOptions: Options = {
  cjsInterop: true,
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  minify: true,
  shims: true,
  splitting: true,
  treeshake: true,
  tsconfig: "./tsconfig.build.json",
};

export default defineConfig(async () => {
  return [
    {
      ...defaultOptions,
      entry: [
        "src/index.ts",
        "src/transactions.ts",
        //
      ],
    },
  ];
});
