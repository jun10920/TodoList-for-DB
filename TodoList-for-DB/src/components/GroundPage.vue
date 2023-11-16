<template>
  <div class="groundPage">
    <!-- 시작화면_로그인화면 -->
    <startPage_login />
    <!-- 회원가입 화면 -->
    <signupPage />
    <!-- 메인화면_투두리스트 화면 -->
    <todoListPage />
    <!-- 회원정보 수정 페이지 -->
    <personalInfo />
  </div>
</template>
<script>
import startPage_login from './LoginPage.vue';
import signupPage from './SignupPage.vue';
import todoListPage from './TodolistPage.vue';
import personalInfo from './PersonalInfoPage.vue';

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
  components: { startPage_login, signupPage, todoListPage, personalInfo },
};
</script>
