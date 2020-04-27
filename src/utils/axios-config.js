// First we need to import axios.js
import Vue from "vue";
import axios from 'axios'
import md5 from 'md5'
import urls from "../utils/api-path";
// Next we make an 'instance' of it
const api = axios.create({
    baseURL: urls.apiPath,
    withCredentials: false,
});

// Where you would set stuff like your 'Authorization' header, etc ...
api.defaults.headers.common['TOKENAPIKEY'] = md5('463152a2253cab4b17ae472375c3f60e');
api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

Vue.use({
    install(Vue) {
        Vue.prototype.$api = api;
    }
});

export default api;
