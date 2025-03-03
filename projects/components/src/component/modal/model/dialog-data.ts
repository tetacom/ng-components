export interface DialogButtonType {
  text: string;
  palette?: string;
  icon?: string;
}

export interface DialogDataType {
  title: string;
  text?: string;
  confirm?: DialogButtonType;
  decline?: DialogButtonType;
}
