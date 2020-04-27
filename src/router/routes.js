import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home';
import AnuncioNovo from '@/views/AnuncioNovo';
import AnuncioDetalhe from '@/views/AnuncioDetalhe';
import Contato from '@/views/Contato';
import PaginaNaoEncontrada from '@/views/PaginaNaoEncontrada';
import SobreAquiaoLado from '@/views/SobreAquiaoLado';
import EmailForm from '@/components/EmailForm';
import ImagemForm from "@/components/ImagemForm";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/anuncio-novo',
    name: 'AnuncioNovo',
    component: AnuncioNovo
  },
  {
    path: '/anuncio-detalhe/:id',
    name: 'AnuncioDetalhe',
    component: AnuncioDetalhe
  },
  {
    path:'/anuncio-cadastrado/:id_anuncio',
    name:'EmailForm',
    component: EmailForm
  },
  {
    path: '/contato',
    name: 'Contato',
    component: Contato
  },
  {
    path: '/404',
    name: 'PaginaNaoEncontrada',
    component: PaginaNaoEncontrada
  },
  {
    path: '/sobre-aqui-ao-lado',
    name: 'SobreAquiaoLado',
    component: SobreAquiaoLado
  },
  {
    path: '/atualizaImagem',
    name: 'AtualizaImagem',
    component: ImagemForm
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
