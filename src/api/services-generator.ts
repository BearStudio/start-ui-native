import axios from 'axios';
import {
  generateZodClientFromOpenAPI,
  getHandlebars,
} from 'openapi-zod-client';
import _ from 'lodash';

const handlebars = getHandlebars();
handlebars.registerHelper('camelCase', _.camelCase);

async function generateClient() {
  try {
    const openApiDocUrl = 'https://start-ui-v2.vercel.app/api/openapi.json';
    const response = await axios.get(openApiDocUrl);
    const openApiDoc = response.data;

    await generateZodClientFromOpenAPI({
      openApiDoc,
      distPath: 'src/api/generated-api.ts',
      templatePath: 'src/api/client-template.hbs',
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

generateClient();
