<template>
  <div id="signupPage" v-if="this.$store.state.signUpPage_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox" class="signUpPage_box">
      <h2>가입하기</h2>
      <label for="username">아이디</label>
      <input
        type="text"
        id="userid"
        placeholder="아이디를 입력하세요"
        v-model="state.userid"
      />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호를 입력하세요"
        v-model="state.userpw"
      />
      <label for="nickname">닉네임</label>
      <input
        type="text"
        id="nickname"
        placeholder="닉네임을 입력하세요"
        v-model="state.nickname"
      />
      <button id="signup-button" @click="signup()">회원가입</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import store from '../store/store';
export default {
  setup() {
    const state = reactive({
      userid: '',
      userpw: '',
      nickname: '',
    });

    // 회원가입
    const signup = () => {
      const userid = state.userid;
      const userpw = state.userpw;
      const nickname = state.nickname;

      if (!userid) {
        alert('ID를 입력해주세요.');
        return;
      }
      if (!userpw) {
        alert('비밀번호를 입력해주세요.');
        return;
      }
      if (!nickname) {
        alert('닉네임을 입력해주세요.');
        return;
      }
      axios
        .post('/api/todos/register', { userid, userpw, nickname })
        .then((res) => {
          if (
            res.data.message === '비밀번호를 4자 이상 입력하세요.' ||
            res.data.message === '아이디를 4자 이상 입력하세요.' ||
            res.data.message === '이름을 2자 이상 입력하세요.'
          ) {
            alert(res.data.message);
          } else if (res.data.message === '중복된 아이디입니다.') {
            alert(res.data.message);
          } else {
            alert(res.data.message);
            store.commit('signUpPage_state_change', false);
            store.commit('startPage_state_change', true);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    return {
      state,
      signup,
    };
  },
  methods: {},
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 회원가입 페이지 */
.signUpPage_box {
  height: 425px;
}
#signup-button {
  margin-top: 20px;
  padding: 20px;
}
</style>
