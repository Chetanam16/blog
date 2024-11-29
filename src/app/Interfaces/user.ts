export interface User {
  id: number;
  username: string;
  password: string;
  blogs?: Blog[];
}
export interface Blog {
  id: number;
  title: string;
  description: string;
  image?: string;
}
