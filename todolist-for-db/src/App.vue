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
        <button
          @click="(todoListPage_state = true), (startPage_state = false)"
          id="login-button"
        >
          로그인
        </button>
        <div class="lower-buttonBox">
          <button
            @click="(signUpPage_state = true), (startPage_state = false)"
            class="signup-button"
          >
            회원가입
          </button>
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
      <button
        @click="(signUpPage_state = false), (startPage_state = true)"
        id="signup-button"
      >
        회원가입
      </button>
    </div>
  </div>

  <!-- 메인화면_투두리스트 화면 -->
  <div id="todoListPage" v-if="todoListPage_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox">
      <div class="user-icon">
        <img src="../src/assets/member icon.png" alt="Member Icon" style="width:
        45px; height: 45px;" cursor: pointer @click="(todoListPage_state =
        false), (personalInfo_state = true)" >
        <!-- 이미지 크기 조절 -->
      </div>
      <div class="category">
        <label for="category">카테고리:</label>
        <input
          class="inputCategory"
          type="text"
          id="inputCategory"
          placeholder="카테고리를 입력하세요"
        />
        <button class="remove-category-button">-</button>
        <button class="add-category-button">+</button>
      </div>
      <div class="task-list">
        <span class="check-box">&#10003;</span>
        <input
          type="text"
          class="task-input"
          placeholder="할 일을 입력하세요"
        />
        <span class="expand-button">...</span>
      </div>
    </div>
  </div>
  <!-- 회원정보 수정 페이지 -->
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
  name: 'App',
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
.signup-button {
  width: 100%;
}
/* 회원가입 페이지 */
.signUpPage_box {
  height: 425px;
}
#signup-button {
  margin-top: 20px;
  padding: 20px;
}
/* 투두리스트 페이지 */
/* 카테고리 */
.user-icon {
  font-size: 10px; /* 아이콘 크기를 조절 */
  color: #555;
  cursor: pointer;
}
.category,
.task-list {
  display: flex;
  position: relative;
  justify-content: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  height: 55px;
}
.category {
  align-items: center;
}
.category label {
  margin: 0;
  padding-right: 25px;
}
.inputCategory {
  width: 280px;
  margin: 0;
}

/* "+" 버튼 스타일 */
.add-category-button,
.remove-category-button {
  background-color: white;
  font-size: 25px;
  color: black;
  cursor: pointer;
  width: 5px;
  height: auto;
  padding: 9px;
  margin-left: 7px;
}

/* "-" 버튼 스타일 */
.remove-category-button {
  color: #f00;
  margin-right: 2px;
}

/* 체크 표시 칸 스타일 */
.check-box {
  cursor: pointer;
  font-size: 20px;
  color: #555;
  margin-right: 20px;
}

/* "..." 버튼 스타일 */
.expand-button {
  margin-left: 5px;
  cursor: pointer;
  font-size: 20px;
  color: #555;
}

/* 할일 입력란 스타일 */
.task-input {
  margin: 0;
  width: 80%;
  margin-right: 10px;
}

/* 회원정보 수정 페이지 */
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
