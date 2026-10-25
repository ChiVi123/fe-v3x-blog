// export type Post_legacy = {
//   no: string;
//   cat: string;
//   title: string;
//   date: string;
//   read: number;
//   seed: string;
//   author: string;
//   dek: string;
//   quote: string;
//   body: string[];
// };

export type PostDetail = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: Category;
  author: Author;
  thumbnail: Image;
  createdAt: string;
  updatedAt: string;
};

export type PostRow = Omit<PostDetail, "content">;

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Author = {
  id: string;
  username: string;
};

export type Image = {
  id: string;
  url: string;
  metadata: {
    width: number;
    height: number;
  };
};
