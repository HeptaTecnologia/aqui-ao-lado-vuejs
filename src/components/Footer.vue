<template>
    <v-footer
      color="cyan"
      padless
    >
      <span class="white--text">aquiaolado.com.br &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</template>
<style>
    .grecaptcha-badge { visibility: hidden; }

    .v-slide-group__next, .v-slide-group__prev {
        min-width: 0 !important;
    }
</style>