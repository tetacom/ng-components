import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[tetaHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() set tetaHighlight(text: string) {
    setTimeout(() => {
      if (this._initialElement) {
        this.elementRef.nativeElement.innerHTML = this._initialElement;
      }
      if (!text) {
        return;
      }
      const pattern = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
      const searchWithOutRegExp = text
        .toLowerCase()
        .replace(pattern, '\\$&')
        .split(' ')
        .filter((t) => t.length > 0)
        .join('|');
      this._initialElement = this.elementRef.nativeElement.innerHTML;
      this.recursiveReplaceNode(this.elementRef.nativeElement.childNodes, searchWithOutRegExp);
    }, 10);
  }

  private _initialElement = null;

  constructor(private elementRef: ElementRef) {}

  private recursiveReplaceNode(nodes: NodeListOf<ChildNode>, searchWithOutRegExp: string): boolean {
    let match = false;
    const cacheNodes: ChildNode[] = [];
    nodes.forEach((node: ChildNode) => {
      cacheNodes.push(node);
    });
    cacheNodes.forEach((node) => {
      if (node.nodeType === 3) {
        if (node.nodeValue && node.nodeValue.search(new RegExp(searchWithOutRegExp, 'i')) > -1) {
          match = true;
          this.wrapNode(node, searchWithOutRegExp);
        }
      } else {
        match = this.recursiveReplaceNode(node.childNodes, searchWithOutRegExp) || match;
      }
    });

    return match;
  }

  private wrapNode(textNode: ChildNode, searchWithOutRegExp: string) {
    if (!textNode || !textNode.nodeValue) {
      return;
    }
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = textNode.nodeValue.replace(
      new RegExp(searchWithOutRegExp, 'gi'),
      (match) => `<mark>${match}</mark>`,
    );

    const parentNode = textNode.parentNode;
    if (parentNode) {
      while (tempDiv.firstChild) {
        parentNode.insertBefore(tempDiv.firstChild, textNode);
      }
      parentNode.removeChild(textNode);
    }
  }
}
