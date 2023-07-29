import { IServerToClientEvents } from '@/api/types';
import useAccountStore from '@/stores/useAccountStore';

function events(): Partial<IServerToClientEvents> {
  const accountStore = useAccountStore();

  return {
    'authorized': () => {
      accountStore.setAuthorized(true);
    },
    'message': (message: string) => {
      console.log(message);
    },
  };
}

export default events;
