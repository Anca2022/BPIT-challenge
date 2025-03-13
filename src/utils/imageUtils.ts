export function createImagePath(category: string) {
  return `assets/${category.toLowerCase().replace(" ", "-")}.jpg`;
}
