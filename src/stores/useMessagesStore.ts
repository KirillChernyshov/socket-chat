import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IMember, IMessage, IOutputMessage } from '@/types';
import useSocketStore from '@/stores/useSocketStore';

export default defineStore('Messages', () => {
  const socketStore = useSocketStore();

  const members = ref<Record<string, IMember>>({});

  function addMember(member: IMember) {
    Object.assign(members.value, { [member.id]: member });
  }

  function addMembers(newMembers: Record<string, IMember>) {
    Object.assign(members.value, newMembers);
  }

  function removeMember(memberId: string) {
    delete members.value[memberId];
  }

  const messages = ref<Record<string, IMessage>>({});

  function addMessage(newMessage: IMessage) {
    if (newMessage.userId === socketStore.id) newMessage.isSelf = true;
    Object.assign(messages.value, { [newMessage.id]: newMessage });
  }

  function sendMessage(message: IOutputMessage) {
    socketStore.call('send_message', message);
  }

  return {
    members,
    addMember,
    addMembers,
    removeMember,

    messages,
    sendMessage,
    addMessage,
  };
});
