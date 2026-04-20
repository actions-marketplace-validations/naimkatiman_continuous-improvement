#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { PLUGIN_MODES, getPluginManifest } from "../lib/plugin-metadata.mjs";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PLUGINS_DIR = join(REPO_ROOT, "plugins");

await mkdir(PLUGINS_DIR, { recursive: true });

for (const mode of PLUGIN_MODES) {
  const outputPath = join(PLUGINS_DIR, `${mode}.json`);
  await writeFile(outputPath, `${JSON.stringify(getPluginManifest(mode), null, 2)}\n`);
  console.log(`Generated ${outputPath}`);
}
