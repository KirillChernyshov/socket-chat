<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import useAccountStore from '@/stores/useAccountStore';

const router = useRouter();
const accountStore = useAccountStore();
const { isAuthorized, account } = toRefs(accountStore);

const userName = ref(account.value.username
    || `User#${(Date.now() / 10_000_000).toString().split('.')[1]}`);
const color = ref(account.value.color || '#3400FF');

function submit(event: SubmitEvent) {
  event.preventDefault();
  if (!userName.value) return;

  accountStore.logIn(userName.value, color.value);
}

watchEffect(() => {
  if (isAuthorized.value) router.push('Chat');
});
</script>

<template>
  <v-card width="400" title="Авторизация" class="pa-3">
    <v-form class="d-flex flex-column align-content-center" @submit="submit">
      <v-text-field
        v-model="userName"
        label="User Name"
        variant="outlined"
        base-color="deep-purple"
      />
      <v-color-picker
        v-model="color"
        class="mb-5 align-self-center"
        :hide-canvas="true"
        :hide-inputs="true"
      />
      <v-btn
        size="x-large"
        variant="outlined"
        color="deep-purple"
        type="submit"
      >
        Go!
      </v-btn>
    </v-form>
  </v-card>
</template>

<style scoped>

</style>
