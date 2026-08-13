<template>
  <v-app theme="githubDark">
    <v-app-bar
      density="compact"
      elevation="0"
      class="app-bar-github"
    >
      <v-app-bar-title>
        <a :href="APP_CONFIG.navigation.home" class="header-brand-link">
          <div class="header-brand">
            <img :src="APP_CONFIG.assets.headerIcon" alt="" class="header-icon" />
            <span class="app-bar-title intelitehub-wordmark">intelitehub</span>
          </div>
        </a>
      </v-app-bar-title>
      <v-spacer />
      <span class="header-hint d-none d-sm-inline">repositório interno</span>
    </v-app-bar>

    <v-main class="main-github">
      <div class="main-atmosphere" aria-hidden="true" />
      <Home />
    </v-main>

    <v-footer class="footer-github" border>
      <v-container fluid class="footer-content py-2">
        <div class="footer-logo-wrapper">
          <img :src="APP_CONFIG.assets.footerLogo" alt="Intelite" class="footer-logo" />
        </div>
        <div class="footer-copy">
          <span class="footer-text">© {{ new Date().getFullYear() }} intelitehub</span>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import Home from './views/Home.vue'
import { APP_CONFIG } from './config/appConfig'
</script>

<style scoped>
.app-bar-github {
  background: rgba(22, 27, 34, 0.92) !important;
  border-bottom: 1px solid #30363d;
  backdrop-filter: blur(10px);
}

.app-bar-github :deep(.v-app-bar-title) {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.header-brand-link {
  text-decoration: none;
  color: inherit;
}

.header-brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: nowrap;
  white-space: nowrap;
  flex-direction: row;
  transition: opacity 0.15s ease;
}

.header-brand:hover {
  opacity: 0.85;
}

.header-icon {
  height: 20px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
  vertical-align: middle;
}

.app-bar-title {
  color: #e6edf3;
  font-weight: 600;
  font-size: 1.15rem;
  letter-spacing: -0.02em;
}

.intelitehub-wordmark {
  font-family: 'Mona Sans Variable', 'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.header-hint {
  margin-right: 12px;
  color: #8b949e;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
}

.main-github {
  position: relative;
  background: #0d1117 !important;
  overflow: hidden;
}

.main-atmosphere {
  pointer-events: none;
  position: absolute;
  inset: 0 0 auto 0;
  height: 280px;
  background:
    radial-gradient(ellipse 70% 80% at 15% -10%, rgba(88, 166, 255, 0.12), transparent 55%),
    radial-gradient(ellipse 50% 60% at 85% 0%, rgba(210, 168, 255, 0.08), transparent 50%);
  z-index: 0;
}

.main-github :deep(.home-shell) {
  position: relative;
  z-index: 1;
}

.footer-github {
  background: #161b22 !important;
  border-top: 1px solid #30363d !important;
  margin-top: auto;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.footer-github .footer-content {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.footer-logo-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.footer-logo {
  height: 32px;
  width: auto;
  object-fit: contain;
  opacity: 0.9;
}

.footer-copy {
  text-align: center;
  margin-top: 0;
}

.footer-text {
  color: #8b949e;
  font-size: 0.8125rem;
}
</style>
