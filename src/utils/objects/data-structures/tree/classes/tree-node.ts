export class TreeNode<T> {
  key: string;
  value: T;
  parent: TreeNode<T>;
  children: TreeNode<T>[];

  constructor(node: Partial<TreeNode<any>>) {
    this.key = node.key;
    this.value = node.value;
    this.parent = node.parent;
    this.children = node.children ?? [];
  }

  public isLeaf() {
    return this.children.length === 0;
  }
}
