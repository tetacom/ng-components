export class DomUtil {
  public static clickedInside(
    target: HTMLElement | undefined | null,
    event: MouseEvent
  ): boolean {
    return !!target && event.composedPath().indexOf(target) >= 0;
  }

  public static findTransformedParent(node: HTMLElement) {
    while (node !== null && node.tagName !== 'BODY') {
      const style = getComputedStyle(node);
      if (style.transform !== 'none') {
        return node;
      }
      node = node.parentNode as HTMLElement;
    }
    return null;
  }

  public static isOverflown(element: HTMLElement) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }
}
