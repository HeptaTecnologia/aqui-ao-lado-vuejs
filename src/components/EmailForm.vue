<template>
    <v-container id="emailCadastro">
        <div v-if="showSucesso">
            <v-col class="col-12">
                <h2 class="text-center mb-2">Email cadastrado com sucesso.</h2>
                <p class="text-center">Mandaremos um lembrete para você próximo a data de vencimento desse anuncio!</p>
            </v-col>
            <v-row align="center" justify="center">
                <v-col cols="12" md="6" class="text-center">
                    <v-btn 
                    outlined  
                    small             
                    to="/"
                    color="primary darken-1">Voltar para página inicial
                    </v-btn>
                </v-col>
                <v-col cols="12" md="12" class="text-center">
                    <v-btn 
                    small
                    @click="$router.push({ name: 'AnuncioDetalhe', params: { id: id } })"
                    color="primary">Ver meu anúncio
                    </v-btn>
                </v-col>
            </v-row>
        </div>
        <v-form lazy-validation ref="formEmail" v-else>
            <AlertaErro v-if="falhou" :mensagem-erro="mensagem"></AlertaErro>
            <v-row>
                <v-col class="col-12 text-center">
                    <h2 class="mb-2">Anúncio cadastrado com sucesso.</h2>
                   Nossos anúncios são compartilhados por 1 mês caso deseje renová-lo forneça seu email que mandaremos um lembrete próximo a data de expiração.
                </v-col>
                <v-col cols="12">
                    <v-text-field 
                    id="email"  
                    label="Insira seu email" 
                    outlined                
                    background-color="#FFF"
                    dense
                    v-model="email" 
                    :rules="rules">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <v-btn 
                    outlined 
                    block   
                    small             
                    @click="$router.push({ name: 'AnuncioDetalhe', params: { id: id } })"
                    color="red darken-1">Não precisa
                    </v-btn>
                </v-col>
                <v-col cols="8">
                    <v-btn 
                    block
                    small
                    :loading="loadingBotao"
                    @click="cadastrarEmailMantenedor"
                    color="primary">Quero ser lembrado!
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>
<style scoped>

@media (max-width: 1100px) and (min-width: 999.9px) {

}

@media (max-width: 1000px) and (min-width: 899.9px) {
 
}

@media (max-width: 900px) and (min-width: 767.9px) {

}

@media (max-width: 768px) and (min-width: 400px) {
.v-btn.v-size--small {
    font-size: 0.6rem;
}
}
@media (max-width: 399.9px) and (min-width: 300px) {
    .v-btn.v-size--small {
     font-size: 0.5rem;
    }
    h2{
        text-align: center;   
        line-height: 1.3rem;
    }
  }
</style>
<script>
import api from '@/utils/axios-config'
import urls from '@/utils/api-path'
import AlertaErro from '@/components/AlertaErro'
export default {
    components: {
        AlertaErro
    },
    data: () => ({
        rules:[
            value => !!value || 'Obrigatório.',
            value => (value.indexOf("@") != -1 && value.split("@")[1].indexOf(".") != -1) || 'Insira um email Valido' 
        ],
        falhou: false,
        mensagem: null, 
        email:'',
        id: null,
        showSucesso: false,
        loadingBotao: false,
    }),
    computed: {

    },
    methods: {
        emailValido () {
            const vm = this;
            return vm.$refs.formEmail.validate()
        },
        cadastrarEmailMantenedor(){
            const vm = this;
            try {
                this.$gtag.event('cadastrarEmailMantenedor', {
                    'event_category': 'cadastro',
                    'event_label': 'mantenedor',
                    'value': vm.email
                });
            } catch (e) {
            }
            if(!vm.emailValido())
                return;
            vm.loadingBotao = true
            vm.falhou = false;
            api.post(`${urls.anuncio}/${vm.id}${urls.anunciante}`, { 'email': vm.email })
                    .then(response => {
                        vm.loadingBotao = false
                        vm.showSucesso = true;
                    })
                    .catch(err => {
                        vm.loadingBotao = false
                        vm.falhou = true;
                        if(err.status == 400){
                            vm.mensagem = err.data;
                        }
                    });
        }
    },
    created(){
        const vm = this;
        vm.id = vm.$route.params.id_anuncio;
    }
}
</script>