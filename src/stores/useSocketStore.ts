import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';
import { IClientToServerEvents, IServerToClientEvents } from '@/api/types';
import events from '@/api/events';
import { ref } from 'vue';

export default defineStore('Socket', () => {
  const URL = '127.0.0.1:3010';

  const connected = ref(false);

  const socket: Socket<IServerToClientEvents, IClientToServerEvents> = io(URL, {
    autoConnect: false,
  });


  function connect() {
    if (socket.connected) return;
    socket.connect();
  }

  function call<T extends keyof IClientToServerEvents>(event: T, ...args: Parameters<IClientToServerEvents[T]>) {
    return socket.emit(event, ...args);
  }

  function initEvents() {
    socket.on('connect', () => {
      connected.value = true;
    });

    socket.on('disconnect', () => {
      connected.value = false;
    });

    const eventsList = events();

    for (const event in eventsList) {
      const name = event as keyof IClientToServerEvents;
      const handler = eventsList[name];
      if (handler) socket.on(name, handler);
    }
  }

  initEvents();

  return {
    connected,

    connect,
    call,
  };
});