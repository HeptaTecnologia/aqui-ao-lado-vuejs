<template>
    <div id="home" class="home">
    <AlertaErro v-if="falhou" :mensagem-erro="mensagem"></AlertaErro>
    <v-container class="central" v-resize="onResize" >
      <v-row align="start"  >
          <v-col md="4" sm="5" cols="12" v-if="!isMobile" >
              <img src="../assets/img/pessoas.svg" class="imgPessoas d-none d-sm-flex "/>
          </v-col>

          <v-col md="7" sm="7" cols="12" class="t-marginZero">   
          <!-- <v-col md="8" sm="8" cols="12" class="viewMobile">    -->
                <v-carousel
                  :height = altura
                  hide-delimiters              
                  :show-arrows=false
                  :cycle = cycle 
                  id="banner">
                  <v-carousel-item v-for="(slide, i) in slides" :key="i">                   
                      <v-row class="fill-height ml-1" align="start" justify="start">
                        <h2 class="consensed " > 
                          <p class="font-weight-regular" v-html="slide.linhaUm"></p>
                          <p class="font-weight-regular" v-html="slide.linhaDois"></p>
                          <p class="font-weight-regular" v-html="slide.linhaTres"></p>                         
                        </h2>
                      </v-row>
                  </v-carousel-item>
                </v-carousel>
            <img src="../assets/img/pessoas.svg" v-if="isMobile"  class="imgPessoas d-flex d-sm-none "/>
            <v-form ref="formPesquisa" lazy-validation style="" class="mt-3" >
            <h3>Descubra o que existe perto de você:</h3>
              <div class="cidadeEscolhida" v-if="showText" >                  
               <v-row dense align="center" id="buscaLocalizacao" >
                  <v-col sm="12" md="10" lg="10" cols="12">
                      <v-text-field  
                      class="headline"                 
                      prepend-inner-icon="mdi-close-circle mdi-18px" 
                      label="Estou em"
                      readonly
                      :value="localidade"
                      @click:prepend-inner="toogleShowText()"
                      @click="toogleShowText()"> </v-text-field > 
                  </v-col>
                </v-row >
              </div> 
              <div v-else>
                <v-row dense align="center" id="buscaLocalizacao" >
                  <v-col cols="12" class="margemZero">
                    <p class="headline" :style="loadingUF ? 'margin-bottom: 26px' : 'margin-bottom: 0px'">Estou em: </p>
                  </v-col>
                  <v-col lg="2" md="3" sm="3" cols="4" class="margemZero">
                    <v-skeleton-loader
                        :loading="loadingUF"
                        transition="fade-transition"
                        type="button"
                        height="40"
                        width="100"
                        style="margin-top:-26px;"
                      >
                        <v-select
                        :items="ufs"
                        item-value="id"
                        item-text="sigla"
                        no-data-text="Nenhuma opção disponível"
                        :rules="rulesSelect"
                        label="UF"
                        outlined
                        dense
                        filled
                        cache-items
                        background-color="#fff"
                        v-model="ufSelecionada"
                        @change="saveUF(ufSelecionada)"
                        class="selectUF"                    
                        style="margin-top:26px;"
                        return-object
                        ></v-select>                  
                    </v-skeleton-loader>
                  </v-col>
                  <v-col lg="10" md="9" sm="9" cols="8" class="margemZero" >
                    <v-skeleton-loader v-if="cidades.length >= 1"
                        :loading="loadingCidade"
                        transition="fade-transition"
                        type="card"
                        height="40"
                        width="180"
                        style="margin-top:-26px;"
                      >
                        <v-select
                        :items="cidades"
                        label="Cidade"
                        :rules="rulesSelect"
                        no-data-text="Nenhuma opção disponível"
                        item-value="id"
                        item-text="nome"
                        outlined
                        dense                  
                        filled
                        background-color="#fff"
                        v-model="cidadeSelecionada"
                        @change="saveCidade(cidadeSelecionada)"
                        class="selectCidade"                   
                        style="margin-top:26px;"
                        return-object
                        ></v-select>
                    </v-skeleton-loader>
                  </v-col>
                </v-row >
                <a href='/anuncio-novo'>Não achou a sua localidade? Clique aqui e seja o primeiro o anunciar!</a>
            </div> 
              <v-row dense  v-if="bairros.length >= 1">
                <v-col sm="12" md="10" lg="10" cols="12">
                    <v-select
                    :items="bairros"
                    placeholder=" filtrar por:"
                    label=" filtrar por:"
                    item-value="id"
                    item-text="nome"
                    no-data-text="Nenhuma opção disponível"
                    multiple                
                    v-model="bairrosSelecionados"
                    prepend-inner-icon="mdi-map-marker  mdi-22px"
                    @click:prepend-inner="buscaAnunciosPorBairros(bairrosSelecionados)"
                    @blur="buscaAnunciosPorBairros(bairrosSelecionados)"></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col  sm="12" md="10" lg="10"  cols="12">
                  <v-text-field 
                    class="inputPesquisa"
                    id="titulo"  
                    label="pesquisar"
                    placeholder="Eu preciso de ..."
                    dense
                    v-model="titulo"
                    prepend-inner-icon="mdi-24px  mdi-magnify " 
                    type="text"
                    @keyup.enter="validateForm(), $vuetify.goTo('#feed', options) " 
                    style="border-top-right-radius: 0px;">
                  </v-text-field>
                    <!-- @blur="$vuetify.goTo('#feed', options)"           -->
                </v-col>
                <v-col sm="12" md="10" lg="10" cols="12">
                  <v-btn class="mr-4 
                  inputPesquisa" 
                  depressed  
                  block 
                  color="amber" @click="validateForm(), $vuetify.goTo('#feed', options) " >Buscar</v-btn>
                </v-col>  
              </v-row>  

            </v-form> 

        </v-col>
      </v-row>  
    </v-container>
        <v-container >
        <v-row align="center" class="margemMobile no-gutters">
            <v-col cols="12">
                <div class="scrollGaleria">
                    <div id="cat">
                            <v-skeleton-loader
                                :loading="loadingCategorias"
                                transition="fade-transition"
                                type="card"
                                height="140"
                                width="100%"
                                style="margin-top:-26px;"
                            >
                                <v-sheet
                                        class="mx-auto"
                                        max-width="100%">
                                    <v-slide-group
                                            v-model="categoriaSelecionada"
                                            class=""
                                            :prev-icon="prevIcon ? 'mdi-minus' : undefined"
                                            :next-icon="nextIcon ? 'mdi-plus' : undefined"
                                            :multiple="multiple"
                                            :mandatory="mandatory"
                                            :show-arrows="showArrows"
                                            :center-active="centerActive"
                                            @change="validateForm"

                                    >
                                        <v-slide-item
                                                v-for="(item, i) in categorias"
                                                :key="i"
                                                :value="item.id"
                                                v-slot:default="{ active, toggle }"                                                        
                                        >
                                            <v-card :color="item.cor"
                                                    class="ma-2 categoria"
                                                    @click="toggle"
                                                    :id="'categoria_'+ item.id"
                                            >
                                                <v-img
                                                class="align-end text-center"
                                                auto
                                                :src="item.imagem"
                                                >
                                                    <v-overlay
                                                            :absolute="absoluteOverlay"
                                                            :value=active
                                                    >
                                                        <v-icon
                                                                color="#ffc107"
                                                                size="48"
                                                                v-text="'mdi-close-circle-outline'"
                                                                @click="toggle = !toggle"
                                                        ></v-icon>
                                                    </v-overlay>
                                                    <v-card-title class="tituloCategoria p-0" style="background: rgba(255,255,255,0.5);" >{{item.nome}}</v-card-title>
                                                </v-img>
                                                    
                                            </v-card>
                                        </v-slide-item>
                                    </v-slide-group>
                                </v-sheet>
                            </v-skeleton-loader>
                    </div>
                </div>
            </v-col>
        </v-row>
        </v-container>
        <Feed v-show="showFeed" ref="feed" v-bind:filtro="filtro" id="feed"/>

    </div>
