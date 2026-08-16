# intelitehub

Hub frontend da Intelite inspirado no visual de repositório do GitHub. Lista tutoriais, APKs, documentos e imagens a partir da pasta pública do Google Drive [INTELITEHUB](https://drive.google.com/drive/folders/1cQk7FC72LXgX3Bd4ReCtigQIx1Ij8eSg?usp=drive_link); links e mensagens prontas ficam no frontend.

## Stack

- Vue 3 + Vuetify 3
- Vite 6
- Deploy: Netlify

## Requisitos

- Node.js **18+** (recomendado 20+)

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build

```bash
npm run build
```

Saída em `frontend/dist` (publicada pelo Netlify).

## Estrutura

```
public/                         # ícone e logo
frontend/
  index.html
  vite.config.js                # proxy do Google Drive (dev)
  src/
    App.vue                     # shell (header / footer)
    views/Home.vue              # blocos recolhíveis + treeview
    config/appConfig.js         # pasta raiz do Drive + metadados dos blocos
    services/googleDrive.js     # leitura recursiva do Drive
    data/treeData.js            # fallback dos blocos
    plugins/vuetify.js          # tema githubDark
netlify.toml                    # build + proxy Drive em produção
```

## Blocos (pastas no Drive)

| Pasta no Drive        | Bloco na UI           |
|-----------------------|-----------------------|
| APKS                  | Apks                  |
| DOCUMENTOS            | Documentos            |
| IMAGENS               | Imagens               |
| TUTORIAIS             | Tutoriais             |

Blocos estáticos no frontend (não leem o Drive):

| Bloco              | Config                          |
|--------------------|---------------------------------|
| Links              | `appConfig.staticLinks`         |
| Mensagens Prontas  | `appConfig.staticMessages`      |

Outras pastas da raiz (LINKS, MENSAGENS…, OUTROS, VÍDEOS…) são ignoradas.

A pasta do Drive precisa estar pública (“qualquer pessoa com o link”).

## Scripts

| Comando         | Função              |
|-----------------|---------------------|
| `npm run dev`   | servidor local      |
| `npm run build` | build de produção   |
| `npm run preview` | pré-visualiza build |
