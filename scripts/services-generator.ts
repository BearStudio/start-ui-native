import axios from 'axios';
import 'dotenv/config';
import camelCase from 'lodash/camelCase';
import {
  generateZodClientFromOpenAPI,
  getHandlebars,
} from 'openapi-zod-client';

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
    console.log('API client generated successfully.');
  } catch (error) {
    console.error('Error generating API client:', error);
  }
}

// Retrieving the URL from the command line arguments
const openApiDocUrl =
  process.env.OPEN_API_URL ?? 'http://localhost:3000/api/openapi.json';
generateClient(openApiDocUrl);
