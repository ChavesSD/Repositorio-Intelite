/**
 * Estrutura em árvore para Tutoriais e APKs.
 * Cada nó pode ter: value (id), title, link (opcional, para folhas), children.
 */

export const tutoriaisTree = [
  {
    value: 'tutoriais',
    title: 'Tutoriais',
    children: [
      {
        value: 'tutoriais-aichecking',
        title: 'AICHECKING',
        children: [
          {
            value: 'aichecking-checkin',
            title: 'Check In',
            link: 'https://drive.google.com/file/d/1GZsqQIKVoFu4pQRTkhQP24nodjxAZm7K/view?usp=drive_link',
            type: 'video',
          },
        ],
      },
      {
        value: 'tutoriais-atendimento',
        title: 'Atendimento Inteligente',
        children: [
          { value: 'at-1', title: 'Restauração de Fábrica', link: 'https://drive.google.com/file/d/1KNbrSGJmyarOcuqXX4CU5ubefn6OVbzi/view?usp=drive_link', type: 'video' },
          { value: 'at-2', title: 'Modo Desenvolvedor', link: 'https://drive.google.com/file/d/1dX2DQuMuN8KYTeMN0om80PYws-v7KTWZ/view?usp=drive_link', type: 'video' },
          { value: 'at-3', title: 'Permanecer Ativo', link: 'https://drive.google.com/file/d/1F2d9zezCxhPHXh9CAuLXGoAcYvS2d_1c/view?usp=drive_link', type: 'video' },
          { value: 'at-4', title: 'Limpeza de Cache', link: 'https://drive.google.com/file/d/1Gbg6ltBARMSCYBGttNI903cKxM-ZIrXL/view?usp=drive_link', type: 'video' },
          { value: 'at-5', title: 'Excluir Vídeo', link: 'https://drive.google.com/file/d/1NKHSJsFyMHzQ9oUdRARQk8QZUC6P9zBS/view?usp=drive_link', type: 'video' },
          { value: 'at-6', title: 'Treinamento Atendimento Inteligente 1', link: 'https://drive.google.com/file/d/1yqBiAbXi1YEEZ-GPaFdXHh0c3lzn5dEK/view?usp=drive_link', type: 'video' },
          { value: 'at-7', title: 'Treinamento Atendimento Inteligente 2', link: 'https://drive.google.com/file/d/1AwFr6stInv-dqEIur6UJ8HJa9ocmNMZH/view?usp=drive_link', type: 'video' },
          { value: 'at-8', title: 'Sintese de Voz', link: 'https://drive.google.com/file/d/1I0i6dnqOHvTaNHwO69m5XYPwCTP3epsb/view', type: 'video' },
        ],
      },
      {
        value: 'tutoriais-avalize',
        title: 'Avalize',
        children: [
          { value: 'avalize-1', title: 'Tour Completo', link: 'https://drive.google.com/file/d/12xrEh0SfM-2AOcPvVAHDQ6Qbwg2lhrld/view?usp=drive_link', type: 'video' },
        ],
      },
    ],
  },
]

export const apksTree = [
  {
    value: 'apks',
    title: 'APKs',
    children: [
      {
        value: 'apks-totem',
        title: 'Totem',
        children: [
          { value: 'totem-1', title: 'AI Fit Totem', link: 'https://drive.google.com/file/d/17aDiDCmRqqANiiO52lhNvprB5rvurbph/view?usp=drive_link', type: 'apk' },
          { value: 'totem-2', title: 'Totem Sicoob 2025', link: 'https://drive.google.com/file/d/1iPE-6R64HzO8Hpf79Bb0MQG6AJq0p-mO/view?usp=drive_link', type: 'apk' },
          { value: 'totem-3', title: 'AI Totem 8.0', link: 'https://drive.google.com/file/d/1xjvDMZyM2ssDbvkDAgLClnpwqZAM5QY1/view?usp=drive_link', type: 'apk' },
        ],
      },
      {
        value: 'apks-painel',
        title: 'Painel',
        children: [
          { value: 'painel-1', title: 'Painel Cirurgico 2025', link: 'https://drive.google.com/file/d/1JdJbvvQKKFQRre-UnSASVR_UaM2uIBps/view?usp=drive_link', type: 'apk' },
          { value: 'painel-2', title: 'AI Fit Painel', link: 'https://drive.google.com/file/d/1F5N_SxWdQbW-eYWSr0fkGIBBDvr4kLL_/view?usp=drive_link', type: 'apk' },
          { value: 'painel-3', title: 'AI Painel 7.9', link: 'https://drive.google.com/file/d/1zibesY2Pxxm9bfG8Z47umYXiFqPLse3c/view?usp=drive_link', type: 'apk' },
        ],
      },
      {
        value: 'apks-outros',
        title: 'Outros',
        children: [
          { value: 'outros-1', title: 'Auto Start', link: 'https://drive.google.com/file/d/1dVAmQ15goF5D60XJPFGbBgcHDmGaozFT/view?usp=drive_link', type: 'apk' },
          { value: 'outros-2', title: 'Sintese de Voz', link: 'https://drive.google.com/file/d/1A0XHY9bQV3zFoHiBm15Shtj-wL30Vske/view?usp=drive_link', type: 'apk' },
          { value: 'outros-3', title: 'Wi-Fi ADB Debug', link: 'https://drive.google.com/file/d/1aaAz4zyJIjTbhdg7u0-GzxVSpA2SSjk1/view?usp=drive_link', type: 'apk' },
          { value: 'outros-4', title: 'Plataform Tools', link: 'https://drive.google.com/file/d/1o7_kOTt1NYsRs0qUg_3fvtfJrKTY_X83/view?usp=drive_link', type: 'apk' },
        ],
      },
    ],
  },
]
