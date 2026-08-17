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
    {
      title: 'Antes de iniciar',
      text: `Antes de iniciar

1. Conecte um mouse USB ao Mini PC.
2. Retorne à tela inicial:

Controle remoto: pressione Home 🏠
Mouse: clique 3 a 4 vezes com o botão direito.

✅ Pronto. Agora você pode iniciar a instalação.`,
    },
    {
      title: 'Download e Instalação do Atendimento Inteligente',
      text: `Download e Instalação do Atendimento Inteligente

1. Baixe o aplicativo

Abra o navegador do Mini PC e acesse:

https://shre.ink/aipainel82

Clique em Download e aguarde a conclusão.

2. Instale o aplicativo

Abra o arquivo baixado.
Caso solicitado, permita a instalação de aplicativos de fontes desconhecidas.
Clique em Instalar.
Aguarde a conclusão.

✅ Pronto. O Atendimento Inteligente foi instalado.

Importante: Não abra o aplicativo ainda. Primeiro será realizada a instalação da Síntese de Voz.`,
    },
    {
      title: 'Download e Instalação da Síntese de Voz',
      text: `Download e Instalação da Síntese de Voz

1. Baixe o aplicativo

Abra o navegador do Mini PC e acesse:

https://shre.ink/sintesedevoz

Clique em Download e aguarde a conclusão.

2. Instale a Síntese de Voz

1. Abra o arquivo baixado.
2. Caso solicitado, permita a instalação.
3. Clique em Instalar.
4. Aguarde a conclusão.

3. Configure a voz

Acesse:

Preferências do dispositivo → Acessibilidade → Conversão de texto em voz → Configurações do mecanismo → Instalar dados de voz

Depois:

1. Selecione Português (Brasil).
2. Escolha a Voz V.
3. Aguarde o download.

✅ Pronto. A Síntese de Voz está instalada e configurada.

Importante: A instalação da Voz V é necessária para o funcionamento correto dos áudios do Atendimento Inteligente.`,
    },
    {
      title: 'Ativar Modo Desenvolvedor – SmartPro',
      text: `Ativar Modo Desenvolvedor – SmartPro

1. Abra as configurações

Acesse:

Configurações ⚙️ → Preferências do dispositivo → Sobre

2. Ative o modo desenvolvedor

1. Localize Número da versão.
2. Pressione 7 vezes seguidas sobre essa opção.
3. Aguarde a mensagem informando que o Modo Desenvolvedor foi ativado.

3. Acesse as opções

Volte para:

Preferências do dispositivo → Opções do desenvolvedor

✅ Pronto. O Modo Desenvolvedor está ativado.`,
    },
    {
      title: 'Limpar Cache do Atendimento Inteligente – SmartPro',
      text: `Limpar Cache do Atendimento Inteligente – SmartPro

1. Abra as configurações

Acesse:

Configurações ⚙️ → Aplicativos

2. Localize o aplicativo

1. Procure por Atendimento Inteligente.
2. Abra as informações do aplicativo.
3. Entre em Armazenamento ou Armazenamento e cache.

3. Limpe o cache

1. Selecione Limpar cache.
2. Confirme, caso seja solicitado.

✅ Pronto. O cache do Atendimento Inteligente foi limpo.

Atenção: Utilize apenas Limpar cache. Não selecione Limpar dados, pois essa opção pode apagar configurações e informações salvas pelo aplicativo.`,
    },
    {
      title: 'Restauração de Fábrica – SmartPro',
      text: `Restauração de Fábrica – SmartPro

1. Abra as configurações

Acesse:

Configurações ⚙️ → Preferências do dispositivo → Redefinir

2. Inicie a restauração

1. Selecione Redefinir para configuração original.
2. Confirme a restauração.
3. Selecione Apagar tudo, caso seja solicitado.

3. Aguarde

O SmartPro será reiniciado e retornará às configurações de fábrica.

✅ Pronto. Após reiniciar, realize novamente as configurações iniciais do aparelho.

⚠️ Atenção: A restauração apaga aplicativos instalados, contas, configurações e dados armazenados no Mini PC.`,
    },
    {
      title: 'Precisa de ajuda?',
      text: `Precisa de ajuda?

Caso encontre qualquer dificuldade durante a instalação, entre em contato com o suporte da *Intelite Tecnologia*. Nossa equipe estará pronta para ajudá-lo.`,
    },
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
