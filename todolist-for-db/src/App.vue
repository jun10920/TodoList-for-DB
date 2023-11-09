<template>
  <!-- 시작화면_로그인화면 -->
  <div id="startPage_login" v-if="startPage_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox">
      <h2><img src="./assets/logo2.png" alt="로고 이미지" /></h2>
      <label for="username">아이디</label>
      <input type="text" id="username" placeholder="아이디를 입력하세요" />
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호를 입력하세요"
      />
      <div class="button-box">
        <button id="login-button">로그인</button>
        <div class="lower-buttonBox">
          <button class="signup-button">회원가입</button>
          <button class="modify-button">회원정보 수정</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 회원가입 화면 -->
  <div id="startPage_login" v-if="signUpPage_state === true">
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
      <button id="signup-button">회원가입</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      startPage_state: true,
      signUpPage_state: false,
    };
  },
  methods: {},
  components: {},
};
</script>

<style>
/* 공통 */
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
}
#totalBox {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
}
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
.signup-button,
.modify-button {
  width: 48%;
}
/* 회원가입 페이지 */
.signUpPage_box {
  height: 425px;
}
#signup-button {
  margin-top: 20px;
  padding: 20px;
}
</style>
