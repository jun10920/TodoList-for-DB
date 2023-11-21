import { createStore } from 'vuex';

const store = createStore({
  state: {
    popState: false,
    modalData: null,
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
    setModalData(state, id) {
      state.modalData = id;
    },
  },
});

export default store;
