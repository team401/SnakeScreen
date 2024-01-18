export interface Iapi {
  receive: (channel: string, func: (...args) => void) => void;
  startClient: (hostname: string) => void;
}

declare global {
  interface Window {
    api: Iapi;
  }
}
