<template>
  <div id="todoListPage" v-if="this.$store.state.todoListPage_state === true">
    <h1>ToDoList</h1>
    <div id="totalBox">
      <div class="introText">
        {{ this.$store.state.todoState.nickName }}님의 투두리스트
        <div class="user-icon">
          <img src="../assets/member icon.png" alt="Member Icon" style="width:
          45px; height: 45px;" cursor: pointer @click="goInfo()" >
        </div>
      </div>
      <div class="controlBtnBox">
        <button class="add-todo-button" @click="openModal()">ADD</button>
        <!-- @click="addTodo()" -->
        <button class="reset-todo-button" @click="resetTodo()">RESET</button>
      </div>
      <div class="wrapperBox">
        <div class="sec_wrapper" id="todo_wrapper">
          <span class="wrapper-name">할 일</span>
          <div
            v-for="d in this.$store.state.todoState.todoList"
            :key="d.id"
            class="task-list"
          >
            <span class="todo-content" @click="edit(d.id)">{{
              d.content
            }}</span>
            <div>
              <span class="todo-rank">{{ d.rank }}순위</span>
              <button class="t_pass" @click="passTodo1(d.id)">→</button>
            </div>
          </div>
        </div>
        <div class="sec_wrapper" id="doing_wrapper">
          <span class="wrapper-name">하고 있는 일</span>
          <div
            v-for="d in this.$store.state.todoState.doingList"
            :key="d.id"
            class="task-list"
          >
            <span class="todo-content" @click="edit(d.id)">{{
              d.content
            }}</span>
            <div>
              <span class="todo-rank">{{ d.rank }}순위</span>
              <button class="t_pass" @click="passTodo2(d.id)">→</button>
            </div>
          </div>
        </div>
        <div class="sec_wrapper" id="done_wrapper">
          <span class="wrapper-name">한 일</span>
          <div
            v-for="d in this.$store.state.todoState.doneList"
            :key="d.id"
            class="task-list"
          >
            <span class="todo-content" @click="edit(d.id)">{{
              d.content
            }}</span>
            <div>
              <span class="todo-rank">{{ d.rank }}순위</span>
              <button class="t_del" @click="deleteTodo(d.id)">x</button>
            </div>
          </div>
        </div>
      </div>

      <!--모달-->
      <transition name="fade">
        <div class="modal" v-if="this.$store.getters.getPopState === true">
          <div class="modal-content">
            <h2 style="text-align: center; color: white">ADD TODO</h2>
            <div class="modal-btnBox">
              <p class="addText">어떤 일인가요?</p>
              <input
                type="text"
                name="title"
                placeholder="Java 공부하기 (24자까지)"
                maxlength="24"
                required
                v-model="state.addContent"
              /><br />
              <div class="rankBox">
                <p class="addText">우선순위를 선택하세요.</p>
                <div class="rank">
                  <div class="labelBox">
                    <label
                      ><input
                        type="radio"
                        name="rank"
                        value="1"
                        v-model="state.selectedRank"
                      />1순위</label
                    >
                    <label
                      ><input
                        type="radio"
                        name="rank"
                        value="2"
                        v-model="state.selectedRank"
                      />2순위</label
                    >
                    <label
                      ><input
                        type="radio"
                        name="rank"
                        value="3"
                        v-model="state.selectedRank"
                      />3순위</label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer-btnBox">
              <button @click="addTodo()">등록</button>
              <button @click="closeModal()">닫기</button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';
