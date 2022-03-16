<template>
  <div
    class="login container is-justify-content-flex-end"
    v-if="state.notlogin"
  >
    <div class="box">
      <form @submit.prevent="login">
        <div class="field">
          <div class="label">秘密の合言葉をいれてね</div>
          <input
            type="text"
            placeholder="秘密の合言葉をいれてね"
            v-model="aikotoba"
            required
          />
          <button type="submit" class="button is-link is-light">
            Go (^^)/
          </button>
        </div>
      </form>
    </div>
  </div>
  <div v-else>
    <div class="container">
      <h1 class="nav-title is-justify-content-flex-end">
        30秒で消えちゃう掲示板
      </h1>

      <div class="messages is-justify-content-flex-end">
        <transition-group name="switch">
        <div v-for="message in messages" :key="message.id">
          <div v-if="message.show" class="box">
            {{ message.username }} : {{ message.message }}
          </div>
        </div>
        </transition-group>
      </div>

      <div class="message-form is-justify-content-flex-end">
        <form @submit.prevent="sendMessage">
          <div class="field">
            <div class="label">名前をいれてね</div>
            <input
              type="text"
              placeholder="名前をいれてね"
              v-model="state.username"
              required
            />
            <div class="label">メッセージをいれてね</div>
            <input
              type="text"
              ref="messageBox"
              placeholder="メッセージを入力"
              v-model="state.message"
              required
            />

            <button type="submit" class="button is-link is-light">Go (^^)/</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, ref, Comment } from "vue";
import {ref as ref_firebase, onValue,push} from "firebase/database";
import db from "./db";

export default {
  setup() {
    const state = reactive({ username: "", notlogin: true, message: "" });
    const aikotoba = ref("");
    const messages = ref([]);

    const login = () => {
      console.log(process.env.VUE_APP_AIKOTOBA);
      if (aikotoba.value === process.env.VUE_APP_AIKOTOBA) {
        state.notlogin = false;
        console.log("loged IN");
      }
    };

    onMounted(() => {
      const messageRef = ref_firebase(db, 'messages')
      onValue(messageRef, (snapshot) => {
        const data = snapshot.val();
        let all_messages = [];
        Object.keys(data).forEach((val, key) => {
          data[val].id = val;
          data[val].show = true;

          data[val].showTime =
            1000 * 30 - (Date.now() - data[val].create_timestamp);
          if (data[val].create_timestamp >= Date.now() - 1000 * 30) {
            all_messages.push(data[val]);
          }
        });
        messages.value = all_messages;
        console.log(messages.value)

        for (let index = 0; index < messages.value.length; index++) {
          console.log(messages.value[index].showTime);
          setTimeout(() => {
            messages.value[index].show = false;
          }, messages.value[index].showTime);
        }
      });
    });

    const sendMessage = () => {
      const messageRef = ref_firebase(db, 'messages')
      push(messageRef,{
          username: state.username,
          message: state.message,
          create_timestamp: Date.now(),
        });
      state.message = "";
    };

    return { state, aikotoba, messages, login, sendMessage };
  },
};
</script>
<style lang="scss">
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css";
.message-form {
  position: fixed;
  bottom: 20px;
}
.messages{
  height:800px;
  overflow-y: scroll;

}
.nav-title {
  font-size: 120%;
  margin: 10px;
}

.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(40px)
}

.switch-enter-to,
.switth-leave-from {
  opacity: 1;
  transform: translateY(0)
}

.switch-enter-active{
  transition: all 0.3s ease-in-out;
}
.switch-leave-active {
  transition: all 1.5s ease-in-out;
}
</style>