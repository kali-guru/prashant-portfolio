import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const output = fileURLToPath(new URL('../docs/', import.meta.url));
const built = fileURLToPath(new URL('../dist/', import.meta.url));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(built, output, { recursive: true });
console.log('GitHub Pages output is ready in docs/.');
