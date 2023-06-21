import { atom } from 'recoil';

const loggedInStateDefault = localStorage.getItem("IsLoggedIn") === null ? false : localStorage.getItem("IsLoggedIn") === 'true';
const numMessages = 0;

export const LoggedInstate = atom<boolean>({
  key: 'LoggedInstate',
  default: loggedInStateDefault,
});

export const numMessagesState = atom<number>({
  key: 'numMessagesState',
  default: numMessages,
});

export const searchText = atom<string>({
  key: 'searchText',
  default: '',
});

export const FirstLaunch = atom<boolean>({
  key: 'firstLaunch',
  default: true
});

export const tests = atom<Tests[]>({
  key: 'tests',
  default: []
});

export const blogs = atom<Blog[]>({
  key: 'blogs',
  default: []
});

export interface Blog {
  title: string;
  url: string;
  description: string;
  date: string;
}

export interface Tests {
  title: string;
  description: string;
  url: string,
}