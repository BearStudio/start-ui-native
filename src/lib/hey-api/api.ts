import { configureHeyApiClient } from '@/lib/hey-api/client.config';
import { client } from '@/lib/hey-api/generated/client.gen';

export * as api from './generated/@tanstack/react-query.gen';

client.setConfig(configureHeyApiClient());
