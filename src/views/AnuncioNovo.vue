<template>
  <div class="home">
    <!-- <HeaderInterna/> -->
    <AnuncioForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import AnuncioForm from '@/components/AnuncioForm.vue'
// import HeaderInterna from '@/components/Header.vue'

export default {
  name: 'AnuncioNovo',
  components: {
    AnuncioForm,
    // HeaderInterna
  }
}
</script>
