import ConfirmButton from '@/components/ConfirmButton.vue';
import Modal from '@/components/Modal.vue';
import SortButton from '@/components/SortButton.vue';
import UserName from '@/components/UserName.vue';
import Vue from 'vue';
import Pagination from 'vue-pagination-2';

// Global components that will be accessible in other components with no other import required
Vue.component('pagination', Pagination);
Vue.component('confirm-button', ConfirmButton);
Vue.component('sort-button', SortButton);
Vue.component('modal', Modal);
Vue.component('user-name', UserName);
