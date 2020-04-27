<template>
      <v-footer
        padless
      >
    <v-bottom-navigation
        :value="activeBtn"
        background-color="#deecf9"
        fixed
    >
        <div>
        <router-link to="/">
            <v-btn>
                <span>Home</span>
                <v-icon>mdi-home</v-icon>
            </v-btn>
        </router-link>
        </div>
        <div>
        <router-link to="/anuncio-novo">
        <v-btn>
            <span>Cadastrar</span>
            <v-icon>mdi-note-plus-outline</v-icon>
        </v-btn>
        </router-link>
        </div>

        <div>
        <router-link to="/Contato">
        <v-btn>
            <span>Contatos</span>
            <v-icon>mdi-mail</v-icon>
        </v-btn>
        </router-link>
        </div>
    </v-bottom-navigation>
  </v-footer>
</template>

<script>
    export default {
        data () {
            return {
                activeBtn: 0,
            }
        },
    }
</script>
<style  scoped>
    div {
        margin-top: 10px;
    }
    a {
        text-decoration: none ;
    }
    .v-footer { 
        background:none;
    }
</style>
