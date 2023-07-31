<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue';
import { VVirtualScroll } from 'vuetify/components/VVirtualScroll';
import useMessagesStore from '@/stores/useMessagesStore';

const messagesStore = useMessagesStore();
const { members, messages } = toRefs(messagesStore);

const messagesElement = ref<VVirtualScroll>();

const message = ref('');

function send() {
  if (!message.value) return;
  messagesStore.sendMessage({
    text: message.value,
    timestamp: Date.now(),
  });
  message.value = '';
}

function getUser(id: string) {
  return members.value[id];
}

onMounted(() => {
  setTimeout(() => {
    if (messagesElement.value) {
      messagesElement.value?.$el.scroll(0, 9999999);
    }
  });
});

const TimeFormatter = new Intl.DateTimeFormat('ru', {
  hour: '2-digit',
  minute: '2-digit',
});

const DateFormatter = new Intl.DateTimeFormat('ru', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

function timeFormat(date: number) {
  const timestamp = new Date(date);
  return `${TimeFormatter.format(timestamp)} (${DateFormatter.format(
      timestamp,
  )})`;
}
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
        :class="{ 'mr-0': item.isSelf, 'ml-auto': item.isSelf }"
      >
        <v-list-item-title class="text-sm-body-2" :style="{ color: getUser(item.userId)?.color, 'text-shadow': 'rgba(255, 255, 255, 0.2) 0 0 1px' }">
          {{ getUser(item.userId)?.username }} [{{ timeFormat(item.timestamp) }}]
        </v-list-item-title>
        <span>{{ item.text }}</span>
      </v-list-item>
    </v-list>
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
