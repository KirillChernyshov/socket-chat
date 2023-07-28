import { reactive } from 'vue';
import { io } from 'socket.io-client';
import events from './events';

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

const URL = '127.0.0.1:3010';

export const socket = io(URL);

export function initEvents() {
  for (const event in events) {
    socket.on(event, events[event as keyof typeof events]);
  }
}
