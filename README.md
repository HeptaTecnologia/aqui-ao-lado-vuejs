# aqui-ao-lado

O "Aqui ao Lado" nasceu da seguinte ideia: "O que podemos fazer para ajudar as pessoas durante a crise do coronavírus?", criamos uma vitrine virtual para conectar produtores e consumidores de forma mais organizada e livre, no qual é possível anunciar e buscar anúncios cadastrados.

Esse projeto é o front-end em Vuejs que consome uma [API REST em quarkus](https://github.com/HeptaTecnologia/aqui-ao-lado-api-quarkus) no qual é possível realizar:

* Cadastro de anúncios com whatsapp e instagram
* Exibição dos anúncios em um lista que pode ser filtrada por palavra-chave, bairros ou categoria
* Exibição de detalhes de um anúncio
* Compartilhamento via whatsapp e telegram
* Entrar em contato com o anunciante via whatsapp e instagram
* Recaptcha da google para impedir a submissão do formulário por robôs ([vue-recaptcha-v3](https://github.com/AurityLab/vue-recaptcha-v3))
* Analytics da google para monitorar o uso das páginas ([vue-gtag](https://github.com/MatteoGabriele/vue-gtag))

## Instalação
```
npm install
```

### Compilação and hot-reloads para desenvolvimento
```
npm run serve
```

### Compilação and minificação para produção
```
npm run build
```

## Autores

## Licença
Este projeto está licenciado sob a licença GNU - consulte o arquivo [LICENSE.md](https://github.com/HeptaTecnologia/aqui-ao-lado-vuejs/blob/master/LICENSE) para obter detalhes

