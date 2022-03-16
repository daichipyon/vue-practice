<template>
  <div class='app'>
    <chat-item/>
  </div>
</template>

<script>
import ChatItem from './ChatItem.vue'

export default {
  name: 'App',
  components: {
    ChatItem
  }
}
</script>