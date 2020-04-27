<template>
    <v-container id="anuncioDetalhe">
        <AlertaErro v-if="falhou" :mensagem-erro="mensagem"></AlertaErro>
        <v-card>
            <v-row dense align="center" justify="space-between">
                <v-btn text
                       color="primary mb-2 p-2"
                       small
                       to="/"
                       id="btnPesquisa">
                    <v-icon left>mdi-keyboard-backspace</v-icon>
                    Voltar para a pesquisa
                </v-btn>
                <v-card-actions>
                    <v-card-subtitle>
                        Compartilhar por
                    </v-card-subtitle>
                    <v-spacer></v-spacer>

                    <v-btn icon target="_blank" rel="noopener noreferrer" :href="shareWhatsapp"
                           data-action="share/whatsapp/share">
                        <v-icon>mdi-whatsapp</v-icon>
                    </v-btn>
                    <v-btn icon target="_blank" rel="noopener noreferrer" :href="shareTelegram"
                           data-action="share/whatsapp/share">
                        <v-icon>mdi-telegram</v-icon>
                    </v-btn>
                    <!--
                    <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                    </v-btn>
                    -->
                </v-card-actions>
            </v-row>

            <v-divider></v-divider>
            <v-row dense class="margemZero">
                <v-col cols="12" md="4" sm="4">
                    <!-- <img :src="anuncioDetalhe.imagemCapa ? anuncioDetalhe.imagemCapa : '../assets/img/imagemGenerica.png' "/> -->
                    <v-img v-if="anuncioDetalhe.imagemCapa" :src="'data:image/jpeg;base64,'+anuncioDetalhe.imagemCapa"
                           contain></v-img>
                    <v-img v-else src="../assets/img/imagemGenerica.png"></v-img>
                </v-col>
                <v-col cols="12" md="8" sm="8">
                    <v-card-title class="headline" v-text="anuncioDetalhe.titulo"></v-card-title>
                    <v-card-text>
                        <p style="white-space: pre-line">{{anuncioDetalhe.descricao}}</p>
                        <br/>
                        <strong>Entre em contato:</strong>
                        <p>{{anuncioDetalhe.contato}}</p>
                        
                        <v-btn v-if="anuncioDetalhe.whatsapp"
                            small 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            :href="contactWhatsapp"
                            data-action="share/whatsapp/share">
                            <v-icon color="green" >mdi-whatsapp</v-icon>
                            <span color="green">Mande um whatsapp</span>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <br/>


                        <v-btn v-if="anuncioDetalhe.instagram"
                            small
                            target="_blank" 
                            rel="noopener noreferrer" 
                            :href="contactInstagram"
                            data-action="share/whatsapp/share">
                            <v-icon color="#c52e91">mdi-instagram</v-icon>
                            <span>{{anuncioDetalhe.instagram}}</span>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <br/>
                        <strong>Cidade:</strong>
                        <p>{{anuncioDetalhe.cidade.nome}}/{{anuncioDetalhe.uf.sigla}}</p>
                    </v-card-text>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row dense v-if="anuncioDetalhe.locaisEntrega.length != 0">
                <v-card-title>
                    <h5>Local de atendimento:</h5>
                </v-card-title>
                <v-card-text>
                    <v-chip
                            class="ma-2"
                            label
                            small
                            v-for="item in anuncioDetalhe.locaisEntrega"
                            :key="item.id">
                        {{item.nome}}
                    </v-chip>
                </v-card-text>
            </v-row>
            <v-divider></v-divider>
            <v-row dense align="center" justify="space-between">
                <v-btn small text color="red"
                       :href="'mailto:analytics.aquiaolado@gmail.com?subject=Denúncia a oferta nº'+ anuncioDetalhe.id +'&body=Gostaria de denunciar a oferta nº'+  anuncioDetalhe.id + ' por motivo de: '">
                    <v-icon class="mr-2">mdi-comment-alert-outline</v-icon>
                    Denunciar
                </v-btn>
                <v-btn small text color="blue"
                       :href="'mailto:analytics.aquiaolado@gmail.com?subject=Editar a oferta nº'+ anuncioDetalhe.id +'&body=Gostaria de sugerir a edição da oferta nº'+  anuncioDetalhe.id + ' da seguinte forma:'">
                    <v-icon class="mr-2">mdi-comment-text-outline</v-icon>
                    Sugerir edição
                </v-btn>
            </v-row>


        </v-card>


    </v-container>
</template>

