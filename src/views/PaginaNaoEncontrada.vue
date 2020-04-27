<template>
  <v-container class="fill-height" id="paginaErro">
    <v-row
      class=" mt-2"
      justify="center"
    >
      <v-col
        class="text-center"
        cols="auto"
      >
        <v-img src="../assets/img/caixa_vazia_404.png" contain max-height="150px" ></v-img>
        <h1 class=" mb-6">
          Oops 404, Página não encontrada! 
        </h1>

        <p class="mb-1 grey--text text--darken-2">
          Não foi possível encontrar a página que você está buscando. 
        </p>

        <v-btn  color="primary" to="/" >
          <v-icon left >mdi-keyboard-backspace</v-icon>
          Voltar ao Início         
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
h1{
   font-size: 2rem !important;
 }
 #paginaErro > p {
   font-size: 1rem;
 }
@media (max-width: 1100px) and (min-width: 999.9px) {

}
 
@media (max-width: 1000px) and (min-width: 899.9px) {

}

@media (max-width: 900px) and (min-width: 767.9px) {

}

@media (max-width: 768px) and (min-width: 500px) {

}
@media (max-width: 499.8px) and (min-width: 400px) {

}
@media (max-width: 399.9px) and (min-width: 350px) {

  }
@media (max-width: 349.9px) and (min-width: 300px) {


}
</style>
<script>
  export default {
    name: 'PaginaNaoEncontrada',
  }
</script>