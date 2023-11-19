import { createStore } from 'vuex';

const store = createStore({
  state: {
    popState: false,
  },

  getters: {
    getPopState: function (state) {
      return state.popState;
    },
  },

  mutations: {
    popStateChange: function (state, value) {
      state.popState = value;
    },
    setModalData(state, idx) {
      state.modalData = idx;
    },
  },
});

export default store;
