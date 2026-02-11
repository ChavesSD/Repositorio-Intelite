<template>
  <v-app theme="githubDark">
    <v-app-bar
      density="compact"
      elevation="0"
      class="app-bar-github"
    >
      <v-app-bar-title>
        <router-link to="/" class="header-brand-link">
          <div class="header-brand">
            <img src="/icone.png" alt="" class="header-icon" />
            <span class="app-bar-title intelitehub-wordmark">intelitehub</span>
          </div>
        </router-link>
      </v-app-bar-title>
      <v-spacer />
      <v-btn
        variant="text"
        color="primary"
        to="/admin"
        class="btn-entrar"
      >
        Entrar
      </v-btn>
    </v-app-bar>

    <v-main class="main-github">
      <router-view />
    </v-main>

    <v-footer class="footer-github" border>
      <v-container fluid class="footer-content py-2">
        <div class="footer-logo-wrapper">
          <img src="/logointelite.png" alt="Intelite" class="footer-logo" />
        </div>
        <div class="footer-copy">
          <span class="footer-text">© {{ new Date().getFullYear() }} intelitehub</span>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
</script>

<style scoped>
.app-bar-github {
  background: #161b22 !important;
  border-bottom: 1px solid #30363d;
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
  gap: 6px;
  flex-wrap: nowrap;
  white-space: nowrap;
  flex-direction: row;
}

.header-icon {
  height: 18px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  display: block;
  vertical-align: middle;
}

.app-bar-title {
  color: #c9d1d9;
  font-weight: 600;
  font-size: 1.25rem;
}

.intelitehub-wordmark {
  font-family: 'Mona Sans Variable', 'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.btn-entrar {
  color: #ffffff !important;
  font-weight: 700;
}

.main-github {
  background: #0d1117 !important;
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
