import { IServerToClientEvents } from '@/api/types';
import { IMember } from '@/types';
import useAccountStore from '@/stores/useAccountStore';
import useMessagesStore from '@/stores/useMessagesStore';

function events(): Partial<IServerToClientEvents> {
  const accountStore = useAccountStore();
  const messagesStore = useMessagesStore();

  return {
    'authorized': (members: Record<string, IMember>) => {
      accountStore.setAuthorized(true);
      messagesStore.addMembers(members);
    },
    'message': (message: string) => {
      console.log(message);
    },
    'add_member': (member: IMember) => {
      messagesStore.addMember(member);
    },
    'remove_member': (id: string) => {
      messagesStore.removeMember(id);
    },
  };
}

export default events;
