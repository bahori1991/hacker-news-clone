import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**/*.ts"],
  fixedExtension: false,
  format: ["esm"],
  unbundle: true,
  dts: {
    eager: true,
  },
  clean: true,
  outDir: "dist",
  sourcemap: true,
});
