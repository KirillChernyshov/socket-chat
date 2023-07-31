import { defineStore } from 'pinia';
import { ref } from 'vue';
import { IMember } from '@/types';

export default defineStore('Messages', () => {
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

  return {
    members,

    addMember,
    addMembers,
    removeMember,
  };
});
