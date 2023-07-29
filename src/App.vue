<script lang="ts" setup>
import { onMounted}  from 'vue';
import useSocketStore from '@/stores/useSocketStore';

const socketStore = useSocketStore();

onMounted(() => {
  socketStore.connect();
});
</script>

<template>
  <v-app class="screen" :full-height="true">
    <v-main class="d-flex align-center justify-center">
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">

</style>
