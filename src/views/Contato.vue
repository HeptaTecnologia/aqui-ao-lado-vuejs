<template>
  <v-container class="fill-height" id="paginaContato">
    <v-form lazy-validation ref="formAnuncio">
        <v-row class=" mt-2" justify="center" >
            <v-col cols="12" class="text-center">        
                <h2>Escolha sobre o que você deseja escrever.</h2>
            </v-col>
            <v-col cols="12" md="6">  
                <v-card outlined >
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Sugestão</v-list-item-title>
                        <v-list-item-subtitle>Envie uma sugestão para nosso novo portal. Ajude-nos a melhorar nossos serviços.</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                
                    <v-card-actions>
                        <v-btn  block small color="primary"
                        @click="enviarEmail('mailto:analytics.aquiaolado@gmail.com?subject=Sugestão &body=Envie uma sugestão para nosso novo portal. Ajude-nos a melhorar nossos serviços.')">Escrever</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">   
                <v-card outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Dúvida</v-list-item-title>
                        <v-list-item-subtitle>Dúvidas sobre algum produto ou serviço? </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                
                    <v-card-actions>
                        <v-btn  block small color="primary" @click="enviarEmail('mailto:analytics.aquiaolado@gmail.com?subject=Dúvida &body=Dúvidas sobre algum produto ou serviço?')" >Escrever</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">   
                <v-card outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Denúncia</v-list-item-title>
                        <v-list-item-subtitle>Encontrou algo que queira denúnciar? Envie o título da oferta para cuidarmos disso.</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                
                    <v-card-actions>
                        <v-btn  block small color="primary" @click="enviarEmail('mailto:analytics.aquiaolado@gmail.com?subject=Denúncia &body=Encontrou algo que queira denúnciar? Envie o título da oferta para cuidarmos disso.')">Escrever</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" md="6" >   
                <v-card outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-1">Correção</v-list-item-title>
                        <v-list-item-subtitle>Encontrou algum dado errado? Avise-nos para corrigirmos.</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                
                    <v-card-actions>
                        <v-btn  block small color="primary" @click="enviarEmail('mailto:analytics.aquiaolado@gmail.com?subject=Correção &body=Encontrou algum dado errado? Avise-nos para corrigirmos.')">Escrever</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

               <!-- <v-form ref="form" v-model="valid">
                    <v-text-field v-model="name"
                                  :rules="nameRules"
                                  label="Nome">
                    </v-text-field>
            
                    <v-text-field v-model="email" 
                                  :rules="emailRules"
                                  label="E-mail"
                                  required>
                    </v-text-field>
            
                    <v-select v-model="select"
                              :items="items"
                              :rules="[v => !!v || 'Item is required']"
                              label="Item"
                              required>
                    </v-select>
            
                    <v-btn :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="validate">
                    Enviar
                    </v-btn>
                </v-form> -->
        </v-row>
    </v-form>
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
    name: 'PaginaContato',
    data: () => ({
        valid: true,
        name: '',
        nameRules: [
            v => !!v || 'Nome é obrigatório',
            v => (v && v.length <= 10) || 'O nome deve ter almenos 10 caracteres',
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
        'Dúvidas',
        'Sugestões',
        'Denúncias',
        'Correções',
        ],
        conteudo:'',
        checkbox: false,
        lazy: false,
        href:''
    }),
    methods: {
        // validate () {
        //     const vm = this;
        //     this.$refs.form.validate();
        //     vm.href="mailto:analytics.aquiaolado@gmail.com?," + email + "&subject= "+select+" &body= "+conteudo;
        //     window.location.href;
        // },
        enviarEmail(href){
            try {
                this.$gtag.event('enviarEmail', {
                    'event_category': 'contato',
                    'event_label': 'contato',
                    'value': href
                });
            } catch (e) {
            }
            location.href = href
            // return window.location.href;
         }

    },
    created() {
    },
    computed: {
    }
  }
</script>