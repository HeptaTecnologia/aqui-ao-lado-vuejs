<template>
    <v-container id="novoCadastro" class="margemMobile">
        <AlertaErro v-if="falhou" :mensagem-erro="mensagem"></AlertaErro>
        <v-form lazy-validation ref="formAnuncio">
            <v-row>
                <v-col cols="12" class="mt-2 text-center">
                    <h2>Indique um negócio ou serviço perto de você.</h2>
                </v-col>
            </v-row>

            <v-row class="no-gutters">
                <v-col cols="12">
                    <v-text-field
                            id="titulo"
                            label="Qual o título do seu anúncio?"
                            :counter="max"
                            outlined
                            dense
                            background-color="#FFF"
                            v-model="titulo"
                            :rules="rules">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            id="contato"
                            label="Qual o whatsapp para contato?"
                            :counter="30"
                            :rules="rulesWhatsapp"
                            outlined
                            background-color="#FFF"
                            v-mask="['(##) ####-####', '(##) #####-####']"
                            :masked="true"
                            v-model="whatsapp">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            id="contato"
                            label="Qual o perfil no instagram?"
                            :counter="30"
                            :rules="rulesInstagram"
                            outlined
                            dense
                            prefix="@"
                            hint="Coloque o nome do seu perfil"
                            background-color="#FFF"
                            v-model="instagram">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            id="contato"
                            label="Quais são outras formas de entrar em contato?"
                            :counter="max"
                            :rules="rulesMax"
                            outlined
                            dense
                            background-color="#FFF"
                            v-model="contato">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                            outlined
                            dense
                            background-color="#FFF"
                            :counter="maxDescricao"
                            :rules="rulesMaxDescricao"
                            label="Faça uma descrição do produto"
                            :persistent-hint=true
                            hint="Produtos, preços, dias e horários de entrega ou retirada, taxas de entrega, rede social..."
                            placeholder="Ex:
Produtos:
Doces e biscoitos a partir de 2,00

Fazemos entrega e aceitamos retirada no local.

Horário de Entrega: seg a sex 0:00 - 00:00 
Horário de Retirada: seg a sex 0:00 - 00:00 

Valor do frete:
a partir de 5,00 ou 5,00 para tais regiões

Rede Social:
www.... ou @siclano no instagram'"
                            v-model="descricao"
                            class="descricao"
                    ></v-textarea>
                </v-col>

                <v-col cols="12">
                    <v-select
                            v-model="idCategorias"
                            :items="categorias"
                            no-data-text="Nenhuma opção disponível"
                            item-value="id"
                            item-text="nome"
                            chips
                            dense
                            label="Qual o tipo de Produto?"
                            multiple
                            solo
                            :rules="selectRules"
                    ></v-select>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6">
                    <v-select
                            v-model="idEstado"
                            :items="estados"
                            label="Qual o estado?"
                            item-value="id"
                            item-text="sigla"
                            dense
                            no-data-text="Nenhuma opção disponível"
                            hide-details
                            single-line
                            :rules="selectRules"
                            @change="getAllCidades"
                    ></v-select>
                </v-col>
                <v-col cols="6">
                    <v-select
                            v-model="idCidade"
                            :items="cidades"
                            label="Qual é a cidade?"
                            hide-details
                            single-line
                            item-value="id"
                            item-text="nome"
                            dense
                            :rules="selectRules"
                            no-data-text="Nenhuma opção disponível"
                            @change="getAllBairros"
                            :disabled=" idEstado == null">
                    </v-select>
                </v-col>

                <v-col v-if="bairros.length >= 1" cols="12">
                    <v-select
                            v-model="idBairros"
                            :items="bairros"
                            label="Quais são as regiões de entrega e/ou retirada?"
                            item-value="id"
                            item-text="nome"
                            :rules="selectRules"
                            no-data-text="Nenhuma opção disponível"
                            hide-details
                            single-line
                            chips
                            multiple
                            dense
                            :disabled="idCidade == null">
                    </v-select>
                </v-col>

                <br>
            </v-row>
            <v-row>
            <v-col cols="12">
                <v-checkbox
                    v-model="aceitaRetirada"
                    label="Aceita retirada no local"
                    ></v-checkbox>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            v-if="aceitaRetirada"
                            id="endereco"
                            label="Qual o endereço para retirada?"
                            :counter="max"
                            :rules="rulesMax"
                            outlined
                            dense
                            background-color="#FFF"
                            v-model="localAnuncio">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-file-input
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Carregue aqui uma foto do produto"
                            prepend-icon="mdi-camera"
                            outlined
                            show-size
                            counter
                            :rules="rulesFoto"
                            v-model="foto"
                            label="Foto">
                    </v-file-input>
                </v-col>
            </v-row>

            <v-row>
                <div class="col-12">
                    <v-btn
                            outlined
                            block
                            :loading="loadingBotao"
                            :rules="selectRules"
                            :x-large="true"
                            color="primary"
                            @click="validaForm"
                            @keyup.enter="validaForm"
                    >Publicar Anúncio
                    </v-btn>
                </div>
            </v-row>
        </v-form>
    </v-container>
