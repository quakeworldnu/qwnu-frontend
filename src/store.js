import AuthService from '@/services/AuthService';
import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    auth_request(state) {
        state.status = 'loading';
    },
    auth_success(state, {token, user}) {
        state.status = 'success';
        state.token = token;
        state.user = user;
    },
    auth_error(state){
        state.status = 'error';
    },
    logout(state){
        state.status = '';
        state.token = '';
        state.user = '';
    },
  },
  actions: {
    login({commit}, credentials) {
        commit('auth_request');
        return AuthService.login(credentials.username, credentials.password)
            .then(response => {
                const token = response.data.token;
                const user = response.data.user;

                axios.defaults.headers.common['Authorization'] = token;
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('user', JSON.stringify(user));

                commit('auth_success', {token, user});
            }).catch(error => {
                commit('auth_error');
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            });
    },
    logout({commit}){
        commit('logout');
        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
});
