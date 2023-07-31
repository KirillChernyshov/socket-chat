<script setup lang="ts">
import { computed, onMounted, ref, toRefs } from 'vue';
import { VVirtualScroll } from 'vuetify/components/VVirtualScroll';
import useMessagesStore from '@/stores/useMessagesStore';

const messagesStore = useMessagesStore();
const { members } = toRefs(messagesStore);

const messagesElement = ref<VVirtualScroll>();

const message = ref('');

const messages = ref({});

const length = computed(() => Object.keys(messages.value).length);

function send() {
  if (!message.value) return;
  // socket.emit('message', message.value);
  message.value = '';
}

onMounted(() => {
  for (let i = 0; i < 100; i += 1) {
    Object.assign(messages.value, {
      [i]: {
        id: i,
        name: `User#${(Date.now() / 10_000_000).toString().split('.')[1]}`,
        message: 'Hello, World',
        color: `#${Math.round(Math.random() * 1000)}`,
        timestamp: Date.now(),
      },
    });
  }

  setTimeout(() => {
    if (messagesElement.value) {
      messagesElement.value?.$el.scroll(0, 9999999);
    }
  });
});
</script>

<template>
  <v-card
    width="800"
    title="Чат"
    :subtitle="'Участники: ' + Object.values(members).length.toString()"
    class="chat-card d-flex flex-column pa-3"
  >
    <v-list ref="messagesElement" class="flex-1-1">
      <v-list-item
        v-for="item in messages"
        :key="item.id"
        variant="tonal"
        class="message pa-1 mt-2"
      >
        <v-list-item-title class="text-sm-body-2" :style="{ color: item.color, 'text-shadow': 'rgba(255, 255, 255, 0.2) 0 0 1px' }">
          {{ item.name }} [{{ new Date(item.timestamp) }}]
        </v-list-item-title>
        <span>{{ item.message }}</span>
      </v-list-item>
    </v-list>
    <div> {{ length }}</div>
    <v-text-field
      v-model="message"
      placeholder="Введите сообщение"
      class="flex-0-0 mt-5"
      variant="outlined"
      base-color="deep-purple"
      @keydown.enter="send"
    />
  </v-card>
</template>

<style scoped>
.chat-card {
  height: 75vh;
}

.chat-card .message {
  width: fit-content;
  max-width: 80%;
}
</style>
