# Intelite - Vue + Vuetify

Projeto migrado para **Vue 3** + **Vuetify 3**, com layout em **duas colunas** e navegação em **árvore** (pastas que abrem os itens abaixo).

## Como rodar

```bash
npm install
npm run dev
```

Acesse o endereço que o Vite mostrar (geralmente `http://localhost:5173`).

## Build para produção

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`. Para publicar, use o conteúdo da pasta `dist/`.

## Estrutura

- **`src/App.vue`** – Layout com barra superior (logo), duas colunas e dois `v-treeview`.
- **`src/data/treeData.js`** – Dados das árvores de **Tutoriais** e **APKs** (links e filhos).
- **`src/main.js`** – Entrada da aplicação e uso do Vuetify.
- **`src/plugins/vuetify.js`** – Configuração do Vuetify (tema, ícones).
- **`public/`** – Assets estáticos (logo, imagens da pasta Produtos). O Vite serve em `/`.

## Comportamento

- **Coluna esquerda – Tutoriais:** raiz “Tutoriais” → AICHECKING, Atendimento Inteligente, Avalize. Cada nó pode ser expandido para ver os vídeos; ao clicar no título do vídeo, o link abre em nova aba.
- **Coluna direita – APKs:** raiz “APKs” → Totem, Painel, Outros. Cada nó pode ser expandido para ver os APKs; ao clicar no título, o link do Drive abre em nova aba.

Para alterar links ou itens, edite `src/data/treeData.js`.

## Páginas antigas (HTML)

As páginas antigas (`index.html` anterior, `tutoriais.html`, `apks.html`, etc.) foram substituídas por esta SPA. Os arquivos `.html` antigos ainda estão na raiz do repositório caso precise consultar; a entrada do projeto passou a ser o `index.html` que carrega o Vue.
