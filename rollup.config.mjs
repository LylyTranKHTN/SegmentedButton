import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import svg from "rollup-plugin-svg";
import terser from "@rollup/plugin-terser";
import typescriptEngine from "typescript";
import external from "rollup-plugin-peer-deps-external";

import packageJson from "./package.json" assert { type: "json" };

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
        exports: "named",
        name: packageJson.name,
      },
      {
        file: packageJson.module,
        format: "es",
        exports: "named",
        sourcemap: true,
      },
    ],
    plugins: [
      postcss({
        extensions: [".css", ".scss"],
        inject: true,
        extract: false,
        minimize: true,
      }),
      svg({ base64: true }),
      resolve({
        moduleDirectories: ["node_modules"],
      }),
      external({ includeDependencies: true }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        typescript: typescriptEngine,
        exclude: [
          "coverage",
          ".storybook",
          "storybook-static",
          "dist",
          "node_modules/**",
          "*.cjs",
          "*.mjs",
          "**/__tests__",
          "**/*.test.ts+(|x)",
          "**/*.mdx",
          "**/*.stories.ts+(|x)",
          "**/*.stories.js+(|x)",
          "vitest.config.ts",
        ],
      }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|scss)$/],
  },
];
