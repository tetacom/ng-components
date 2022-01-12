import {IRect} from '../contract/i-rect';
import {Align} from '../enum/align.enum';
import {VerticalAlign} from '../enum/vertical-align.enum';

export class PositionUtil {
  public static getPosition(
    containerPosition: IRect,
    elementPosition: IRect,
    align: Align,
    verticalAlign: VerticalAlign,
    margin: number = 0,
    verticalMargin: number = 0,
    transformedParentRect: IRect = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  ): IRect {
    const rect: IRect = {};
    const elementWidth = elementPosition.right - elementPosition.left;
    const elementHeight = elementPosition.bottom - elementPosition.top;
    const containerWidth = containerPosition.right - containerPosition.left;
    const containerHeight = containerPosition.bottom - containerPosition.top;
    if (align === Align.left) {
      rect.left = containerPosition.left + margin;
    }
    if (align === Align.right) {
      rect.left = containerPosition.right - elementWidth - margin;
    }
    if (align === Align.center) {
      rect.left =
        (containerPosition.left + containerPosition.right) / 2 -
        elementWidth / 2;
    }
    if (align === Align.fitWidth) {
      rect.left = containerPosition.left + margin;
      rect.right = window.innerWidth - containerPosition.right + margin;
    }

    if (align === Align.minWidth) {
      rect.left = containerPosition.left + margin;
      rect.minWidth = containerWidth;
    }

    if (verticalAlign === VerticalAlign.auto) {
      if (
        containerPosition.bottom +
        (elementPosition.bottom - elementPosition.top) <=
        window.innerHeight
      ) {
        verticalAlign = VerticalAlign.bottom;
      } else {
        verticalAlign = VerticalAlign.top;
      }
    }
    if (verticalAlign === VerticalAlign.top) {
      rect.top = containerPosition.top - elementHeight - verticalMargin;
    }
    if (verticalAlign === VerticalAlign.bottom) {
      rect.top = containerPosition.bottom + verticalMargin;
    }
    if (verticalAlign === VerticalAlign.center) {
      rect.top =
        (containerPosition.top + containerPosition.bottom) / 2 -
        elementHeight / 2;
    }

    if (rect.left < 0) {
      rect.left = 0;
    }
    if (rect.top + elementHeight > window.innerHeight || rect.bottom < 0) {
      rect.bottom = 0;
    }
    if (rect.top < 0) {
      rect.top = 0;
    }
    if (verticalAlign === VerticalAlign.bottom || verticalAlign === VerticalAlign.center) {
      rect.maxHeight = window.innerHeight - rect.top;
    }
    if (verticalAlign === VerticalAlign.top) {
      rect.maxHeight = containerPosition.top;
    }
    rect.left = rect.left - transformedParentRect.left;
    rect.right = rect.right - transformedParentRect.left;
    rect.top = rect.top - transformedParentRect.top;
    rect.bottom = rect.bottom ? rect.bottom - transformedParentRect.bottom : rect.bottom;
    return rect;
  }

  public static setElementPosition(element: HTMLElement, rect: IRect): void {
    element.style.left = rect.left != null ? `${rect.left}px` : '';
    element.style.right = rect.right != null ? `${rect.right}px` : '';
    element.style.top = rect.top != null ? `${rect.top}px` : '';
    element.style.bottom = rect.bottom != null ? `${rect.bottom}px` : '';
    element.style.maxHeight =
      rect.maxHeight != null ? `${rect.maxHeight}px` : '';
    element.style.minWidth = rect.minWidth != null ? `${rect.minWidth}px` : '';
  }

  public static getMaxHeight(position: IRect): number | null {
    let maxHeight = null;
    maxHeight = 1;
    return maxHeight;
  }

  public static getMaxWidth(position: IRect): number | null {
    let maxWidth = null;
    maxWidth = 1;
    return maxWidth;
  }
}
