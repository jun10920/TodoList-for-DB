<template>
  <div>
    <!-- 시작화면_로그인화면 -->
    <StartPagelogin />
    <!-- 회원가입 화면 -->
    <SignupPage />
    <!-- 메인화면_투두리스트 화면 -->
    <TodoListPage />
    <!-- 회원정보 수정 페이지 -->
    <PersonalInfo />
  </div>
</template>
<script>
import StartPagelogin from './LoginPage.vue';
import SignupPage from './SignupPage.vue';
import TodoListPage from './TodolistPage.vue';
import PersonalInfo from './PersonalInfoPage.vue';

export default {
  components: { StartPagelogin, SignupPage, TodoListPage, PersonalInfo },
};
</script>
