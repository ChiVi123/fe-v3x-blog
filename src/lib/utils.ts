/** Tạo URL ảnh Picsum theo seed */
export const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}.jpg`;

/** Bỏ dấu tiếng Việt để so sánh tìm kiếm */
export const deaccent = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
