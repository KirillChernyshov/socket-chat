import { IServerToClientEvents } from '@/api/types';
import { IMember, IMessage } from '@/types';
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
    'add_member': (member: IMember) => {
      messagesStore.addMember(member);
    },
    'remove_member': (id: string) => {
      messagesStore.removeMember(id);
    },
    'add_message': (message: IMessage) => {
      messagesStore.addMessage(message);
    },
  };
}

export default events;
