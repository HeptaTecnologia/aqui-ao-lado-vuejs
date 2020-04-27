<template>
  <div>
  <v-container class="fill-height" id="sobreAquiaoLado">
      <v-row justify="center">
    <v-col cols="12">


<template>
  <v-card
    class="mx-auto"
    max-width="100%"
    flat

  >
    <v-card-text>
      <div> Porque o Aqui Ao Lado?</div>
      <p class="display-1 text--primary">
         MANIFESTO AQUI AO LADO
      </p>
      <div class="text--primary">
        <p>Nós fazemos parte da equipe de Desenvolvimento de Soluções de Software de uma empresa de TI em Brasília. O "Aqui ao Lado" nasceu da seguinte ideia: "O que podemos fazer para ajudar as pessoas durante a crise do Corona Virus?"</p>
        <p>Estamos vendo os pequenos produtores locais fechando suas portas e ao mesmo tempo há pessoas procurando produtos e serviços que se adequem à situação de isolamento social que passamos - fornecedores com delivery, com "drive-thru", ou perto de casa e sem a quantidade de gente em um supermercado ou feira, etc.</p>
        <p>A motivação do Aqui Ao Lado é exatamente conectar estes dois grupos durante este período excepcional que estamos vivendo. Se o nosso trabalho ajudar pelo menos um pequeno produtor a vender seus produtos, e ajudar pelo menos uma família a suprir uma necessidade sua sem aumentar o risco de exposiçã à COVID-19, nós consideraremos que nosso objetivo foi atingido. </p>
        <p>Não é nossa meta lucrar com este aplicativo - não há anúncios e você consegue usá-lo sem fornecer dados pessoais. Se achar que ele pode ser de ajuda para alguém que você conhece, há duas formas que você pode contribuir com este esforço:</p>
        <p>- Cadastre a lista de fornecedores a quem você está recorrendo durante a pandemia. Uma coisa que você precisa, outra pessoa também pode estar precisando.</p>
        <p>- Repasse este link: http://www.aquiaolado.com.br para quem poderá também procurar algo na sua localidade!</p>

        <p>Obrigado, </p>

        <p>Equipe Aqui Ao Lado </p>
      </div>
    </v-card-text>
  </v-card>
</template>
      
    </v-col>
  </v-row>
  </v-container>
  <v-container style="background:#deecf9">
    <v-row class=" mt-2" justify="center">
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
                    <v-btn  block small color="primary"@click="enviarEmail('mailto:analytics.aquiaolado@gmail.com?subject=Dúvida &body=Dúvidas sobre algum produto ou serviço?')" >Escrever</v-btn>
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
                    <v-btn  block small color="primary"@click="enviarEmail('mailto:analytics.aquiaolado@gmail.com?subject=Denúncia &body=Encontrou algo que queira denúnciar? Envie o título da oferta para cuidarmos disso.')">Escrever</v-btn>
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
                    <v-btn  block small color="primary"@click="enviarEmail('mailto:analytics.aquiaolado@gmail.com?subject=Correção &body=Encontrou algum dado errado? Avise-nos para corrigirmos.')">Escrever</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
  </div>
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
    name: 'PaginaNaoEncontrada',
  }
</script>