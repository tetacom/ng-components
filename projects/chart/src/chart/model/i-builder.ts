export interface IBuilder<T, U> {
  build(settings: T): U;
}