<script>
    import api from '@/utils/axios-config';
    import urls from "@/utils/api-path";
    import AlertaErro from '@/components/AlertaErro'
    // import { mdiWhatsapp } from '@mdi/js';

    export default {
        name: 'AnuncioDetalhe',
        components: {
            AlertaErro
        },
        data: () => ({
            falhou: false,
            mensagem: null,
            idAnuncio: null,
            //  anuncioDetalhe: {"id":32,"titulo":"Verdura","descricao":"Frutas e verduras na praça","imagemCapa":null,"anunciante":"samuel@samborges.com","dataAnuncio":1585621674000,"localAnuncio":"QE32","contato":"61984546806","uf":{"id":7,"sigla":"DF","nome":"Distrito Federal"},"cidade":{"id":882,"uf":{"id":7,"sigla":"DF","nome":"Distrito Federal"},"nome":"Brasília"},"locaisEntrega":[{"id":10,"cidade":{"id":882,"uf":{"id":7,"sigla":"DF","nome":"Distrito Federal"},"nome":"Brasília"},"nome":"Guará"}],"categorias":[{"id":1,"nome":"verdurão"}]},
            anuncioDetalhe: {
                id: null,
                titulo: "",
                descricao: "",
                imagemCapa: "",
                anunciante: "",
                dataAnuncio: null,
                localAnuncio: "",
                contato: "",
                uf: {
                    id: null,
                    sigla: "",
                    nome: ""
                },
                cidade: {
                    id: null,
                    uf: {
                        id: null,
                        sigla: "",
                        nome: ""
                    },
                    nome: ""
                },
                locaisEntrega: [
                    {
                        id: null,
                        cidade: {
                            id: null,
                            uf: {
                                id: null,
                                sigla: "",
                                nome: ""
                            },
                            nome: ""
                        },
                        nome: ""
                    },
                    {
                        id: null,
                        cidade: {
                            id: null,
                            uf: {
                                id: null,
                                sigla: "",
                                nome: ""
                            },
                            nome: ""
                        },
                        nome: ""
                    }
                ],
                categorias: [
                    {
                        id: null,
                        nome: ""
                    }
                ]
            }

        }),
        methods: {
            getAnuncio(idAnuncio) {
                const vm = this;
                try {
                    try {
                        this.$gtag.event('getAnuncio', {
                            'event_category': 'detalhe',
                            'event_label': 'anuncio',
                            'value': idAnuncio
                        });
                    } catch (e) {
                    }
                }catch (e) {

                }
                vm.falhou = false;
                api.get(`${urls.anuncio}/${idAnuncio}`)
                    .then(response => {
                        //nao existe esse anuncio
                        if (response.data === '') {
                            vm.$router.push({name: 'PaginaNaoEncontrada'});
                        }
                        vm.anuncioDetalhe = response.data;
                    })
                    .catch(err => {
                        vm.falhou = true;
                        if(err.status == 400){
                            vm.mensagem = err.data;
                        } 
                    })
                    .finally(() => {
                    });
            }
        },

        created() {
            const vm = this;
            vm.idAnuncio = vm.$route.params.id;
            vm.getAnuncio(vm.idAnuncio);
        },
        computed: {
            contactWhatsapp() {
                const vm = this;
                try {
                    this.$gtag.event('contatoViaWhatsapp', {
                        'event_category': 'contato',
                        'event_label': 'anuncio',
                        'value': vm.idAnuncio
                    });
                } catch (e) {
                }
                let ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
                if (ismobile) {
                    return `https://api.whatsapp.com/send?phone=${vm.anuncioDetalhe.whatsapp}&text=Ol%C3%A1%2C+vi+seu+an%C3%BAncio+no+Aqui+ao+Lado+e+gostaria+de+fazer+um+pedido%21`;
                }
                return `https://web.whatsapp.com/send?phone=${vm.anuncioDetalhe.whatsapp}&text=Ol%C3%A1%2C+vi+seu+an%C3%BAncio+no+Aqui+ao+Lado+e+gostaria+de+fazer+um+pedido%21`;
            },
            contactInstagram() {
                const vm = this;
                try {
                    this.$gtag.event('contatoViaInstagram', {
                        'event_category': 'contato',
                        'event_label': 'anuncio',
                        'value': vm.idAnuncio
                    });
                } catch (e) {
                }

                return `https://www.instagram.com/${vm.anuncioDetalhe.instagram}`;
               
            },
            shareWhatsapp() {
                const vm = this;
                try {
                    this.$gtag.event('shareWhatsapp', {
                        'event_category': 'compartilhar',
                        'event_label': 'anuncio',
                        'value': vm.idAnuncio
                    });
                } catch (e) {
                }
                let ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
                if (ismobile) {
                    return `https://api.whatsapp.com/send?text=${vm.url}`;
                }
                return `https://web.whatsapp.com/send?text=${vm.url}`;
            },
            shareTelegram() {
                const vm = this;
                try {
                    this.$gtag.event('shareTelegram', {
                        'event_category': 'compartilhar',
                        'event_label': 'anuncio',
                        'value': vm.idAnuncio
                    });
                } catch (e) {
                }
                return `https://telegram.me/share/url?url=${vm.url}&text=Apoie o comercio local`;
            },
            url() {
                return window.location.href;
            },
            dataAnuncioFormatada() {
                const vm = this;
                return new Date(vm.anuncioDetalhe.dataAnuncio).toLocaleString('pt-BR');
            }
        }
    }
</script>

<style scoped>
    .v-card__title + .v-card__subtitle {
        margin-top: 0px;
    }

    .v-card__subtitle, .v-card__text, .v-card__title {
        padding: 0px 10px;
    }

    @media (max-width: 1100px) and (min-width: 999.9px) {

    }

    @media (max-width: 1000px) and (min-width: 899.9px) {

    }

    @media (max-width: 900px) and (min-width: 767.9px) {

    }

    @media (max-width: 768px) and (min-width: 400px) {
        .margemZero {
            padding: 0px;
        }

        .consensed > p {
            font-size: 1.3rem;
        }

        .viewMobile {
            margin: -40px 0;
        }
    }

    @media (max-width: 399.9px) and (min-width: 300px) {
        .viewMobile {
            margin: -40px 0;
        }

        .margemZero {
            padding: 0px;
        }

        .consensed > p {
            font-size: 1.3rem;
            text-align: center !important;
        }

    }

</style>