</template>
<style scoped>
    #btnCadastrar {
        display: none !important;
    }

    .margemZero {
        padding: 0px;
    }

    h1 {
        color: #a57c4a
    }

    .descricao ::placeholder {
        font-size: 1rem;
        font-style: italic;
    }

    .v-text-field__slot textarea {
        font-size: .5rem !important;
        color: red;
    }


    @media (max-width: 1100px) and (min-width: 999.9px) {

    }

    @media (max-width: 1000px) and (min-width: 899.9px) {

    }

    @media (max-width: 900px) and (min-width: 767.9px) {

    }

    @media (max-width: 768px) and (min-width: 400px) {
        .margemMobile {
            padding: 0px 25px;
        }

        h2 {
            text-align: center;
            font-size: 1.3rem;
        }

        .v-input {
            font-size: 1.3rem !important;
        }

        .v-input .v-label {
            font-size: 1rem !important;
        }

        .v-text-field {
            padding-top: 0px;
            margin-top: 0px;
        }

        .v-textarea textarea::placeholder {
            font-size: 0.5rem;
            color: red;
        }

        .descricao ::placeholder {
            font-size: 1rem;
            font-style: italic;
        }
    }

    @media (max-width: 399.9px) and (min-width: 350px) {
        .margemMobile {
            padding: 0px 20px;
        }

        #header h1 {
            font-size: 1.5rem;
        }

        #header img {
            height: 50px;
        }

        h2 {
            text-align: center;
            font-size: 1.2rem;
        }

        .v-input {
            font-size: 1 . rem !important;
        }

        .v-input .v-label {
            font-size: 1rem !important;
        }

        .v-text-field {
            padding-top: 0px;
            margin-top: 0px;
        }

        .v-text-area ::placeholder {
            font-size: 1rem;;
        }

        .descricao ::placeholder {
            font-size: 1rem;
            font-style: italic;
        }

    }

    @media (max-width: 349.9px) {
        .margemMobile {
            padding: 0px 10px;
        }

    }
