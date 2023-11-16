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
        <span class="expand-button">...</span>
      </div>
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
      addTodo,
    };
  },
  methods: {},
  components: {},
};
</script>

<style>
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
</style>
