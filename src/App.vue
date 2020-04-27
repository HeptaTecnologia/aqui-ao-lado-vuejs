<template>
   <v-app id="inspire">
    <Header/>
    <v-content id="content" style="padding: -56px 0px 0px;">
      <router-view/>
    </v-content>
    <BottomNav/>
  </v-app>
</template>
<style scoped>
  #content {
    margin-top: -20px !important; 
  }
  #conteudo {
      background-color: #deecf9;
      border-radius: 20px;
  }
  .margemMobile {
      padding: 0px 40px;
  }

  #inspire {
    background-image:  url('assets/img/background_home.svg');
    background-position: top center;
    background-size: contain;
    background-repeat: no-repeat;
    padding: 14px;
    margin-bottom: 60px;
  }
@media (max-width: 768px) and (min-width: 400px) {
  #inspire {
    
    background-image:  url('assets/img/background_home_mobile.svg');
    background-size: contain;
  }
}
@media (max-width: 676.9px) and (min-width: 300px) {
  #inspire {
    background-image:  url('assets/img/background_home_mobile.svg');
    background-size: contain;
  }
}

</style>
<script>

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from "./components/BottomNav";
export default {
  name: 'App',
  components: {
    Header,
    Footer,
    BottomNav,
  },
  data: () => ({
   drawer: null,
  }),
};
</script>
