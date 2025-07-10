// service-worker.js

// Define o nome do cache e os ativos que serão armazenados em cache
const CACHE_NAME = 'calculadoras-enfermagem-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css', // Se você tiver um arquivo CSS separado
  '/header.js', // O arquivo JS que segregamos anteriormente
  '/manifest.json',
  '/favicon.ico',
  '/header_logotipo_versao_horizontal_cromatico_cor_branco.png', // Logotipo do cabeçalho atualizado
  '/twitter_logotipo_versao_horizontal_cromatico_cor_branco.png', // Imagem de compartilhamento (twitter) atualizada
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  '/assets/icons/icon-maskable-192x192.png',
  '/assets/icons/icon-maskable-512x512.png',
  '/foot_logotipo_versao_horizontal_cromatico_cor_branco.png', // Logotipo do rodapé atualizado
  // Adicione aqui todos os outros arquivos estáticos que sua aplicação precisa para funcionar offline
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Inter:wght@400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://cdn.jsdelivr.net/gh/antijingoist/opendyslexic/web/opendyslexic.css',
  'https://vlibras.gov.br/app/vlibras-plugin.js'
];

// Evento 'install': ocorre quando o service worker é instalado pela primeira vez.
// Aqui, abrimos um cache e adicionamos todos os ativos definidos em 'urlsToCache'.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto: ', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Falha ao adicionar ao cache durante a instalação:', error);
      })
  );
});

// Evento 'activate': ocorre quando o service worker é ativado.
// Aqui, limpamos caches antigos para garantir que apenas a versão mais recente esteja ativa.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
          return null; // Retorna null para caches que não devem ser deletados
        }).filter(Boolean) // Filtra os valores nulos
      );
    })
  );
});

// Evento 'fetch': ocorre sempre que o navegador tenta buscar um recurso.
// Aqui, interceptamos as requisições e tentamos servir os recursos do cache primeiro.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o recurso estiver no cache, o retornamos.
        if (response) {
          return response;
        }
        // Se o recurso não estiver no cache, buscamos na rede.
        return fetch(event.request)
          .then((networkResponse) => {
            // Verifica se a resposta da rede é válida antes de clonar
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clona a resposta da rede porque ela é um stream e só pode ser consumida uma vez.
            // Precisamos consumi-la para o navegador e para o cache.
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Adiciona a resposta da rede ao cache para futuras requisições.
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.error('Falha na requisição de rede:', error);
            // Você pode retornar uma página offline aqui se desejar
            // Por exemplo: return caches.match('/offline.html');
            return new Response('<h1>Offline</h1><p>Não foi possível carregar o conteúdo.</p>', {
                headers: { 'Content-Type': 'text/html' }
            });
          });
      })
  );
});

// Evento 'message': permite que a página principal se comunique com o service worker.
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting(); // Força a ativação do novo service worker imediatamente
  }
});
