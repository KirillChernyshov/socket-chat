import { IMember } from '@/types';

export interface IServerToClientEvents {
  authorized: (members: Record<string, IMember>) => void,
  message: (payload: string) => void,
  add_member: (member: IMember) => void,
  remove_member: (is: string) => void,
}

export interface IClientToServerEvents {
  authorization: (account: { userName: string, color: string }) => void,
  message: (payload: string) => void,
}
