<template>
  <div id="todoListPage" v-if="todoListPage_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox">
      <div class="user-icon">
        <img src="../assets/member icon.png" alt="Member Icon" style="width:
        45px; height: 45px;" cursor: pointer @click="(todoListPage_state =
        false), (personalInfo_state = true)" >
        <!-- 이미지 크기 조절 -->
      </div>
      <div class="todoInput">
        <input type="text" id="todoInput" placeholder="todo를 입력하세요" />
        <button class="remove-todo-button">-</button>
        <button class="add-todo-button" @click="addTodo()">+</button>
      </div>
      <div v-for="(d, idx) in state.todoData" :key="idx" class="task-list">
        <span class="check-box">&#10003;</span>
        <span>{{ d }}</span>
        <span class="expand-button" @click="openModal()">...</span>
      </div>
      <transition name="fade">
        <div class="modal" v-if="this.$store.getters.getPopState === true">
          <div class="modal-content">
            <div class="modal-btnBox">
              <button class="modifyBtn">수정</button>
              <button class="deleteBtn">삭제</button>
            </div>
            <button class="closeBtn" @click="closeModal()">닫기</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      todoData: [],
    });
    const addTodo = () => {
      const content = prompt('내용을 입력해주세요.');
      axios.post('/api/memos', { content }).then((res) => {
        state.todoData = res.data;
      });
    };
    axios.get('/api/memos').then((res) => {
      state.todoData = res.data;
    });
    return {
      state,
      startPage_state: true,
      signUpPage_state: false,
      todoListPage_state: true,
      personalInfo_state: false,
      modalPage_state: false,
      addTodo,
    };
  },
  methods: {
    openModal() {
      this.$store.commit('popStateChange', true);
    },
    closeModal() {
      this.$store.commit('popStateChange', false);
    },
  },
  components: {},
};
</script>

<style>
#todoListPage {
  position: relative;
  z-index: 1;
}
.user-icon {
  font-size: 10px; /* 아이콘 크기를 조절 */
  color: #555;
  cursor: pointer;
}
.todoInput,
.task-list {
  display: flex;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  height: 55px;
}
.todoInput {
  align-items: center;
}
.task-list {
  justify-content: center;
}
.task-list :nth-child(2) {
  margin-right: 40px;
  margin-left: 40px;
  display: flex;
  align-items: center;
}
.todoInput label {
  margin: 0;
  padding-right: 25px;
}
#todoInput {
  width: 85%;
  margin: 0;
  margin-right: 5px;
  text-align: center;
}

/* "+" 버튼 스타일 */
.add-todo-button,
.remove-todo-button {
  background-color: white;
  font-size: 25px;
  color: black;
  cursor: pointer;
  width: 5px;
  height: auto;
  padding: 9px;
  margin-left: 7px;
  justify-content: center;
}

/* "-" 버튼 스타일 */
.remove-todo-button {
  color: #f00;
  margin-right: 2px;
}

/* 체크 표시 칸 스타일 */
.check-box {
  position: absolute;
  left: 15px;
  cursor: pointer;
  font-size: 20px;
  color: #555;
}

/* "..." 버튼 스타일 */
.expand-button {
  position: absolute;
  right: 15px;
  cursor: pointer;
  font-size: 20px;
  color: #555;
}
/* 모달창 관련  */

/* 모달 창이 나타나는 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.modal {
  animation-name: fadeIn;
  animation-duration: 0.7s;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal .modal-content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.modal-content div {
  width: 250px;
}
.modal-btnBox {
  display: flex;
  flex-direction: row;
  color: white;
  justify-content: space-between;
}
.modal-btnBox button {
  width: 123px;
}
/* 모달 창에 애니메이션 적용 */
.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
