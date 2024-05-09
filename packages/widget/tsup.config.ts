import type { Options } from "tsup";
import { defineConfig } from "tsup";

const defaultOptions: Options = {
  cjsInterop: true,
  clean: true,
  format: ["cjs", "esm"],
  shims: true,
  splitting: true,
  treeshake: true,
  sourcemap: true,
};

export default defineConfig(({ watch }) => [
  {
    ...defaultOptions,
    dts: {
      banner: '/// <reference types="../types/global" />',
    },
    entry: ["src/index.ts"],
    external: [/^@cosmjs\/.*/, "graz", "@skip-router/core"],
    format: ["cjs", "esm"],
    minify: !watch,
  },
]);
