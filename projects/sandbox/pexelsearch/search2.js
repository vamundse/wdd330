import { createClient } from 'pexels';

const client = createClient('0Xmgg5L21pld4C4feCt6bCxEpXvEgq2zyzs0RGY2PzhHsGCQdWCRFPUY');
const query = 'Nature';

client.photos.search({ query, per_page: 1 }).then(photos => {...});