</style>
<script>
    import api from '@/utils/axios-config';
    import imageCompression from 'browser-image-compression';
    import AlertaErro from '@/components/AlertaErro'

    export default {
        name: 'AnuncioNovo',
        components: {
            AlertaErro
        }, 
        data: () => ({
            rulesMaxDescricao: [value => (value.length <= 1000) || 'Máx 1000 caracteres'],
            rulesMax: [value => (value.length <= 255) || 'Máx 255 caracteres'],
            rulesInstagram: [value => (value.length <= 50) || 'Máx 50 caracteres'],
            rulesWhatsapp: [value => (value.length <= 30) || 'Máx 30 caracteres'],
            rules: [
                value => !!value || 'Obrigatório',
                value => (value && value.length >= 3) || 'Min 3 caracteres',
                value => (value && value.length <= 255) || 'Máx 255 caracteres',
            ],
            rulesFoto: [ value => !value || value.size < 7000000 || 'Máx 7 MB, escolha uma foto menor!' ],
            selectRules: [value => value != null || 'Obrigatório'],
            aceitaRetirada: false,
            falhou: false,
            mensagem: null,
            foto: null,
            contato: "",
            titulo: "",
            localAnuncio: "",
            loadingBotao: false,
            descricao: "",
            categorias: [],
            estados: [],
            cidades: [],
            bairros: [],
            dataAnuncio: null,
            idCategorias: null,
            idEstado: null,
            idCidade: null,
            idBairros: null,
            whatsapp: "",
            instagram: "",
            max: 255,
            maxDescricao: 1000,
            recaptchaInstance: null,
        }),

        methods: {
            async checkRecaptcha() {
                const vm = this;
                // (optional) Wait until recaptcha has been loaded.
                await vm.$recaptchaLoaded();

                // Execute reCAPTCHA with action "login".
                const token = await vm.$recaptcha('salvaAnuncio');

                await vm.enviarFormulario(token);
                // Do stuff with the received token.
            },
            validaForm(token) {
                const vm = this;
                if (vm.$refs.formAnuncio.validate()){
                    vm.loadingBotao = true
                    vm.checkRecaptcha();
                }
            },
            getAllCategorias() {
                const vm = this;
                vm.falhou = false; 
                api.get("/categoria")
                    .then(response => {
                        vm.categorias = response.data;
                    })
                    .catch(err => {
                        vm.falhou = true;
                        if(err.status == 400){
                            vm.mensagem = err.data;
                        } 
                    });
            },

            getAllEstados() {
                const vm = this;
                vm.falhou = false; 
                api.get("/localizacao/uf")
                    .then(response => {
                        vm.estados = response.data;
                    })
                    .catch(err => {
                        vm.falhou = true;
                        if(err.status == 400){
                            vm.mensagem = err.data;
                        } 
                    });
            },

            getAllCidades() {
                const vm = this;
                vm.falhou = false; 
                api.get(`/localizacao/${vm.idEstado}/cidades`)
                    .then(response => {
                        vm.cidades = response.data;
                    })
                    .catch(err => {
                        vm.falhou = true;
                        if(err.status == 400){
                            vm.mensagem = err.data;
                        } 
                    });
            },

            getAllBairros() {
                const vm = this;
                vm.falhou = false; 
                api.get(`localizacao/${vm.idCidade}/bairros`)
                    .then(response => {
                        vm.bairros = response.data;
                    })
                    .catch(err => {
                        vm.falhou = true;
                        if(err.status == 400){
                            vm.mensagem = err.data;
                        } 
                    });
            },
            async enviarFormulario(token) {
                const vm = this;
                let requestBody = await vm.getDefaultObject(token);
                try {
                    this.$gtag.event('enviarFormulario', {
                        'event_category': 'cadastro',
                        'event_label': 'anuncio',
                        'value': requestBody.anuncio
                    });
                } catch (e) {
                }
                vm.falhou = false;

                const formData = new FormData();
                const blob = new Blob([JSON.stringify(requestBody.anuncio)], {
                    type: 'application/json;charset=utf-8'
                });
                formData.append("anuncioDto", blob);
                formData.append("imagemCapa", vm.foto);

                api.post("/anuncio", formData)
                    .then(response => {
                        vm.$router.push("/anuncio-cadastrado/" + response.data)
                        vm.loadingBotao = false
                    })
                    .catch(err => {
                        vm.loadingBotao = false
                        vm.falhou = true;
                        if(err.status === 400){
                            vm.mensagem = err.data;
                        } 
                    })
            },
            async getDefaultObject(token) {
                const vm = this;
                return {
                    anuncio: {
                        titulo: vm.titulo,
                        descricao: vm.descricao,
                        anunciante: null,
                        dataAnuncio: new Date().getTime(),
                        localAnuncio: vm.localAnuncio,
                        contato: vm.contato,
                        uf: {id: vm.idEstado},
                        cidade: {id: vm.idCidade},
                        locaisEntrega: vm.idBairros != null ? vm.idBairros.map(item => {
                            return {id: item}
                        }) : [],
                        categorias: vm.idCategorias != null ? vm.idCategorias.map(item => {
                            return {id: item}
                        }) : [],
                        recaptchaToken: token,
                        whatsapp: vm.whatsapp ? "55" + vm.whatsapp.replace(/\D/g, "") : null,
                        instagram: vm.instagram ? vm.instagram : null,
                    }
                }
            },
        },

        created() {
            const vm = this;
            vm.getAllCategorias();
            vm.getAllEstados();
        },
    }
</script>

