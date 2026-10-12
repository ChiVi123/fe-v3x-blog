export type Author = {
  name: string;
  role: string;
  bio: string;
};

export const authors: Record<string, Author> = {
  ann: {
    name: "Mai An Nhiên",
    role: "Biên tập viên",
    bio: "Viết về đời thường, thói quen nhỏ và những điều dễ bị bỏ qua. Cà phê đen, không đường.",
  },
  khoa: {
    name: "Trần Minh Khoa",
    role: "Tác giả",
    bio: "Đọc nhiều hơn viết, chép nhiều hơn đọc. Tin rằng mọi cuốn sách tốt đều xứng đáng được đọc hai lần.",
  },
  ha: {
    name: "Lê Thu Hà",
    role: "Tác giả",
    bio: "Tò mò về xã hội và cách con người sống với nhau trong thời đại chạy quá nhanh.",
  },
};

export function getAuthorById(id: string): Author | undefined {
  return authors[id];
}

export function getAuthorInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("");
}
