/**
 * Configuração central do intelitehub.
 * Conteúdo dos blocos vem da pasta pública do Google Drive.
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
  googleDrive: {
    /** Pasta raiz INTELITEHUB */
    rootFolderId: '1cQk7FC72LXgX3Bd4ReCtigQIx1Ij8eSg',
    rootFolderUrl:
      'https://drive.google.com/drive/folders/1cQk7FC72LXgX3Bd4ReCtigQIx1Ij8eSg?usp=drive_link',
    /**
     * Cada bloco = uma pasta na raiz do Drive (nomes batem sem acento/caixa).
     * Outras pastas da raiz (OUTROS, VÍDEOS…) são ignoradas.
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
        folderNames: ['LINKS', 'Links'],
        defaultType: 'link',
      },
      {
        value: 'mensagens',
        title: 'Mensagens Rápidas',
        icon: 'mdi-message-text-outline',
        accent: '#d2a8ff',
        folderNames: ['MENSAGENS RÁPIDAS', 'MENSAGENS RAPIDAS', 'Mensagens Rápidas'],
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
