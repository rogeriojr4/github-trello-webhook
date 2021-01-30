import { customAlphabet } from "nanoid";

const nanoid4 = customAlphabet("0123456789", 4);

/**
 * Transforms a text into a branch name
 * @param title
 */
export function formatTitle(title: string) {
  return (
    title
      .split(" ")
      .filter((x, index) => x != "" && index < 5) // Crop it to be, at most, 5 words (for branch not become too long names)
      .join("-")
      .toLocaleLowerCase() + `-#${nanoid4()}`
  ); // Join them and make "Something beautiful" be "something-beautiful-#5"
}
