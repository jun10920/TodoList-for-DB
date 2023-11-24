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
      <div class="controlBtnBox">
        <button class="add-todo-button" @click="openModal()">ADD</button>
        <!-- @click="addTodo()" -->
        <button class="reset-todo-button">RESET</button>
      </div>
      <div v-for="d in state.todoData" :key="d.id" class="task-list">
        <span class="check-box">&#10003;</span>
        <span>{{ d.content }}</span>
        <span class="expand-button" @click="openModal(d.id)">...</span>
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
                        checked="checked"
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
                        v-model="selectedRank"
                      />3순위</label
                    >
                  </div>
                </div>
              </div>

              <!-- <button
                class="modifyBtn"
                @click="edit(this.$store.state.modalData)"
              >
                수정
              </button>
              <button
                class="deleteBtn"
                @click="deleteTodo(this.$store.state.modalData)"
              >
                삭제
              </button> -->
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
// import { ContextExclusionPlugin } from 'webpack';
export default {
  setup() {
    const state = reactive({
      todoData: [],
      addContent: '',
      selectedRank: '',
    });
    // 실행 시 db 데이터 들고오기
    // axios.get('/api/todos').then((res) => {
    //   state.todoData = res.data;
    // });
    // todo 추가
    const addTodo = () => {
      const content = state.addContent;
      if (!content) {
        alert('내용을 입력해주세요.');
        return addTodo();
      }
      axios.post('/api/todos', { content }).then((res) => {
        state.todoData = res.data;
      });
    };
    // todo 수정
    const edit = (modalData) => {
      const content = prompt(
        '내용을 입력해주세요',
        state.todoData.find((d) => d.id === modalData).content
      );
      if (!content) {
        alert('내용을 입력해주세요.');
        return edit(modalData);
      }
      axios
        .put('/api/todos/' + modalData, { content })
        .then((res) => {
          state.todoData = res.data;
          // 상태를 업데이트한 후에 필요한 작업을 수행합니다.
        })
        .catch((error) => {
          console.error('There was an error!', error);
          // 오류가 발생했을 때 필요한 작업을 수행합니다.
        });
    };
    // todo 삭제
    const deleteTodo = (modalData) => {
      axios
        .get('/api/todos/delete/' + modalData)
        .then((res) => {
          state.todoData = res.data;
          // 상태를 업데이트한 후에 필요한 작업을 수행합니다.
        })
        .catch((error) => {
          console.error('There was an error!', error);
          // 오류가 발생했을 때 필요한 작업을 수행합니다.
        });
    };
    return {
      state,
      addTodo,
      edit,
      deleteTodo,
    };
  },
  methods: {
    openModal(id) {
      this.$store.commit('popStateChange', true);
      this.$store.commit('setModalData', id);
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
.controlBtnBox,
.task-list {
  justify-content: space-around;
  display: flex;
  position: relative;
  padding: 10px;
  margin-top: 10px;
  height: 55px;
}
.controlBtnBox {
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
.controlBtnBox label {
  margin: 0;
  padding-right: 25px;
}

/* "+" 버튼 스타일 */

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
