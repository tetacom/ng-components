export class DynamicData {
  [key: string]: any;

  constructor(value: { [key: string]: any }) {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        this[key] = value[key];
      }
    }
  }
}
