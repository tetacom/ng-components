export class ArrayUtil {
  public static asArray<T>(value: T | T[]): T[] {
    if (value === null || value === undefined) {
      return [];
    }
    if (value instanceof Array) {
      return value;
    }
    return [value];
  }

  public static flatten(data: any[], children?: string | ((item: any) => any[]), onlyLeafs?: boolean): any[] {
    const result: any[] = [];
    data.forEach((child) => {
      let childItems: any[] = [];
      if (children) {
        if (typeof children === 'string') {
          childItems = child[children];
        }
        if (typeof children === 'function') {
          childItems = children(child);
        }
      } else {
        childItems = child.children;
      }
      if (childItems !== null && childItems !== undefined && childItems.length > 0) {
        if (!onlyLeafs) {
          result.push(child);
        }
        result.push(...ArrayUtil.flatten(childItems, children, onlyLeafs));
      } else {
        result.push(child);
      }
    });
    return result;
  }

  static findRecursive(tree: any[], comparer: (iterableNode: any) => boolean, children = 'children'): any {
    const found = tree.find((x) => comparer(x));
    if (found !== null && found !== undefined) {
      return found;
    }
    for (let i = 0, l = tree.length; i < l; i++) {
      const item = tree[i];
      if (item[children] && item[children].length) {
        const res = ArrayUtil.findRecursive(item[children], comparer);
        if (res !== null && res !== undefined) {
          return res;
        }
      }
    }
    return null;
  }

  static filterRecursive(
    array: any[],
    filter: (item: any) => boolean,
    children = 'children',
    keepChildren = true,
    fullscanChildren = false
  ): any {
    const result = [];
    if (array && array.length) {
      for (const item of array) {
        const resultItem = Object.assign({}, item);
        if (filter(resultItem)) {
          result.push(resultItem);
          if (!keepChildren) {
            resultItem[children] = [];
            if (fullscanChildren) {
              continue;
            }
            break;
          }
        } else if (item[children] && item[children].length > 0) {
          resultItem[children] = [];
          const found = ArrayUtil.filterRecursive(item[children], filter, children, keepChildren, fullscanChildren);
          if (found?.length > 0) {
            resultItem[children] = found;
            result.push(resultItem);
          }
        }
      }
    }
    return result;
  }

  static distinct<T>(array: T[], comparator: (item: T) => any): T[] {
    const result: T[] = [];
    if (array && array.length) {
      for (const item of array) {
        const found = result.find((_) => comparator(_) === comparator(item));
        if (!found) {
          result.push(item);
        }
      }
    }
    return result;
  }

  static findParents(tree: any[], item: any): any[] | null {
    if (tree?.indexOf(item) >= 0) {
      return tree;
    }
    if (Array.isArray(tree)) {
      for (const treeNode of tree) {
        const childResult = this.findParents(treeNode.children, item);
        if (Array.isArray(childResult)) {
          return [treeNode].concat(childResult);
        }
      }
    }
    return null;
  }

  static moveItem(list: any[], sourceIndex: number, targetIndex: number) {
    const res = [...list];
    const item = list[sourceIndex];
    if (targetIndex > sourceIndex) {
      res.splice(targetIndex, 0, item);
      res.splice(sourceIndex, 1);
    } else {
      res.splice(sourceIndex, 1);
      res.splice(targetIndex, 0, item);
    }
    return res;
  }
}
