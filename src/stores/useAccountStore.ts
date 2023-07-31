import { defineStore } from 'pinia';
import { computed, readonly, ref, watch } from 'vue';
import useSocketStore from '@/stores/useSocketStore';

export default defineStore('Account', () => {
  const socketStore = useSocketStore();

  const account = ref({
    userName: window.localStorage.getItem('userName') || '',
    color: window.localStorage.getItem('color') || '#d9ff5e',
  });

  const isExist = computed(() => !!account.value.userName);

  const isAuthorized = ref(false);

  watch(account, () => {
    window.localStorage.setItem('userName', account.value.userName);
    window.localStorage.setItem('color', account.value.color);
  });

  async function logIn(userName: string, color: string) {
    account.value = {
      userName,
      color,
    };

    socketStore.call('authorization', account.value);
  }

  function setAuthorized(state: boolean) {
    isAuthorized.value = state;
  }

  return {
    account: readonly(account),
    isExist,
    isAuthorized: readonly(isAuthorized),

    logIn,
    setAuthorized,
  };
});
