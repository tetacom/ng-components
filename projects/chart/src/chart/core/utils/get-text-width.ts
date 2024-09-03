export const getTextWidth = (inputText?: string | number | null, backupRatio = 0.5, fontSize = 10): number => {
  let text = inputText ?? '';
  text = text.toString();

  return fontSize * backupRatio * text.length;
};
