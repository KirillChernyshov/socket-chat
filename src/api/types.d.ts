import { IMember, IMessage, IOutputMember, IOutputMessage } from '@/types';

export interface IServerToClientEvents {
  authorized: (members: Record<string, IMember>) => void,
  add_member: (member: IMember) => void,
  remove_member: (is: string) => void,
  add_message: (payload: IMessage) => void
}

export interface IClientToServerEvents {
  authorization: (account: IOutputMember) => void,
  send_message: (payload: IOutputMessage) => void,
}
