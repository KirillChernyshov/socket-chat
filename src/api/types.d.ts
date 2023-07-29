export interface IServerToClientEvents {
  authorized: () => void,
  message: (payload: string) => void,
}

export interface IClientToServerEvents {
  authorization: (account: { userName: string, color: string }) => void,
  message: (payload: string) => void,
}
