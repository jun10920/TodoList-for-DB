<template>
  <div id="personalInfo" v-if="personalInfo_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox">
      <h2>회원정보 수정</h2>
      <label for="new-username">아이디 변경</label>
      <input
        type="text"
        id="new-username"
        placeholder="새로운 아이디를 입력하세요"
      />
      <label for="new-password">비밀번호 변경</label>
      <input
        type="password"
        id="new-password"
        placeholder="새로운 비밀번호를 입력하세요"
      />
      <label for="new-nickname">닉네임 변경</label>
      <input
        type="text"
        id="new-nickname"
        placeholder="새로운 닉네임을 입력하세요"
      />

      <div class="button-container">
        <button
          @click="(personalInfo_state = false), (todoListPage_state = true)"
        >
          뒤로가기
        </button>
        <button @click="(personalInfo_state = false), (startPage_state = true)">
          로그아웃
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      startPage_state: false,
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
.button-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.button-container button {
  margin-top: 10px;
  width: 220px;
  height: 70px;
  font-size: 25px;
}
</style>
