export type Post = {
  no: string;
  cat: string;
  title: string;
  date: string;
  read: number;
  seed: string;
  author: string;
  dek: string;
  quote: string;
  body: string[];
};

export type PostCategory =
  | "Tất cả"
  | "Tùy bút"
  | "Sách"
  | "Đời thường"
  | "Xã hội";
