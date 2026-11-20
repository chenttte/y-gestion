import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
  plugins: [
    // src/server.ts envuelve el entry de TanStack Start con la página de error SSR.
    tanstackStart({ server: { entry: "server" } }),
    // Preset fijo: si no, Nitro detecta el runtime del build (Bun en Docker) y genera
    // un servidor para Bun, que falla al ejecutarse con Node.
    nitro({ preset: "node-server" }),
    viteReact(),
    tailwindcss(),
  ],
});
