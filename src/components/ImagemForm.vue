<template>
    <v-container id="enviaImagem" class="margemMobile">
        <AlertaErro v-if="falhou" :mensagem-erro="mensagem"></AlertaErro>
        <v-form lazy-validation  ref="formImagem">
            <v-row>
                <v-col cols="12" class="mt-2 text-center">
                    <h2>Envie uma imagem para o seu anuncio.</h2>
                </v-col>
            </v-row>

            <v-row class="no-gutters">
                <v-col cols="12">
                    <v-text-field
                            id="anuncio"
                            label="Qual o id do Anuncio?"
                            outlined
                            :counter="maxNumber"
                            :rules="rulesMax"
                            dense
                            background-color="#FFF"
                            v-model="anuncioId">
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                            id="chaveImagem"
                            label="Qual a chave de alteração?"
                            :counter="maxNumber"
                            :rules="rulesMax"
                            outlined
                            dense
                            background-color="#FFF"
                            v-model="chaveAlteracao">
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
                            :x-large="true"
                            color="primary"
                            @click="validaForm"
                            @keyup.enter="validaForm"
                    >Enviar Imagem
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
        name: 'EnviaImagem',
        components: {
            AlertaErro
        }, 
        data: () => ({
            rulesMaxDescricao: [value => (value.length <= 1000) || 'Máx 1000 caracteres'],
            rulesMax: [value => (value.length <= 16) || 'Máx 16 caracteres'],
            rules: [
                value => !!value || 'Obrigatório',
                value => (value && value.length >= 3) || 'Min 3 caracteres',
                value => (value && value.length <= 255) || 'Máx 255 caracteres',
            ],
            rulesFoto: [ value => !value || value.size < 7000000 || 'Máx 7 MB, escolha uma foto menor!' ],
            selectRules: [value => value != null || 'Obrigatório'],
            falhou: false,
            mensagem: null,
            foto: null,
            anuncioId: null,
            chaveAlteracao: null,
            loadingBotao: false,
            max: 255,
            maxNumber: 16,
            maxDescricao: 1000,
            recaptchaInstance: null,
        }),

        methods: {
            limpaForm(){
                const vm = this;
                vm.falhou= false;
                vm.mensagem= null;
                vm.foto= null;
                vm.anuncioId= null;
            },
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
                if (vm.$refs.formImagem.validate()){
                    vm.loadingBotao = true
                    vm.checkRecaptcha();
                }
            },
            async enviarFormulario(token) {
                const vm = this;
                try {
                    this.$gtag.event('enviarImagem', {
                        'event_category': 'alteracao',
                        'event_label': 'anuncio',
                        'value': vm.anuncioId
                    });
                } catch (e) {
                }
                vm.falhou = false;

                const formData = new FormData();
                formData.append("imagem", vm.foto);
                formData.append("anuncioId", vm.anuncioId);
                formData.append("chaveAlteracao", vm.chaveAlteracao);
                formData.append("recaptchaToken", token);

                api.post("/anuncio/imagem", formData)
                    .then(response => {
                        vm.limpaForm();
                        // vm.$router.push("/anuncio-detalhe/"+vm.anuncioId);
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
        },

        async created() {
            const vm = this;
        },
    }
</script>

