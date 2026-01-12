import { getEntryFiles } from "@packages/shared/getEntryFiles";
import { defineConfig } from "tsdown";

const entry = getEntryFiles("src");

export default defineConfig({
  entry,
  fixedExtension: false,
  format: ["esm"],
  dts: {
    eager: true,
  },
  clean: true,
  outDir: "dist",
  sourcemap: true,
});
