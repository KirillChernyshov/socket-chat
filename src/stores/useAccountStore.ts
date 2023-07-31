import { defineStore } from 'pinia';
import { computed, readonly, ref, watch } from 'vue';
import useSocketStore from '@/stores/useSocketStore';
import { IOutputMember } from '@/types';

export default defineStore('Account', () => {
  const socketStore = useSocketStore();

  const account = ref<IOutputMember>({
    username: window.localStorage.getItem('username') || '',
    color: window.localStorage.getItem('color') || '#d9ff5e',
  });

  const isExist = computed(() => !!account.value.username);

  const isAuthorized = ref(false);

  watch(account, () => {
    window.localStorage.setItem('username', account.value.username);
    window.localStorage.setItem('color', account.value.color);
  });

  async function logIn(username: string, color: string) {
    account.value = {
      username,
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