</template>

<style scoped>

    .v-card__title + .v-card__subtitle {
        margin-top: 0px;
    }

    .v-card__subtitle, .v-card__text, .v-card__title {
        padding: 0px 10px;
        justify-content: center;
    }

    .tituloCategoria  {
        font-size: 1.2rem;
        font-weight: 900;    
        padding-bottom: 0px;
        word-break:keep-all;
        line-height: 1.5rem;
    }
    .categoria {
        width: 140px;
        padding: 0.5rem;
    }
    #banner h2 {
        color: #333;
    }

    .t-marginZero {
        padding-top: 0px;
    }

    #app {
        max-width: 1400px;

        margin-left: auto;
        margin-right: auto;

        padding: 5px 24px;
    }

    .v-slide-group__next,
    .v-slide-group__prev {
    min-width: 0px;
    }

    /*  */
    .cidadeEscolhida .v-input {
        /* width: fit-content; */
        display: block;
    }

    .btnBorder {
        height: 49px !important;;
        border-top-left-radius: 0px !important;;
        border-bottom-left-radius: 0px !important;;
        border-bottom-color: black !important;
        border-bottom-style: solid !important;;
        border-bottom-width: 1px !important;;
    }


    .card {
        border: 2px solid #a6192d;
        width: 150px;
        height: 75px;
        background: black;
    }

    .scrolling-wrapper, .scrolling-wrapper-flexbox {
        height: 80px;
        margin-bottom: 20px;
        width: 100%;
        -webkit-overflow-scrolling: touch;
    }

    .scrolling-wrapper::-webkit-scrollbar, .scrolling-wrapper-flexbox::-webkit-scrollbar {
        display: none;
    }

    #btnCadastrar {
        display: block !important;
    }

    #btnCadastrar {
        display: display !important;
    }

    a {
        text-decoration: none;
    }

    .v-text-field.v-text-field--enclosed .v-text-field__details {
        margin-bottom: 0px;
    }

    .margemMobile {
        padding: 0px 10px;
    }

    .margemZero {
        padding: 0px;
    }

    .selectUF {
        width: 100px !important;
    }

    .selectCidade {
        width: 200px !important;
    }

    .consensed > p {
        margin-bottom: -5px;
    }

    .speech-bubble {
        position: relative;
        background: #00aabb;
        border-radius: .4em;
        min-height: 50px;
        padding: 10px 10px 10px;
    }

    .speech-bubble:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 5%;
        width: 0;
        height: 0;
        border: 1.313em solid transparent;
        border-top-color: #00aabb;
        border-bottom: 0;
        border-left: 0;
        margin-left: -0.656em;
        margin-bottom: -1.312em;
    }

    #buscaLocalizacao .headline {
        font-size: 1.2rem !important;
    }

    .balao {
        margin: 5px 0 20px;
        width: 100%;
    }

    .inputPesquisa {
        margin-top: 0px;
    }

    @media (min-width: 1200px) {
        #app {
            padding-left: 80px;
            padding-right: 80px;
        }
        .imgPessoas {
            height: 350px;
        }
    }
    @media (max-width: 1100px) and (min-width: 999.9px) {
        .imgPessoas {
            height: 300px;
        }
    }

    @media (max-width: 1000px) and (min-width: 899.9px) {
        .imgPessoas {
            height: 280px;
        }
    }

    @media (max-width: 900px) and (min-width: 767.9px) {
        .imgPessoas {
            height: 250px;
        }

        #buscaLocalizacao .headline {
            font-size: 1.2rem !important;
        }
    }


    @media (max-width: 768px) and (min-width: 400px) {
        .tituloCategoria  {
            font-size: 1rem;
            line-height: 1rem;
            text-align: center;
        }
        .categoria {
            width: 100px;
            padding: 0.2rem;
        }
        .imgPessoas {
            height: 220px;
            margin: 0 18%;
        }

        .consensed > p {
            font-size: 1.2rem;
        }

        h1, p {
            text-align: center;
        }
                h3 {
            font-size:1.2rem;
        }

        .imgPessoas {
            margin-top: 15px;
        }

        .v-input {
            font-size: 1.3rem !important;
        }

        #buscaLocalizacao .v-input {
            font-size: 1rem !important;
        }

        .v-input .v-label {
            font-size: 1rem !important;
        }

        #buscaLocalizacao .headline {
            font-size: 1.2rem !important;
        }

        .viewMobile {
            margin: -40px 0;
        }
        .v-slide-group__next, .v-slide-group__prev {
            min-width: 0px !important;
        }
    }

    @media (max-width: 399.9px) and (min-width: 350px) {
     .tituloCategoria  {
            font-size: 0.8rem;
            line-height: 1rem;
            text-align: center;
        }
        .categoria {
            width: 90px;
            padding: 0.2rem;
        }
        .viewMobile {
            margin: -40px 0;
        }

        .imgPessoas {
            height: 210px;
            margin: 0 18%;
        }

        .consensed > p {
            font-size: 1.3rem;
            text-align: center !important;
            letter-spacing: -0.1rem;
        }

        .imgPessoas {
            margin-top: 15px;
        }

        .tituloMobile {
            font-size: 1.8rem;
            text-align: center !important;
        }

        .v-application .headline {
            font-size: 1.3rem !important;
        }

        .v-input {
            font-size: 1.3rem !important;
        }

        .v-input .v-label {
            font-size: 1rem !important;
        }

        #buscaLocalizacao {
            margin-top: -10px;
            margin-bottom: -10px;
        }

        #buscaLocalizacao .v-input {
            font-size: 1rem !important;
        }

        #buscaLocalizacao .headline {
            font-size: 1.2rem !important;
        }

        .container {
            padding-top: 0px;
        }
        .v-slide-group__next, .v-slide-group__prev {
            min-width: 0px  !important;;
        }

    }

    @media (max-width: 349.9px) and (min-width: 300px) {
        .tituloCategoria  {
            font-size: 0.8rem;
            line-height: 1rem;
            text-align: center;
        }
        .categoria {
            width: 80px;
            padding: 0.2rem;
        }
        .container {
            padding-top: 0px;
        }

        #buscaLocalizacao .headline {
            font-size: 1rem !important;
        }

        .viewMobile {
            margin: -60px 0;
        }

        #buscaLocalizacao .v-input {
            font-size: 0.8rem
        }
        h3 {
            font-size:1rem;
        }
        .consensed > p {
            font-size: 1rem;
            text-align: center !important;
            letter-spacing: -0.045rem;
        }

        .imgPessoas {
            height: 150px;
            margin: 0 20%;
        }

        .balao {
            margin: 10px 0;
        }

        .balao .headline {
            font-size: 1rem !important;
        }

        .speech-bubble {
            height: 110px;
            padding: 5px;
        }

        .speech-bubble:after {
            margin-left: -0.356em;
            margin-bottom: -.912em;
        }

        .inputPesquisa {
            margin-top: 0px;
        }

        .cidadeEscolhida .v-input {
            width: 100%;
        }
        .v-slide-group__next, .v-slide-group__prev {
            min-width: 0px  !important;
        }
    }


