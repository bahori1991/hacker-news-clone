import path from "node:path";
import { getEntryFiles } from "@packages/shared/getEntryFiles";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const srcDir = path.resolve(__dirname, "src");

const components = getEntryFiles(path.resolve(srcDir, "components"));
const hooks = getEntryFiles(path.resolve(srcDir, "hooks"));
const libs = getEntryFiles(path.resolve(srcDir, "libs"));

const normalizeEntry = (entries: Record<string, string>, prefix: string) => {
  return Object.fromEntries(
    Object.entries(entries).map(([key, value]) => [`${prefix}/${key}`, value]),
  );
};

const entry = {
  ...normalizeEntry(components, "components"),
  ...normalizeEntry(hooks, "hooks"),
  ...normalizeEntry(libs, "libs"),
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    tsconfigPaths(),
    dts({
      include: ["src/**/*"],
      exclude: ["src/**/*.test.*", "src/**/*.stories.*"],
    }),
  ],
  build: {
    lib: {
      entry,
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "tailwindcss",
        "clsx",
        "class-variance-authority",
        "lucide-react",
        "tailwind-merge",
        "tw-animate-css",
        "@radix-ui/react-slot",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
