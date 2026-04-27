/**
 * Post-processes the @hey-api/openapi-ts output to ensure the REST base URL is always sourced from
 * the environment variable `EXPO_PUBLIC_API_URL`.
 * This guarantees that the app consistently targets the API endpoint defined in your environment configuration.
 *
 * Only touches:
 * - `types.gen.ts` — `ClientOptions.baseUrl` becomes `string` instead of `'https://…' | (string & {})`
 * - `client.gen.ts` — `createConfig({ baseUrl })` uses `process.env.EXPO_PUBLIC_API_URL`
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'src/lib/hey-api/generated');
const FILES = ['types.gen.ts', 'client.gen.ts'] as const;

const UNION = /baseUrl:\s*'https?:\/\/[^']+'\s*\|\s*\(string\s*&\s*\{\}\)/g;
const LITERAL = /baseUrl:\s*'https?:\/\/[^']+'/g;

async function main() {
  let patched = 0;
  for (const name of FILES) {
    const filePath = path.join(ROOT, name);
    let s = await fs.readFile(filePath, 'utf8');
    const before = s;
    s = s
      .replace(UNION, 'baseUrl: string')
      .replace(LITERAL, 'baseUrl: process.env.EXPO_PUBLIC_API_URL');
    if (s !== before) {
      await fs.writeFile(filePath, s, 'utf8');
      patched += 1;
      console.log('patched baseUrl in', path.relative(process.cwd(), filePath));
    }
  }
  if (patched === 0) {
    console.warn('patch-hey-api-generated: nothing to patch.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
