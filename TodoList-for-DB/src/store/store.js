import { createStore } from 'vuex';

const store = createStore({
  state: {
    popState: false,
    startPage_state: true,
    signUpPage_state: false,
    todoListPage_state: false,
    personalInfo_state: false,
    modalData: null,
  },

  getters: {
    getPopState: function (state) {
      return state.popState;
    },
  },

  mutations: {
    // 페이지 관련
    popStateChange: function (state, value) {
      state.popState = value;
    },
    startPage_state_change: function (state, value) {
      state.startPage_state = value;
    },
    signUpPage_state_change: function (state, value) {
      state.signUpPage_state = value;
    },
    todoListPage_state_change: function (state, value) {
      state.todoListPage_state = value;
    },
    // 모달 관련
    setModalData(state, id) {
      state.modalData = id;
    },
  },
});

export default store;