import store from '../store/store';
// import { ContextExclusionPlugin } from 'webpack';
export default {
  setup() {
    const state = reactive({
      // todoList: [],
      // doingList: [],
      // doneList: [],
      addContent: '',
      selectedRank: '',
      // nickName: '',
    });
    // // 닉네임 데이터 불러오기
    // axios.get('/api/todos/nickName').then((res) => {
    //   if (res.data.message === '로그인정보 있음') {
    //     store.state.todoState.nickName = res.data.row[0].nickname;
    //     // todolistpage로 이동
    //     store.commit('startPage_state_change', false);
    //     store.commit('todoListPage_state_change', true);
    //   } else if (res.data.message === '로그인정보 없음') {
    //     store.commit('startPage_state_change', true);
    //     store.commit('todoListPage_state_change', false);
    //   }
    // });
    // 실행 시 db 데이터 들고오기
    axios.get('/api/todos').then((res) => {
      if (res.data.message === '로그인정보 있음') {
        store.state.todoState.todoList = res.data.todos.todoList;
        store.state.todoState.doingList = res.data.todos.doingList;
        store.state.todoState.doneList = res.data.todos.doneList;
        store.state.todoState.nickName = res.data.row[0].nickname;
        // todolistpage로 이동
        store.commit('startPage_state_change', false);
        store.commit('todoListPage_state_change', true);
      } else if (res.data.message === '로그인정보 없음') {
        store.commit('startPage_state_change', true);
        store.commit('todoListPage_state_change', false);
      }
    });

    // todo 추가
    const addTodo = () => {
      let content = state.addContent;
      let rank = state.selectedRank;
      if (!content) {
        alert('내용을 입력해주세요.');
        return;
      }
      axios.post('/api/todos/addTodo', { content, rank }).then((res) => {
        store.state.todoState.todoList = res.data.todoList;
        store.state.todoState.doingList = res.data.doingList;
        store.state.todoState.doneList = res.data.doneList;
      });
    };

    // todo status (1 > 2)변경
    const passTodo1 = (id) => {
      axios
        .get('/api/todos/passTodo1/' + id)
        .then((res) => {
          store.state.todoState.todoList = res.data.todoList;
          store.state.todoState.doingList = res.data.doingList;
          store.state.todoState.doneList = res.data.doneList;
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    };

    // todo status (2 > 3)변경
    const passTodo2 = (id) => {
      axios
        .get('/api/todos/passTodo2/' + id)
        .then((res) => {
          store.state.todoState.todoList = res.data.todoList;
          store.state.todoState.doingList = res.data.doingList;
          store.state.todoState.doneList = res.data.doneList;
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    };

    // todo 삭제
    const deleteTodo = (id) => {
      axios
        .get('/api/todos/delete/' + id)
        .then((res) => {
          store.state.todoState.todoList = res.data.todoList;
          store.state.todoState.doingList = res.data.doingList;
          store.state.todoState.doneList = res.data.doneList;
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    };

    // todo 수정
    const edit = (id) => {
      const content = prompt('내용을 입력해주세요');
      if (!content) {
        alert('내용을 입력해주세요.');
        return edit(id);
      }
      axios
        .put('/api/todos/edit/' + id, { content })
        .then((res) => {
          store.state.todoState.todoList = res.data.todoList;
          store.state.todoState.doingList = res.data.doingList;
          store.state.todoState.doneList = res.data.doneList;
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    };

    // todo 리셋
    const resetTodo = () => {
      axios
        .get('/api/todos/reset/')
        .then((res) => {
          store.state.todoState.todoList = res.data.todoList;
          store.state.todoState.doingList = res.data.doingList;
          store.state.todoState.doneList = res.data.doneList;
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });
    };

    return {
      state,
      addTodo,
      edit,
      passTodo1,
      passTodo2,
      deleteTodo,
      resetTodo,
    };
  },
  methods: {
    goInfo() {
      store.commit('personalInfo_state_change', true);
      store.commit('todoListPage_state_change', false);
    },
    openModal(id) {
      store.commit('popStateChange', true);
      store.commit('setModalData', id);
    },
    closeModal() {
      store.commit('popStateChange', false);
    },
  },
  components: {},
};
</script>

<style scoped>
#totalBox {
  width: 900px;
  border: none;
}
</style>
<style>
#todoListPage {
  position: relative;
  z-index: 1;
  width: 900px;
  height: 1200px;
  margin: 0 auto;
  border: 1px solid #ccc;
  background-color: #fff;
}
.introText {
  /* @import url(//fonts.googleapis.com/earlyaccess/jejugothic.css); */
  font-family: 'Jeju Gothic', sans-serif;
  font-size: 2.5em;
  text-align: center;
  color: black;
  z-index: 1;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 0.5px solid rgb(173, 173, 173);
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.user-icon {
  position: absolute;
  right: 40px;
  font-size: 10px; /* 아이콘 크기를 조절 */
  color: #555;
  cursor: pointer;
}
.controlBtnBox {
  justify-content: space-around;
  display: flex;
  position: relative;
  padding: 10px;
  margin-top: 10px;
  height: 55px;
  align-items: center;
}
.controlBtnBox label {
  margin: 0;
  padding-right: 25px;
}

/* "ADD" 버튼 스타일 */
.add-todo-button,
.reset-todo-button {
  box-shadow: 1px 1px 3px 1px grey;
  background-color: #333;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  width: 80px;
  height: auto;
  padding: 7px;
  margin-left: 7px;
  justify-content: center;
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
/* todo 박스 관련 */
.wrapperBox {
  margin-top: 15px;
  width: auto;
  height: auto;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
}
.sec_wrapper {
  width: 260px;
  height: 45px;
}
.wrapper-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  background-color: #333;
  color: white;
  border-radius: 10px;
  box-shadow: 1px 1px 3px 1px grey;
}
.task-list {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  border-radius: 7px;
  box-shadow: 1px 1px 3px 1px grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.todo-content {
  font-weight: bold;
}
.todo-rank {
  font-weight: 10;
  font-size: 12px;
}
.task-list div {
  display: flex;
  align-items: center;
}
.t_pass {
  cursor: pointer;
  width: auto;
  color: #808080;
  font-size: 10px;
  background-color: #fff;
  font-weight: 500;
  padding: 10px;
}

.t_del {
  cursor: pointer;
  width: auto;
  font-size: 20px;
  background-color: #fff;
  color: #a33937;
  font-weight: 700;
  padding: 5px;
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
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: auto;
  height: auto;
}
.modal .modal-content {
  display: flex;
  flex-direction: column;
  background-color: #333;
  font-size: 22px;
  font-weight: 600;
  text-align: left;
  width: 400px;
  height: auto;
  box-shadow: 2px 3px rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  padding: 1.5rem 1.5rem;
  border-radius: 10px;
}
.modal-content h2 {
  border-bottom: 1px solid white;
}
.modal-conten p {
  font-size: 5px;
}
.modal-btnBox {
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: space-between;
  width: 350px;
}
.modal-btnBox input {
  width: 350px;
}
.rank {
  display: flex;
  flex-direction: column;
}
.labelBox {
  display: flex;
  flex-direction: row;
}
.labelBox input {
  width: 20px;
}
.labelBox label {
  display: flex;
  flex-direction: row;
  font-size: 15px;
}
.modal-footer-btnBox {
  width: 350px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
/* 모달 창에 애니메이션 적용 */
.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