</style>

<script>
    // @ is an alias to /src
    import Feed from '../components/Feed.vue'
    import api from '@/utils/axios-config';
    import urls from "@/utils/api-path";
    import VueHorizontalList from '../components/vue-horizontal-list.vue';
    import * as easings from 'vuetify/es5/services/goto/easing-patterns'
    import AlertaErro from '@/components/AlertaErro.vue'
    export default {
        name: 'Home',
        components: {
            Feed,
            VueHorizontalList,
            AlertaErro
        },
        data: () => ({
            absolute: false,
            mensagem: null,
            altura: 150,
            type: 'selector',
            selector: '#inputPesquisa',
            rulesSelect: [value => !!value.id || 'Selecione antes de pesquisar'],
            duration: 300,
            offset: 0,
            easing: 'easeInOutCubic',
            titulo: '',
            loading: false,
            orderTxt: '',
            falhou: false,
            //SLIDE
            categoriaSelecionada: null,
            multiple: false,
            mandatory: false,
            showArrows: true,
            prevIcon: false,
            nextIcon: false,
            centerActive: true,
            ufSelecionada: {
                id: null,
                nome: '',
                sigla: ''
            },
            cidadeSelecionada: {
                id: null,
                nome: ''
            },
            bairrosSelecionados: '',
            bairros: [],
            ufs: [],
            cidades: [],
            filtro: {},
            showText: false,
            showFeed: false,
            loadingUF: true,
            loadingCidade: true,
            loadingCategorias: true,
            absoluteOverlay: true,
// 
      optionsScroll: {
          responsive: [
            {end: 576, size: 1}, 
            {start: 576, end: 768, size: 2},
            {start: 768, end: 992, size: 3},
            {size: 4}
          ],
          list: {
            // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
            windowed: 1200,

                    // Because: #app {padding: 80px 24px;}
                    padding: 24
                }
            },
            categorias: [],
            isMobile: false,
            cycle: true,
            slides: [
                {
                    linhaUm: '<strong>#FiqueEmCasa</strong>',
                    linhaDois: '<strong>CUIDE</strong> da sua saúde e',
                    linhaTres: '<strong>AJUDE</strong> quem está AQUI AO LADO.'
                },
                {
                    linhaUm: 'Nesse momento <strong>DIFÍCIL</strong>',
                    linhaDois: '<strong>PEDIMOS</STRONG> para você para lembrar ',
                    linhaTres: 'de alguém que está <strong>AQUI AO LADO</strong>!'
                },
                {
                    linhaUm: '<strong>LEMBRAR</STRONG> da padaria da esquina,',
                    linhaDois: 'do mercadinho da rua',
                    linhaTres: 'do açougue da praça, da loja de roupas.'
                },
                {
                    linhaUm: '<strong>#compredoPequeno</strong>',
                    linhaDois: '<strong>AJUDE </strong>quem tanto depende do comércio.',
                    linhaTres: '<strong>COMPRE PERTO DE VOCÊ</strong>.'
                },
            ]

// 
        }),
        mounted() {
            const vm = this;
            if (vm.cidadeSelecionada.id != null) {
                vm.buscaAnuncios();
               
            }
            vm.onResize();
            


        },
        created() {
            const vm = this;
            vm.getAllUFs();
            if (vm.getUFLocalStorage()) {
                vm.getAllCidades(vm.ufSelecionada.id);
                if (vm.getCidadeLocalStorage()) {
                    vm.showText = true;
                    vm.getBairrosLocalStorage();
                    vm.getAllBairros(vm.cidadeSelecionada.id);
                }
            }
            vm.getAllCategorias()
        },
        methods: {
            toogleShowText() {
                this.showText = !this.showText;
            },
            validateForm() {
                const vm = this;
                if (vm.$refs.formPesquisa.validate()) {
                    vm.buscaAnuncios();
                }
            },
            buscaAnunciosPorBairros(bairrosSelecionados) {
                const vm = this;
                try {
                    this.$gtag.event('buscaAnunciosPorBairros', {
                        'event_category': 'pesquisa',
                        'event_label': 'anuncio',
                        'value': bairrosSelecionados
                    });
                } catch (e) {
                }
                vm.saveBairros(bairrosSelecionados);
                vm.buscaAnuncios();
            },
            buscaAnuncios() {
                const vm = this;
                vm.showFeed = true;
                vm.filtro = {
                    uf: vm.ufSelecionada.id,
                    cidade: vm.cidadeSelecionada.id,
                    bairros: vm.bairrosSelecionados,
                    valor: vm.titulo,
                    categoria: vm.categoriaSelecionada,
                };
                try {
                    this.$gtag.event('buscaAnuncios', {
                        'event_category': 'pesquisa',
                        'event_label': 'anuncio',
                        'value': vm.filtro
                    });
                } catch (e) {
                }
                //metodo do filho Feed
                vm.$refs.feed.getAnuncios(vm.filtro);
            },
            onResize() {
                const vm = this;
                if (window.innerWidth > 600) {
                    vm.isMobile = false;
                    vm.orderTxt = '';                    
                } else {
                    vm.orderTxt = 'first';
                    vm.isMobile = true;
                                    
                }
                if (window.innerWidth > 300) {
                     vm.altura = 80;
                }
                if (window.innerWidth > 350) {
                     vm.altura = 80;
                }
                if (window.innerWidth > 400) {
                     vm.altura = 90;
                }
                if (window.innerWidth > 450) {
                     vm.altura = 90;
                }
                if (window.innerWidth > 500) {
                     vm.altura = 90;
                }
                if (window.innerWidth > 768) {
                     vm.altura = 100;
                }
                // console.log('-----> '+ vm.isMobile +'<-----')
            },
            //bairros
            getBairrosLocalStorage() {
                const vm = this;
                if (localStorage.bairros && localStorage.bairros !== "") {
                    vm.bairrosSelecionados = localStorage.bairros.split(',').map(Number);
                    return true;
                }
                return false;
            },
            cleanBairros() {
                const vm = this;
                vm.bairrosSelecionados = "";
                localStorage.bairros = "";
            },
            saveBairros(bairrosSelecionados) {
                const vm = this;
                localStorage.bairros = bairrosSelecionados;
            },
            getAllBairros(idCidade) {
                const vm = this;
                try {
                    this.$gtag.event('getAllBairros', {
                        'event_category': 'pesquisa',
                        'event_label': 'localizacao',
                        'value': idCidade
                    });
                } catch (e) {
                }
                vm.falhou = false;
                api.get(`${urls.localizacao}${idCidade}${urls.bairros}`)
                    .then(response => {
                        vm.bairros = response.data;
                    })
                    .catch(err => {
                     vm.falhou = true;
                      if(err.status == 400){
                        vm.mensagem = err.data;
                      } 
                    })
                    .finally(() => {
                    });
            },
            //cidade
            getCidadeLocalStorage() {
                const vm = this;
                if (localStorage.cidade && localStorage.cidade !== ""
                    && localStorage.cidadeNome && localStorage.cidadeNome !== "") {
                    vm.cidadeSelecionada.id = parseInt(localStorage.cidade);
                    vm.cidadeSelecionada.nome = localStorage.cidadeNome;
                    return true;
                }
                return false;
            },
            cleanCidade() {
                const vm = this;
                vm.cidadeSelecionada = "";
                localStorage.cidade = "";
                localStorage.cidadeNome = "";
            },
            saveCidade(cidadeSelecionada) {
                const vm = this;
                localStorage.cidade = cidadeSelecionada.id;
                localStorage.cidadeNome = cidadeSelecionada.nome;
                vm.cleanBairros();
                vm.getAllBairros(cidadeSelecionada.id);
                vm.showText = true;
                vm.$vuetify.goTo('#titulo', vm.options);
                vm.buscaAnuncios();
            },
            getAllCidades(uf) {
                const vm = this;
                try {
                    this.$gtag.event('getAllCidades', {
                        'event_category': 'pesquisa',
                        'event_label': 'localizacao',
                        'value': uf
                    });
                } catch (e) {
                }
                vm.falhou = false;
                api.get(`localizacao/${uf}/cidades/pesquisa`)
                    .then(response => {
                        vm.cidades = response.data;
                        vm.loadingCidade = false;
                    })
                    .catch(err => {
                      vm.falhou = true;
                      if(err.status == 400){
                        vm.mensagem = err.data;
                      } 
                    })
                    .finally(() => {
                    });
            },
            // estado - ufs
            getUFLocalStorage() {
                const vm = this;
                if (localStorage.uf && localStorage.uf !== ""
                    && localStorage.ufSigla && localStorage.ufSigla !== "") {
                    vm.ufSelecionada.id = parseInt(localStorage.uf);
                    vm.ufSelecionada.sigla = localStorage.ufSigla;
                    return true;
                }
                return false;
            },
            saveUF(ufSelecionada) {
                const vm = this;
                localStorage.uf = ufSelecionada.id;
                localStorage.ufSigla = ufSelecionada.sigla;
                vm.cleanCidade();
                vm.getAllCidades(ufSelecionada.id);
            },
            getAllUFs() {
                const vm = this;
                vm.falhou = false;
                api.get(urls.ufPesquisa)
                    .then(response => {
                        vm.ufs = response.data;
                        vm.loadingUF = false;
                    })
                    .catch(err => {
                      vm.falhou = true;
                      if(err.status == 400){
                        vm.mensagem = err.data;
                      } 
                    })
                    .finally(() => {
                    });
            },
            getAllCategorias() {
                const vm = this;
                api.get("/categoria")
                    .then(response => {
                        vm.categorias = response.data;
                        vm.loadingCategorias = false;
                        
                    });
            },
        },
        computed: {
            localidade() {
                return `${this.cidadeSelecionada.nome}, ${this.ufSelecionada.sigla}`;
            },
            target() {
                const vm = this;
                const value = vm[vm.type];
                if (!isNaN(value)) return Number(value);
                else return value
            },
            options() {
                const vm = this;
                return {
                    duration: vm.duration,
                    offset: vm.offset,
                    easing: vm.easing,
                }
            }

        },


    }
</script>
