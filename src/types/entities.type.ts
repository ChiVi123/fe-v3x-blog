export type PostDetail = {
  id: string;
  title: string;
  slug: string;
  content: string;
  readingTime: number;
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
  postsCount: number;
};

export type Author = {
  id: string;
  username: string;
  email: string;
  bio: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Image = {
  id: string;
  url: string;
  metadata: {
    width: number;
    height: number;
  };
};
