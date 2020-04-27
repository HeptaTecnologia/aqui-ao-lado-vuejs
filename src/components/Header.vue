<template>
<v-container id="header" class="marginZero mt-2 mb-2" >
    <v-row align="start" justify="space-between" class="no-gutters marginTop"> 
      <v-col cols="6">
        <router-link to="/">
          <h1 class=" ml-1">
            <img src="../assets/img/aquiaolado_2.1.png" class="mr-2 d-none d-sm-flex "/> 
            <img src="../assets/img/aquiaolado_2.png" class="mr-2 d-sm-none "/> 
          </h1>   
        </router-link>  
      </v-col> 
      <v-col cols="5" class=" text-right mr-1">
        <v-bottom-navigation  class="">
          <!-- <v-btn to="/anuncio-novo" id="btnCadastrar" text small color="primary">
            <span>Cadastrar Negócio ! </span>
            <v-icon class="d-none d-sm-flex">mdi-note-plus-outline</v-icon>
          </v-btn>  -->
          <v-btn to="/sobre-aqui-ao-lado" id="btnSobre" text large>
            <span>O que é AQUI AO LADO?</span>
            <v-icon >mdi-36px mdi-sign-text</v-icon>
          </v-btn>
        </v-bottom-navigation >
      </v-col>
    </v-row> 
  
  </v-container> 
</template>            
<style scoped>

  .theme--light.v-bottom-navigation {
    background-color: rgba(0,0,0,0);
  }

.v-app-bar.v-app-bar--fixed {
    position: relative !important;
    top: 0;
    z-index: 5;
}
.b-marginZero {
  padding-bottom:0px; 
}
.tituloMobile {
  text-align: center;
}
.margemMobile {
    padding: 0px 40px;
}

.marginZero {
    padding: 0px 0px;
}
#header {
  margin-top: 10px;
} 
#header img {
  height: 80px;
}
#btnCadastrar, #btnSobre {
  letter-spacing: -0.01rem;
}
.v-item-group.v-bottom-navigation {
    -webkit-box-shadow: none; 
    box-shadow: none;
}


@media (max-width: 1100px) and (min-width: 999.9px) {
  #header {
    margin-top: 10px !important;
  } 
}

@media (max-width: 1000px) and (min-width: 899.9px) {
   #header {
    margin-top: 10px !important;
  } 
}

@media (max-width: 900px) and (min-width: 767.9px) {
  #header {
    margin-top: 10px;
  } 
}
@media (max-width: 900px) and (min-width: 700px) {
  #header {
    margin-top: 10px;
  } 
}
@media (max-width: 699.8px) and (min-width: 600px) {
  #header {
    margin-top: 10px;
  } 
}

@media (max-width: 599.8px) and (min-width: 500px) {
    #btnCadastrar, #btnSobre {
    letter-spacing: -0.05rem;
  }
    #header {
    margin-top:0px;
  }
    #header h1 {
      font-size:1.5rem;
    }
    #header img {
      height: 130px;
    }
}
@media (max-width: 499.8px) and (min-width: 400px) {
  #btnCadastrar, #btnSobre {
    letter-spacing: -0.05rem;
  }
  #header {
    margin-top:20px;
  }
  #header h1 {
    font-size:1.5rem;
  }
  #header img {
    height:100px;
  }
}
@media (max-width: 399.9px) and (min-width: 350px) {
  #btnCadastrar, #btnSobre {
    letter-spacing: -0.05rem;
  }
      #header {
    margin-top: 0px;
  }
    #header h1 {
      font-size:1.5rem;
    }
    #header img {
      height:90px;
    }
  }
@media (max-width: 349.9px) and (min-width: 300px) {
  #btnCadastrar, #btnSobre {
    letter-spacing: -0.05rem;
  }
  .margemMobile {
    padding: 0px 0px;
}
  #header {
    margin-top: -5px;
  }
  #header h1 {
    font-size:1.5rem;
  }
  #header img {       
    margin-top: 5px;
    height: 80px;
  }

}
</style>

<script>
import router from '@/router/routes.js'
export default {
  name: 'Header',
  data: () => ({
     menuMobile: false,
  }),
  mounted() {    
    const vm = this;
    vm.onResize();
  },
  methods: {

      onResize() {
          const vm = this;
          // vm.menuMobile = false;
          if (window.innerWidth > 600) {
              vm.menuMobile = false;
          } else {
              // vm.menuMobile = true;
          }
          // console.log('-----> '+ vm.isMobile +'<-----')
      }
  }
};
</script>
