/**
 * Estrutura em colunas (até 4) com árvore infinita de pastas/subpastas/links.
 * Cada nó pode ter: value (id), title, link (opcional), children (opcional).
 */

import { APP_CONFIG } from '../config/appConfig'

export const columns = [
  {
    value: 'tutoriais',
    title: 'Tutoriais',
    children: [
      {
        value: 'tutoriais-aichecking',
        title: 'AiChekin',
        children: [
          {
            value: 'aichecking-checkin',
            title: 'Check In',
            link: APP_CONFIG.resources.googleDrive.tutorials.aicheckingCheckin,
            type: 'video',
          },
        ],
      },
      {
        value: 'tutoriais-atendimento',
        title: 'Atendimento Inteligente',
        children: [
          { value: 'at-1', title: 'Restauração de Fábrica', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.factoryReset, type: 'video' },
          { value: 'at-2', title: 'Modo Desenvolvedor', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.developerMode, type: 'video' },
          { value: 'at-3', title: 'Permanecer Ativo', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.keepAwake, type: 'video' },
          { value: 'at-4', title: 'Limpeza de Cache', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.clearCache, type: 'video' },
          { value: 'at-5', title: 'Excluir Vídeo', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.deleteVideo, type: 'video' },
          { value: 'at-6', title: 'Treinamento Atendimento Inteligente 1', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.training1, type: 'video' },
          { value: 'at-7', title: 'Treinamento Atendimento Inteligente 2', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.training2, type: 'video' },
          { value: 'at-8', title: 'Sintese de Voz', link: APP_CONFIG.resources.googleDrive.tutorials.atendimentoInteligente.voiceSynthesis, type: 'video' },
        ],
      },
      {
        value: 'tutoriais-avalize',
        title: 'Avalize',
        children: [
          { value: 'avalize-1', title: 'Tour Completo', link: APP_CONFIG.resources.googleDrive.tutorials.avalize.fullTour, type: 'video' },
        ],
      },
    ],
  },
  {
    value: 'apks',
    title: 'APKs',
    children: [
      {
        value: 'apks-totem',
        title: 'Totem',
        children: [
          { value: 'totem-1', title: 'AI Fit Totem', link: APP_CONFIG.resources.googleDrive.apks.totem.aiFitTotem, type: 'apk' },
          { value: 'totem-2', title: 'Totem Sicoob 2025', link: APP_CONFIG.resources.googleDrive.apks.totem.totemSicoob2025, type: 'apk' },
          { value: 'totem-3', title: 'AI Totem 8.0', link: APP_CONFIG.resources.googleDrive.apks.totem.aiTotem80, type: 'apk' },
        ],
      },
      {
        value: 'apks-painel',
        title: 'Painel',
        children: [
          { value: 'painel-1', title: 'Painel Cirurgico 2025', link: APP_CONFIG.resources.googleDrive.apks.painel.painelCirurgico2025, type: 'apk' },
          { value: 'painel-2', title: 'AI Fit Painel', link: APP_CONFIG.resources.googleDrive.apks.painel.aiFitPainel, type: 'apk' },
          { value: 'painel-3', title: 'AI Painel 7.9', link: APP_CONFIG.resources.googleDrive.apks.painel.aiPainel79, type: 'apk' },
        ],
      },
      {
        value: 'apks-outros',
        title: 'Outros',
        children: [
          { value: 'outros-1', title: 'Auto Start', link: APP_CONFIG.resources.googleDrive.apks.outros.autoStart, type: 'apk' },
          { value: 'outros-2', title: 'Sintese de Voz', link: APP_CONFIG.resources.googleDrive.apks.outros.voiceSynthesis, type: 'apk' },
          { value: 'outros-3', title: 'Wi-Fi ADB Debug', link: APP_CONFIG.resources.googleDrive.apks.outros.wifiAdbDebug, type: 'apk' },
          { value: 'outros-4', title: 'Plataform Tools', link: APP_CONFIG.resources.googleDrive.apks.outros.platformTools, type: 'apk' },
        ],
      },
    ],
  },
]
