'use strict';
const str = 'Leptinella filiformis, or slender button daisy';
const treecontainer = [];

class Tree {
  constructor(name, entrynum) {
    this.name  = name;
    this.entrynum = entrynum;
    this.altnam  = null;
    this.right = null;
    this.left = null;
  }
  merge(onenode, othernode) {
    this.name  = onenode.name + othernode.name;
    this.entrynum = onenode.entrynum + othernode.entrynum;
    this.right = onenode;
    this.left = othernode;
  }
  huffname(node, string) {
    if (node) {
      this.huffname(node.left, string + '0');
      if (node.left === null && node.right === null) {
        node.altnam = string;
      }
      this.huffname(node.right, string + '1');
    }
  }
}

function bubbleSort(a) {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < a.length - 1; i++) {
      if (a[i].entrynum > a[i + 1].entrynum) {
        const temp = a[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swapped = true;
      }
    }
  }
  while (swapped);
}

function newname(node, char, ar) {
  if (node) {
    newname(node.left, char, ar);
    if (node.name === char) {
      ar.push(node.altnam);
      ar.shift();
    }
    newname(node.right, char, ar);
  }
}

function uniqueCharacter(string) {
  const arr = string.split('');
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]  && i !== j) {
        arr[j] = undefined;
      }
    }
  }
  const narr  = arr.filter((el) => el !== undefined);
  return narr;
}

function creatingNodes(ucarr, initialarr, nodearr) {
  for (let i = 0; i < ucarr.length; i++) {
    let count = 0;
    for (let j = 0; j < initialarr.length; j++) {
      if (ucarr[i] === initialarr[j]) {
        count++;
      }
    }
    const tmp = new Tree(ucarr[i], count);
    nodearr.push(tmp);
  }
  bubbleSort(nodearr);
  return nodearr;
}

function nodesToTree(nodes) {
  const i = 0;
  while (i < nodes.length - 1) {
    if (nodes.length > 2 && nodes[i].entrynum > nodes[i + 2].entrynum) {
      const tmp = new Tree('nam', 0);
      tmp.merge(nodes[i + 1], nodes[i + 2]);
      const tempo = new Tree('num', 0);
      tempo.merge(nodes[i], tmp);
      let n = 0;
      while (n < 3) {
        nodes.shift();
        n++;
      }
      nodes.unshift(tempo);
    } else {
      const tmp = new Tree('nam', 0);
      tmp.merge(nodes[i], nodes[i + 1]);
      let n = 0;
      while (n < 2) {
        nodes.shift();
        n++;
      }
      nodes.unshift(tmp);
    }
  }
}

function treeToCharArr(treearr, initarr) {
  treearr[0].huffname(treearr[0], '');
  for (let i = 0; i < initarr.length; i++) {
    newname(treearr[0], initarr[0], initarr);
  }
}

function lineToBinary(line, containerarray) {
  const uniquechararr = uniqueCharacter(line);
  const linearr = line.split('');
  creatingNodes(uniquechararr, linearr, containerarray);
  nodesToTree(containerarray);
  treeToCharArr(containerarray, linearr);
  const hufstr = linearr.join('');
  return hufstr;
}

function binaryToLine(str, hufftree) {
  const stringarr  = str.split('');
  const lengt = stringarr.length;
  search(stringarr, hufftree, 0, lengt, 0);
  return stringarr.join('');
}

function search(array, tree, index, size, mark) {
  let treeel = tree;
  while (treeel.left !== null && treeel.right !== null) {
    if (array[index] === '0') {
      treeel = treeel.left;
      index++;
    } else {
      treeel = treeel.right;
      index++;
    }
  }
  for (let i = 0; i < index; i++) {
    array.shift();
    mark++;
  }
  array.push(treeel.name);
  if (mark === size) {
    return;
  } else {
    search(array, tree, 0, size, mark);
  }
}

const bin = lineToBinary(str, treecontainer);
const lin = binaryToLine(bin, treecontainer[0]);
console.log(bin);
console.log(lin);
