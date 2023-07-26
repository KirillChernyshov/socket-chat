<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { VVirtualScroll } from 'vuetify/components/VVirtualScroll';

const messagesElement = ref<VVirtualScroll>();

const message = ref('');

const messages = computed(() => {
  const list = {};

  for (let i = 0; i < 100; i += 1) {
    Object.assign(list, { [i]: {
      id: i,
      name: `User#${(Date.now() / 10_000_000).toString().split('.')[1]}`,
      message: 'Hello, World',
      color: `#${Math.round(Math.random() * 1000)}`,
      timestamp: Date.now(),
    }});
  }

  return list;
});

onMounted(() => {
  setTimeout(() => {
    console.log(messagesElement.value);
    if (messagesElement.value) {
      console.log(Object.values(messages).length - 1);
      messagesElement.value?.scrollToIndex(-1);
    }
  });
});
</script>

<template>
  <v-card width="800" title="Чат" class="chat-card d-flex flex-column pa-3">
    <v-virtual-scroll ref="messagesElement" class="flex-1-1" :items="Object.values(messages)">
      <template #default="{ item }">
        <v-list-item variant="tonal" class="message pa-1 mt-2">
          <v-list-item-title class="text-sm-body-2" :style="{ color: item.color, 'text-shadow': 'rgba(255, 255, 255, 0.2) 0 0 1px' }">
            {{ item.name }} [{{ new Date(item.timestamp) }}]
          </v-list-item-title>
          <span>{{ item.message }}</span>
        </v-list-item>
      </template>
    </v-virtual-scroll>
    <v-text-field
      v-model="message"
      placeholder="Введите сообщение"
      class="flex-0-0 mt-5"
      variant="outlined"
      base-color="deep-purple"
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
