import { createStore } from 'vuex';
import { reactive } from 'vue';

const store = createStore({
  state: {
    // 모달 관련
    popState: false,

    // 페이지 상태 관련
    startPage_state: true,
    signUpPage_state: false,
    todoListPage_state: false,
    personalInfo_state: false,

    // tolist 상태 관련
    todoState: reactive({
      todoList: [],
      doingList: [],
      doneList: [],
      nickName: '',
    }),
  },

  getters: {
    getPopState: function (state) {
      return state.popState;
    },
  },

  mutations: {
    // 모달 관련
    popStateChange: function (state, value) {
      state.popState = value;
    },
    // 페이지 관련
    startPage_state_change: function (state, value) {
      state.startPage_state = value;
    },
    signUpPage_state_change: function (state, value) {
      state.signUpPage_state = value;
    },
    todoListPage_state_change: function (state, value) {
      state.todoListPage_state = value;
    },
    personalInfo_state_change: function (state, value) {
      state.personalInfo_state = value;
    },
  },
});

export default store;
