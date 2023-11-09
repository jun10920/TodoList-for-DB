<template>
  <div class="black-bg" v-if="모달창열렸니 === true">
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>상세페이지 내용임</p>
      <button @click="모달창열렸니 = false">닫기버튼임</button>
    </div>
  </div>

  <div class="menu">
    <a v-for="(a, i) in menus" :key="i">{{ a }}</a>
  </div>

  <div v-for="(room, i) in 원룸데이터" :key="i">
    <img :src="room.image" class="room-img" />
    <h4 @click="모달창열렸니 = true">{{ room.title }}</h4>
    <P>{{ room.price }}만원</P>
  </div>
</template>

<script>
import roomData from './assets/oneroom.js';

export default {
  name: 'App',
  data() {
    return {
      원룸데이터: roomData,
      모달창열렸니: false,
      역삼동신고수: 0,
      천호동신고수: 0,
      마포구신고수: 0,
      price1: 60,
      price2: 70,
      스타일: 'color: blue',
      menus: ['Home', 'Shop', 'About'],
      product: ['역삼동원룸', '천호동원룸', '마포구원룸'],
    };
  },
  methods: {
    increase(area) {
      if (area === '역삼동') {
        this.역삼동신고수 += 1;
      } else if (area === '천호동') {
        this.천호동신고수 += 1;
      } else if (area === '마포구') {
        this.마포구신고수 += 1;
      }
    },
  },
  components: {},
};
</script>

<style>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}
.room-img {
  width: 100%;
  margin-top: 40px;
}
</style>
