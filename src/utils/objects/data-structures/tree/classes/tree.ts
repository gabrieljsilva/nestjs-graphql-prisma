import { TreeNode } from './tree-node';

interface InsertParams<T> {
  parentNodeKey: string;
  key: string;
  value: T;
  children?: TreeNode<T>[];
}

export class Tree<T> {
  private readonly root: TreeNode<T>;

  constructor(key: string, value: T) {
    this.root = new TreeNode<T>({ key, value, children: [] });
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.children.length) {
      for (const child of node.children) {
        yield* this.preOrderTraversal(child);
      }
    }
  }

  *postOrderTraversal(node = this.root) {
    if (node.children.length) {
      for (const child of node.children) {
        yield* this.postOrderTraversal(child);
      }
    }
    yield node;
  }

  insert(node: InsertParams<T>): TreeNode<T> | null {
    const { parentNodeKey, key, value, children } = node;
    const parentNode = this.find(parentNodeKey);
    const treeNode = new TreeNode<T>({
      key,
      value,
      parent: parentNode,
      children,
    });
    parentNode?.children.push(treeNode);
    return null;
  }

  find(key: string): TreeNode<T> {
    for (const node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  getRoot() {
    return this.root;
  }
}
