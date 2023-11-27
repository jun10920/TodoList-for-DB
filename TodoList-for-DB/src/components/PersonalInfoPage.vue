<template>
  <div id="personalInfo" v-if="this.$store.state.personalInfo_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox">
      <h2>회원정보 수정</h2>
      <label for="new-password">비밀번호 변경</label>
      <input
        type="password"
        id="new-password"
        placeholder="새로운 비밀번호를 입력하세요"
        v-model="state.chagnePw"
      />
      <label for="new-nickname">닉네임 변경</label>
      <input
        type="text"
        id="new-nickname"
        placeholder="새로운 닉네임을 입력하세요"
        v-model="state.chagneNickname"
      />
      <div class="button-container">
        <div class="upper-btnBox">
          <button @click="goTodo()">뒤로가기</button>
          <button @click="changeInfo()">수정하기</button>
        </div>
        <div class="lower-btnBox">
          <button @click="logout()">로그아웃</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/store';
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      chagnePw: '',
      chagneNickname: '',
    });
    // 수정하기
    const changeInfo = () => {
      let chagnePw = state.chagnePw;
      let chagneNickname = state.chagneNickname;
      axios
        .put('/api/todos/change/', { chagnePw, chagneNickname })
        .then((res) => {
          alert(res.data.message);
        });
      state.chagnePw = '';
      state.chagneNickname = '';
    };
    // 로그아웃
    const logout = () => {
      axios.get('/api/todos/logout').then((res) => {
        alert(res.data.message);
      });
      store.commit('personalInfo_state_change', false);
      store.commit('startPage_state_change', true);
    };

    return { state, changeInfo, logout };
  },
  methods: {
    goTodo() {
      store.commit('personalInfo_state_change', false);
      store.commit('todoListPage_state_change', true);
    },
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.button-container {
  display: flex;
  flex-direction: column;
}
.button-container button {
  margin-top: 20px;
  width: 180px;
  height: 70px;
  font-size: 25px;
}
.upper-btnBox {
  display: flex;
  justify-content: space-evenly;
}
.lower-btnBox {
  display: flex;
  justify-content: center;
}
.lower-btnBox button {
  margin-top: 10px;
  width: 86%;
}
</style>
