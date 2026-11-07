export function dateFormat(date: string | number | Date, type: "short" | "long" = "short") {
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

/**
 * Auto inject f_auto, q_auto into Cloudinary URL
 * @param url
 * @param width
 * @returns string
 */
export function optimizeCloudinaryUrl(url: string, width?: number | `${number}`): string {
  if (!url.includes("res.cloudinary.com") || url.includes("f_auto")) {
    return url;
  }
  const transform = width ? `f_auto,q_auto,w_${width}` : "f_auto,q_auto";
  return url.replace("/image/upload/", `/image/upload/${transform}/`);
}
