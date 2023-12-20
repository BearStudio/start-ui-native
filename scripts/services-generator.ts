import 'dotenv/config'
import axios from 'axios';
import {
  generateZodClientFromOpenAPI,
  getHandlebars,
} from 'openapi-zod-client';
import camelCase from 'lodash/camelCase';

const handlebars = getHandlebars();
handlebars.registerHelper('camelCase', camelCase);

async function generateClient(openApiDocUrl: string) {
  try {
    const response = await axios.get(openApiDocUrl);
    const openApiDoc = response.data;

    await generateZodClientFromOpenAPI({
      openApiDoc,
      distPath: 'src/api/generated-api.ts',
      templatePath: 'scripts/client-template.hbs',
      handlebars,
      options: {
        baseUrl: process.env.API_URL ?? 'http://localhost:3000/api/rest',
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
const openApiDocUrl = process.argv[2];
generateClient(openApiDocUrl);
