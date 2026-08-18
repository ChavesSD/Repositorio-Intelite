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
  /** Links fixos no frontend (não vêm do Drive). Pastas: { title, children }. */
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
    {
      title: 'Encurtados',
      children: [
        { title: 'AI Painel', url: 'https://bit.ly/ai-painel' },
        { title: 'Ai Totem', url: 'https://bit.ly/ai-totem' },
        { title: 'Auto Start', url: 'https://bit.ly/a-start' },
        { title: 'Síntese de Voz', url: 'https://bit.ly/s-voz' },
      ],
    },
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

https://bit.ly/ai-painel

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

https://bit.ly/s-voz

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

3. Acesse as opções do desenvolvedor

Volte para:

Preferências do dispositivo → Opções do desenvolvedor

4. Ative Permanecer ativo

Dentro de Opções do desenvolvedor:

1. Localize Permanecer ativo.
2. Ative essa opção.

Permanecer ativo mantém a tela ligada enquanto o Mini PC estiver conectado à energia.

✅ Pronto. O Modo Desenvolvedor e a opção Permanecer ativo estão ativados.`,
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
    {
      title: 'Intervalo',
      text: `Intervalo

Estamos em intervalo no momento.

O atendimento será retomado em breve.

Agradecemos pela compreensão.`,
    },
    {
      title: 'Fim de expediente',
      text: `Fim de expediente

Olá, agradecemos pelo contato! Nosso horário de atendimento encerrou neste momento, mas ficaremos felizes em ajudar a partir das 7h às 17:30h amanhã. Tenha uma excelente noite! 😊`,
    },
    {
      title: 'Inatividade',
      text: `Inatividade

Prezado cliente, devido ao período de inatividade, precisarei finalizar este atendimento no momento. Reiteramos que permanecemos à disposição para atendê-lo novamente sempre que necessário. Será um prazer auxiliá-lo assim que retomar o contato.`,
    },
    {
      title: 'Ajustar Fuso Horário – SmartPro',
      text: `Ajustar Fuso Horário – SmartPro

1. Abra as configurações

Acesse:

Configurações ⚙️ → Preferências do dispositivo → Data e hora

2. Ajuste o fuso horário

1. Entre em Definir fuso horário.
2. Selecione:

GMT-03:00 – Brasília

Caso apareça Fuso horário automático, desative essa opção antes de selecionar o fuso manualmente.

3. Ative a hora automática

Em Data e hora, mantenha:

Data e hora automáticas → Ativado

✅ Pronto. O SmartPro ficará configurado com o horário de Brasília (GMT-03:00).`,
    },
    {
      title: 'Excluir Versão Anterior do Aplicativo',
      text: `Excluir Versão Anterior do Aplicativo

1. Abra as configurações

Acesse:

Configurações ⚙️ → Aplicativos

2. Localize o aplicativo

Procure pela versão instalada do:

Atendimento Inteligente / Painel
ou
Totem

3. Desinstale o aplicativo

1. Abra o aplicativo.
2. Clique em Desinstalar.
3. Confirme a remoção.
4. Aguarde a conclusão.

✅ Pronto. A versão anterior foi removida e o Mini PC está preparado para instalar a nova versão.`,
    },
    {
      title: 'Instalação e Configuração do AutoStart',
      text: `Instalação e Configuração do AutoStart

1. Instale o AutoStart

Abra o navegador do Mini PC e acesse:

https://bit.ly/a-start

Baixe o arquivo, abra e clique em Instalar.

2. Ative o AutoStart

Abra o aplicativo AutoStart e altere:

Autostartup: OFF → ON

3. Adicione o aplicativo

1. Clique em Adicionar uma aplicação para iniciar.
2. Selecione o aplicativo desejado, como Atendimento Inteligente ou Totem.

✅ Pronto. O aplicativo selecionado será iniciado automaticamente junto com o Mini PC.`,
    },
    {
      title: 'Instalação do Aplicativo do Totem',
      text: `Instalação do Aplicativo do Totem

1. Acesse o navegador

1. Conecte um mouse USB ao Mini PC.
2. Retorne à tela inicial:

Controle remoto: pressione Home 🏠
Mouse: clique 3 a 4 vezes com o botão direito.

2. Baixe o aplicativo

Abra o navegador do Mini PC e acesse:

https://bit.ly/ai-totem

Clique em Download e aguarde a conclusão.

3. Instale o aplicativo

1. Abra o arquivo baixado.
2. Caso solicitado, permita a instalação de aplicativos de fontes desconhecidas.
3. Clique em Instalar.
4. Aguarde a conclusão.

4. Abra o Totem

1. Abra o aplicativo Totem.
2. Caso sejam solicitadas permissões, conceda as permissões necessárias.
3. Aguarde o carregamento do sistema.

5. Teste o funcionamento

Verifique se:

- O aplicativo abre normalmente.
- As informações são exibidas corretamente.
- O sistema está funcionando normalmente.

✅ Pronto. O Aplicativo do Totem está instalado e pronto para utilização.`,
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
