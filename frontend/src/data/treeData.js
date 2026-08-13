/**
 * Metadados estáticos dos blocos (fallback se o Drive falhar).
 * O conteúdo real é carregado em services/googleDrive.js.
 */
import { APP_CONFIG } from '../config/appConfig'

export const columns = APP_CONFIG.googleDrive.blocks.map((block) => ({
  value: block.value,
  title: block.title,
  icon: block.icon,
  accent: block.accent,
  children: [],
}))

export { countLeaves } from '../services/googleDrive'
