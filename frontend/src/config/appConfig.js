/**
 * Configuração central do intelitehub.
 * Conteúdo dos blocos (exceto Links e Mensagens Prontas) vem do Google Drive.
 * https://drive.google.com/drive/folders/1cQk7FC72LXgX3Bd4ReCtigQIx1Ij8eSg
 */
export const APP_CONFIG = {
  navigation: {
    home: './',
  },
  assets: {
    headerIcon: '/icone.png',
    footerLogo: '/logointelite.png',
  },
  /** Links fixos no frontend (não vêm do Drive). */
  staticLinks: [
    { title: 'Aichatz', url: 'https://aichatz.com.br/login' },
    { title: 'Aichekin', url: 'https://aicheckin.com.br/login' },
    { title: 'Aiclass', url: 'https://aiclass.intelite.com.br/login' },
    { title: 'Aiconsumer (Escolas)', url: 'https://aiconsumer.com.br/login' },
    { title: 'Aiconsumer (Eventos)', url: 'https://aiconsumer.intelite.com.br/login' },
    { title: 'Aidate', url: 'https://aidate.com.br/login' },
    { title: 'Aifit', url: 'https://aifit.intelite.com.br/login' },
    { title: 'Aipay', url: 'https://aipay.intelite.com.br/login' },
    { title: 'Atendimento Inteligente', url: 'https://intelite.com.br/ai' },
    { title: 'Avalize', url: 'https://avalize.intelite.com.br/login' },
  ],
  /**
   * Mensagens prontas no frontend (não vêm do Drive).
   * Formato: { title: 'Nome', text: 'Texto completo para copiar' }
   */
  staticMessages: [
    // Aguardando a lista de mensagens para popular.
  ],
  googleDrive: {
    /** Pasta raiz INTELITEHUB */
    rootFolderId: '1cQk7FC72LXgX3Bd4ReCtigQIx1Ij8eSg',
    rootFolderUrl:
      'https://drive.google.com/drive/folders/1cQk7FC72LXgX3Bd4ReCtigQIx1Ij8eSg?usp=drive_link',
    /**
     * Cada bloco = uma pasta na raiz do Drive (nomes batem sem acento/caixa).
     * Links e Mensagens Prontas são estáticos (source: 'static').
     * Outras pastas da raiz (LINKS, MENSAGENS…, OUTROS, VÍDEOS…) são ignoradas.
     */
    blocks: [
      {
        value: 'apks',
        title: 'Apks',
        icon: 'mdi-android',
        accent: '#3fb950',
        folderNames: ['APKS', 'Apks', 'APKs'],
        defaultType: 'apk',
      },
      {
        value: 'documentos',
        title: 'Documentos',
        icon: 'mdi-file-document-outline',
        accent: '#e3b341',
        folderNames: ['DOCUMENTOS', 'Documentos'],
        defaultType: 'document',
      },
      {
        value: 'imagens',
        title: 'Imagens',
        icon: 'mdi-image-outline',
        accent: '#f0883e',
        folderNames: ['IMAGENS', 'Imagens'],
        defaultType: 'image',
      },
      {
        value: 'links',
        title: 'Links',
        icon: 'mdi-link-variant',
        accent: '#79c0ff',
        source: 'static',
        defaultType: 'link',
      },
      {
        value: 'mensagens',
        title: 'Mensagens Prontas',
        icon: 'mdi-message-text-outline',
        accent: '#d2a8ff',
        source: 'static',
        defaultType: 'message',
      },
      {
        value: 'tutoriais',
        title: 'Tutoriais',
        icon: 'mdi-play-circle-outline',
        accent: '#58a6ff',
        folderNames: ['TUTORIAIS', 'Tutoriais'],
        defaultType: 'video',
      },
    ],
  },
}
