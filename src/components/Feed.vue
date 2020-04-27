<template>
    <v-container class="mt-5">
        <v-skeleton-loader
                :loading="loadingFeed"
                transition="fade-transition"
                type="card"
                height="200"
                width="100%"
                style="margin-top:-26px;"
        >
            <div v-if="anuncios.length < 1">
                <p class="headline text-center"> Ainda não temos nenhum anúncio 
                    <span v-if="filtro.valor != ''"> com <strong>"{{filtro.valor}}"</strong></span>
                 para esta região, seja o primeiro a adicionar!</p>
            </div>
            <div v-else>
                <v-row id="feed" dense>
                    <v-col v-for="(item, i) in anuncios"
                           :key="i"
                           cols="12"
                           md="4"
                           sm="6">

                        <v-card class="mx-auto"
                                @click="$router.push({ name: 'AnuncioDetalhe', params: { id: item.id } })">
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title class="headline">{{item.titulo}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <div class="overline">
                                <v-chip v-for="categoria in item.categorias" :key="categoria.id"
                                        class="ma-1"
                                        x-small
                                        label>
                                    {{categoria.nome}}
                                </v-chip>
                            </div>
                            <v-row>
                                <v-col cols="4" class="marginZero-t marginZero-b">
                                    <v-avatar size="100" tile class="ml-1">
                                        <v-img v-if="item.imagemCapa" :src="'data:image/jpeg;base64,'+ item.imagemCapa"
                                               contain height="100"></v-img>
                                        <v-img v-else src="../assets/img/imagemQuadrado.png" height="100"></v-img>
                                    </v-avatar>
                                </v-col>
                                <v-col cols="8">
                                    <v-card-text class="d-inline-none multiline-ellipsis"
                                                 style="min-height: 25px; max-height:150;white-space: pre-line">
                                        {{item.descricao}}
                                    </v-card-text>
                                </v-col>
                            </v-row>
                            <v-card-actions class="d-inline-none text-truncate" style="min-height: 25px;">
                                <v-btn text color="deep-purple accent-4">
                                    {{item.contato}}
                                </v-btn>
                            </v-card-actions>
                            <v-divider></v-divider>
                            <v-card-actions class="d-inline-none text-truncate marginZero">
                                <v-spacer></v-spacer>
                                <v-card-subtitle class="compartilhar">
                                    Compartilhar por
                                </v-card-subtitle>
                                <v-btn small icon target="_blank" rel="noopener noreferrer"
                                       :href="linkWhatsapp(item.id)" data-action="share/whatsapp/share">
                                    <v-icon>mdi-whatsapp</v-icon>
                                </v-btn>
                                <v-btn small icon target="_blank" rel="noopener noreferrer"
                                       :href="linkTelegram(item.id)" data-action="share/whatsapp/share">
                                    <v-icon>mdi-telegram</v-icon>
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-skeleton-loader>
    </v-container>
</template>

<style scoped>
    .multiline-ellipsis {
        display: block;
        display: -webkit-box;
        max-width: 400px;
        height: 100px;
        margin: 0 auto;
        font-size: 0, 9rem;
        line-height: 1.4;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .v-list-item {
        padding: 0 5px;
    }

    .v-text-field {
        padding-top: 0px;
        margin-top: 0px;
    }

    .v-list-item__content {
        padding: 0px 0;
    }

    .marginZero {
        padding: 0px;
        margin: 0px;
    }

    .marginZero-l {
        padding-left: 0px;
        margin-left: 0px;
    }

    .marginZero-r {
        padding-right: 0px;
        margin-right: 0px;
    }

    .marginZero-t {
        padding-top: 0px;
        margin-top: 0px;
    }

    .marginZero-b {
        padding-bottom: 0px;
        margin-bottom: 0px;
    }

    .v-card__text.v-card__text {
        padding: 0px 10px;
    }

    .compartilhar.v-card__subtitle {
        padding: 0px 10px 0px 0px;
    }
</style>

<script>
    import api from '@/utils/axios-config';
    import urls from "@/utils/api-path";

    export default {
        name: 'Feed',
        props: ['filtro'],
        components: {},
        data: () => ({
            cores: ['#1F7087', '#952175', '#385F73'],
            fotos: [],
            anuncios: [],
            loadingFeed: true,
            pageIndex: 0,
            isLastPage: false
        }),
        created() {
            const vm = this;
        },
        mounted() {
            this.scroll();
        },
        computed: {
            url() {
                return window.location.href;
            },
        },
        methods: {
            linkWhatsapp(id) {
                const vm = this;
                try {
                    this.$gtag.event('linkWhatsapp', {
                        'event_category': 'compartilhar',
                        'event_label': 'anuncio',
                        'value': id
                    });
                } catch (e) {
                }
                let ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)
                if (ismobile)
                    return `https://api.whatsapp.com/send?text=${vm.url}`
                return `https://web.whatsapp.com/send?text=${vm.url}anuncio-detalhe/${id}`
            },
            linkTelegram(id) {
                const vm = this;
                try {
                    this.$gtag.event('linkTelegram', {
                        'event_category': 'compartilhar',
                        'event_label': 'anuncio',
                        'value': id
                    });
                } catch (e) {
                }
                return `https://telegram.me/share/url?url=${vm.url}anuncio-detalhe/${id}&text=Apoie o comercio local`
            },
            getAnuncios(filtro) {
                const vm = this;
                vm.isLastPage = false; //eh uma nova pesquisa
                vm.anuncios = []
                vm.pageIndex = 0;
                vm.loadingFeed = true;
                try {
                    this.$gtag.event('getAnuncios', {
                        'event_category': 'feed',
                        'event_label': 'anuncio',
                        'value': filtro
                    });
                } catch (e) {
                }
                if (filtro.bairros.length >= 1)
                    filtro.bairros = filtro.bairros.join(',');
                vm.loadMore(filtro)
            },
            loadMore(filtro) {
                const vm = this;
                filtro.page = vm.pageIndex;
                try {
                    this.$gtag.event('loadMore', {
                        'event_category': 'feed',
                        'event_label': 'anuncio',
                        'value': filtro
                    });
                } catch (e) {
                }
                api.get(urls.anuncio, {params: filtro})
                    .then(response => {
                        let append = response.data;
                        vm.loadingFeed = false;
                        if (append.length == 0) {
                            vm.isLastPage = true;
                            return
                        }
                        vm.pageIndex++;
                        vm.anuncios = vm.anuncios.concat(append);
                    })
                    .catch(err => {
                        {
                            console.error(err);
                        }
                    })
                    .finally(() => {
                    });
            },
            scroll() {
                const vm = this;
                window.onscroll = () => {
                    let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                    if (bottomOfWindow && !vm.isLastPage && !vm.loadingFeed) {
                        vm.loadMore(vm.filtro);
                    }
                }
            },
        },
    }
</script>
