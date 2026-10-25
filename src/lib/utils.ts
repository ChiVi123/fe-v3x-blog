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

export const createMockApi =
  <Args extends unknown[], R>(
    callback: (...args: Args) => R,
    delay: number = 1000,
    options: { shouldError: boolean } = { shouldError: false },
  ) =>
  (...args: Args): Promise<R> => {
    const shouldError = options.shouldError;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldError) {
          reject(new Error("Failed to fetch data"));
        } else {
          resolve(callback(...args));
        }
      }, delay);
    });
  };

export function dateFormat(
  date: string | number | Date,
  type: "short" | "long" = "short",
) {
  const d = new Date(date);

  if (type === "short") {
    return d.toLocaleDateString("vi-VN", {
      // year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }

  return d.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getAuthorInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(-2)
    .join("");
}
