import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')
);

const VERSION_REGEX = /^v\d+\.\d+\.\d+$/;

function compareVersions(a, b) {
  const pa = a.slice(1).split('.').map(Number);
  const pb = b.slice(1).split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

function readAvailableVersions(publicDir) {
  if (!fs.existsSync(publicDir)) return [];
  return fs
    .readdirSync(publicDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && VERSION_REGEX.test(entry.name))
    .map(entry => entry.name)
    .sort(compareVersions);
}

function availableVersionsPlugin() {
  const virtualId = 'virtual:available-versions';
  const resolvedId = '\0' + virtualId;
  const publicDir = path.resolve(__dirname, 'public');

  return {
    name: 'available-versions',
    resolveId(id) {
      if (id === virtualId) return resolvedId;
    },
    load(id) {
      if (id !== resolvedId) return;
      const versions = readAvailableVersions(publicDir);
      return `export const availableVersions = ${JSON.stringify(versions)};`;
    },
    configureServer(server) {
      server.watcher.add(publicDir);
      const invalidate = file => {
        if (!file.startsWith(publicDir)) return;
        const mod = server.moduleGraph.getModuleById(resolvedId);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      };
      server.watcher.on('addDir', invalidate);
      server.watcher.on('unlinkDir', invalidate);
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [vue(), availableVersionsPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  server: {
    port: 3737,
    open: false,
  },
  publicDir: 'public',
});
