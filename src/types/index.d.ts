export interface IMember extends IOutputMember {
  id: string;
}

export interface IOutputMember {
  username: string;
  color: string;
}

export interface IMessage extends IOutputMessage {
  id: string;
  userId: string;
  isSelf: boolean;
}

export interface IOutputMessage {
  text: string;
  timestamp: number;
}
