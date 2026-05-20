# Intelite - Vue + Vuetify

Projeto migrado para **Vue 3** + **Vuetify 3**, com layout em **duas colunas** e navegação em **árvore** (pastas que abrem as outras pastas/itens abaixo).

## Como rodar

```bash
npm install
npm run dev
```

Acesse o endereço que o Vite mostrar (geralmente `http://localhost:3000`).

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`. Para publicar, use o conteúdo da pasta `dist/`.

## Estrutura (frontend)

- **`frontend/src/App.vue`** – Layout com barra superior (logo), duas colunas e dois `v-treeview`.
- **`frontend/src/config/appConfig.js`** – Fonte única para links de navegação, URLs de recursos e integrações externas.
- **`frontend/src/data/treeData.js`** – Estrutura das árvores de **Tutoriais** e **APKs**, referenciando as URLs a partir do `appConfig.js`.
- **`frontend/src/main.js`** – Entrada da aplicação e uso do Vuetify.
- **`frontend/src/plugins/vuetify.js`** – Configuração do Vuetify (tema, ícones).
- **`public/`** – Assets estáticos (ícone e logo). O Vite serve em `/`.

## Comportamento

- **Coluna esquerda – Tutoriais:** raiz “Tutoriais” → AiChekin, Atendimento Inteligente, Avalize. Cada nó pode ser expandido para ver os vídeos; ao clicar no título do vídeo, o link abre em nova aba.
- **Coluna direita – APKs:** raiz “APKs” → Totem, Painel, Outros. Cada nó pode ser expandido para ver os APKs; ao clicar no título, o link do Drive abre em nova aba.

Para alterar links/URLs, edite apenas `frontend/src/config/appConfig.js`. Para alterar estrutura (nomes, pastas), edite `frontend/src/data/treeData.js`.
