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
     * Os 4 blocos = 4 pastas no Drive (nomes batem sem acento/caixa).
     * Outras pastas da raiz (IMAGENS, OUTROS, VÍDEOS…) são ignoradas.
     */
    blocks: [
      {
        value: 'tutoriais',
        title: 'Tutoriais',
        icon: 'mdi-play-circle-outline',
        accent: '#58a6ff',
        folderNames: ['TUTORIAIS', 'Tutoriais'],
        defaultType: 'video',
      },
      {
        value: 'apks',
        title: 'Apks',
        icon: 'mdi-android',
        accent: '#3fb950',
        folderNames: ['APKS', 'Apks', 'APKs'],
        defaultType: 'apk',
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
        value: 'links',
        title: 'Links',
        icon: 'mdi-link-variant',
        accent: '#79c0ff',
        folderNames: ['LINKS', 'Links'],
        defaultType: 'link',
      },
    ],
  },
}
