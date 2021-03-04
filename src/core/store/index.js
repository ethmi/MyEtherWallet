import Vue from 'vue';
import Vuex from 'vuex';
import globalModule from './global';
import wallet from './wallet';
import notifications from './notifications';
import externalData from './external';
import Configs from './configs';
import LocalStore from 'store';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    global: globalModule,
    wallet: wallet,
    external: externalData,
    notifications: notifications
  }
});

store.subscribe((mutation, state) => {
  const modules = Object.keys(state);
  modules.forEach(m => {
    if (mutation.type.startsWith(m) && state[m].localStore) {
      LocalStore.set(Configs.LOCAL_STORAGE_KEYS[m], state[m]);
    }
  });
});
export default store;
