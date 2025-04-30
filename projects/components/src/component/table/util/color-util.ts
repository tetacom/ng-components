export class ColorUtil {
  public static getHexColor(color: string) {
    if (color && color.startsWith('rgb')) {
      const value = color.substring(color.indexOf('(') + 1, color.lastIndexOf(')'));
      const colorArray = value.split(',');
      color = `#${('00' + parseInt(colorArray[0], 10).toString(16)).slice(
        -2,
      )}${('00' + parseInt(colorArray[1], 10).toString(16)).slice(-2)}${(
        '00' + parseInt(colorArray[2], 10).toString(16)
      ).slice(-2)}`;
    }
    return color;
  }
}
