<template>
  <div id="startPage_login" v-if="this.$store.state.startPage_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox">
      <h2><img src="../assets/logo2.png" alt="로고 이미지" /></h2>
      <label for="username">아이디</label>
      <input
        type="text"
        id="username"
        name=""
        placeholder="아이디를 입력하세요"
        maxlength="20"
        required
      />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        name=""
        placeholder="비밀번호를 입력하세요"
        maxlength="20"
        required
      />
      <div class="button-box">
        <button type="submit" value="로그인" id="login-button">로그인</button>
        <div class="lower-buttonBox">
          <button
            type="submit"
            value="회원가입"
            class="signup-button"
            @click="openSignupPage()"
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import { reactive } from 'vue';
export default {
  setup() {
    // const state = reactive({});
    return {};
  },
  methods: {
    openSignupPage() {
      this.$store.commit('signUpPage_state_change', true);
      this.$store.commit('startPage_state_change', false);
    },
  },
  components: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* 시작화면 페이지 */
h1 {
  background-color: #333;
  color: #fff;
  padding: 20px;
  margin: 0;
}
h2 {
  margin: 0;
}
img {
  width: auto;
  height: 90px;
}

label {
  display: block;
  text-align: left;
  margin-top: 10px;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
button {
  width: 100%;
  padding: 15px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 3px;
}
button:hover {
  background-color: #555;
}
.button-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
#login-button {
  margin-bottom: 20px;
  margin-top: 15px;
}
.lower-buttonBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.signup-button {
  width: 100%;
}
</style>
