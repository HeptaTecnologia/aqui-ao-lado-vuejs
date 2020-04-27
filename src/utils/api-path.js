let apiPath = process.env.VUE_APP_API_PATH;

let anuncio = '/anuncio';
let uf = '/localizacao/uf';
let ufPesquisa = '/localizacao/uf/pesquisa';
let localizacao = '/localizacao/';
let bairros = '/bairros';
let cidade = '/cidades';
let cidadePesquisa = '/cidades/pesquisa';
let anunciante = '/anunciante';
let atualizaImagem = '/atualizaImagem';

export default ({
    apiPath,
    anuncio,
    localizacao,
    uf,
    ufPesquisa,
    cidade,
    cidadePesquisa,
    bairros,
    anunciante,
    atualizaImagem,
})