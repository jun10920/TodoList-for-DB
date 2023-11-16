<template>
  <div id="signupPage" v-if="signUpPage_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox" class="signUpPage_box">
      <h2>가입하기</h2>
      <label for="username">아이디</label>
      <input type="text" id="username" placeholder="아이디를 입력하세요" />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호를 입력하세요"
      />
      <label for="nickname">닉네임</label>
      <input type="text" id="nickname" placeholder="닉네임을 입력하세요" />
      <button
        @click="(signUpPage_state = false), (startPage_state = true)"
        id="signup-button"
      >
        회원가입
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startPage_state: true,
      signUpPage_state: false,
      todoListPage_state: false,
      personalInfo_state: false,
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
