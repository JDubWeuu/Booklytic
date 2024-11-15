import { create } from 'zustand';
import { BookInterface } from '@/lib/books';


export interface LoggedInState {
  loggedIn: boolean;
  setLoggedIn: (input: boolean) => void;
};

export interface userState {
  google_uid: string | null,
  name: string,
  email: string,
  password: string,
  age: number | null
};

// create zustand stores for global state access
export const useLoggedInStore = create<LoggedInState>((set) => ({
    loggedIn: false,
    setLoggedIn: (input: boolean) => set({ loggedIn: input }),
}));

export const userStore = create<userState>((set) => ({
  google_uid: null,
  name: '',
  email: '',
  password: '',
  age: null,
  setUser: (user: userState) => set(() => user),
  setUserId: (uid: string) => set((state) => {
    return {
      ...state,
      google_uid: uid
    }
  })
}));

interface booksState {
  books: BookInterface[],
  setBooks: (newBook: BookInterface) => void
}

export const bookStore = create<booksState>((set) => ({
  books: [],
  setBooks: (newBook) => set((state) => {
    return {
      ...state,
      newBook
    }
  })
}));