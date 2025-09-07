import axios from 'axios';
import 'dotenv/config';
import fs from 'fs';
import camelCase from 'lodash/camelCase';
import {
  generateZodClientFromOpenAPI,
  getHandlebars,
} from 'openapi-zod-client';
import path from 'path';

const handlebars = getHandlebars();
handlebars.registerHelper('camelCase', camelCase);

async function generateClient(openApiDocUrl: string) {
  try {
    console.log(`Getting open api file from ${openApiDocUrl}`);
    const response = await axios.get(openApiDocUrl);
    const openApiDoc = response.data;

    await generateZodClientFromOpenAPI({
      openApiDoc,
      distPath: 'src/api/generated-api.ts',
      templatePath: 'scripts/client-template.hbs',
      handlebars,
      options: {
        withAlias: true,
        defaultStatusBehavior: 'auto-correct',
        shouldExportAllTypes: true,
        shouldExportAllSchemas: true,
      },
    });

    // ==== POST-PROCESS: replace uppercase CUID regex with .cuid() ====
    const target = path.resolve(__dirname, '../src/api/generated-api.ts');
    let code = fs.readFileSync(target, 'utf-8');
    code = code.replace(
      /\.regex\(\/\^\[0-9A-HJKMNP-TV-Z\]\{26\}\$\/\)/g,
      '.cuid()'
    );
    fs.writeFileSync(target, code, 'utf-8');

    console.log('API client generated successfully.');
  } catch (error) {
    console.error('Error generating API client:', error);
  }
}

// Retrieving the URL from the command line arguments
const openApiDocUrl =
  process.env.OPEN_API_URL ?? 'http://localhost:3000/api/openapi.json';

console.log(openApiDocUrl);
generateClient(openApiDocUrl);
