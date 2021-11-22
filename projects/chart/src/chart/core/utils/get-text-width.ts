export const getTextWidth = (() => {
  return function (
    inputText?: string | number | null,
    backupRatio = 0.5,
    fontSize = 11
  ): number {
    let text = inputText ?? '';
    text = text.toString();

    return fontSize * backupRatio * text.length;
  };
})();
