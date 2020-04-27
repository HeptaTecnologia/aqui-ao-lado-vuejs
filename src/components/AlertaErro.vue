<template>
    <v-alert 
      type="error"
      dismissible>
      <p v-if="mensagemErro != null">{{mensagemErro}}</p>
      <p v-else>Aconteceu um erro interno, não foi possível concluir a sua requisição! <br> Entre em contato com aquiaolado@email.com</p>
    </v-alert>
</template>

<script>
    export default {
        props: ['mensagemErro'],
        name: 'AlertaErro',
        data: () => ({

        }),
        methods: {

        }
    }
</script>