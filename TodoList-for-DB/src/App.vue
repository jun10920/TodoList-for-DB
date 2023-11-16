<template>
  <groundPage />
</template>

<script>
import groundPage from './components/GroundPage.vue';
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
  components: {
    groundPage,
  },
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

/* 투두리스트 페이지 */
/* 카테고리 */

/* 회원정보 수정 페이지 */
</style>
