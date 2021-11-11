export class StringUtil {
  static firstLetterToLower(input: string) {
    return input.charAt(0).toLocaleLowerCase() + input.slice(1);
  };
}
