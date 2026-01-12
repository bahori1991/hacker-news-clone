import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    client: "src/client.ts",
    server: "src/server.ts",
  },
  fixedExtension: false,
  format: ["esm"],
  dts: {
    eager: true,
  },
  clean: true,
  outDir: "dist",
  sourcemap: true,
});
