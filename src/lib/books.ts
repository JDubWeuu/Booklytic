// demo data to test library framework

export interface BookInterface {
    id: number,
    title: string,
    authorName: string,
    authorId: string,
    description: string,
    content: string,
};


export const books: BookInterface[] = [
  {
    id: 1,
    title: "The Art of War",
    authorName: "Sun Tzu",
    authorId: "author001",
    description:
      "A treatise on military strategy and tactics written in ancient China.",
    content: "All warfare is based on deception...",
  },
  {
    id: 2,
    title: "1984",
    authorName: "George Orwell",
    authorId: "author002",
    description:
      "A dystopian novel set in a totalitarian society under constant surveillance.",
    content:
      "It was a bright cold day in April, and the clocks were striking thirteen...",
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    authorName: "Harper Lee",
    authorId: "author003",
    description:
      "A novel about the serious issues of rape and racial inequality.",
    content:
      "When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow...",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    authorName: "Jane Austen",
    authorId: "author004",
    description:
      "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
    content:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune...",
  },
  {
    id: 5,
    title: "Moby-Dick",
    authorName: "Herman Melville",
    authorId: "author005",
    description:
      "A narrative of the adventures of the wandering sailor Ishmael and his voyage on the whaling ship Pequod.",
    content: "Call me Ishmael...",
  },
];





