'use strict';
let str = 'sesquipedalian';
let arry = [];
let flg = 0;

function bubbleSort(a)
{
    let swapped;
    do {
        swapped = false;
        for (let i=0; i < a.length-1; i++) {
            if (a[i].same > a[i+1].same) {
                let temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } 
    while (swapped);
}

function newnam(nod,el,ar){
   if(nod){
     newnam(nod.left,el,ar);
      if(nod.name === el){
        ar.push(nod.altnam);
        ar.shift();
      }
      newnam(nod.right,el,ar);
    }
  }
 
class Tree{
 constructor(name, same){
   this.name  = name;
    this.same = same;
    this.altnam  = null;
    this.right = null;
   this.left = null;
  }
  merg(one, otr){
   this.name  = one.name + otr.name;
    this.same = one.same + otr.same;
    this.right = one;
    this.left = otr;
  }
  alter(nod,str){
    if(nod){
      this.alter(nod.left,str+'0');
      if(nod.left === null&&nod.right===null){
        nod.altnam = str;
      }
      this.alter(nod.right, str+'1');
    }
  }
}

function tree(line, arrr){
let arr1 = line.split('');
let arr = line.split('');
 for(let i = 0; i < arr.length; i++){
   for(let j = 0; j < arr.length; j++){
     if(arr[i] === arr[j]  && i !== j){
       arr[j] = undefined;
      }
    }
  }
  let narr  = arr.filter(function (el)  {
   return el !== undefined;
  })
  for(let i = 0; i < narr.length; i++){
   let count = 0; 
   for(let j = 0; j < arr.length; j++){
     if(narr[i] === arr1[j]){
       count++;
      } 
	}
  let tmp = new Tree(narr[i], count);
 arrr.push(tmp);
  }
  bubbleSort( arrr );
  let i = 0
  while(i < arrr.length -1){
  if(arrr.length > 2 && arrr[i].same > arrr[i+2].same  ){
     let tmp = new Tree('nam', 0);
       tmp.merg(arrr[i+1], arrr[i+2]);
       let tempo = new Tree('num',0);
       tempo.merg(arrr[i], tmp);
       let n = 0;
       while(n < 3){
        arrr.shift();
         n++
       }
      arrr.unshift(tempo);
   }else{
      let tmp = new Tree('nam', 0);
       tmp.merg(arrr[i], arrr[i+1]);
       let n = 0;
       while(n < 2){
        arrr.shift();
         n++
       }
      arrr.unshift(tmp);
      }
    }
   arrr[0].alter(arrr[0], '');
   for(let i = 0; i< arr1.length;i++){
    newnam(arrr[0],arr1[0],arr1);
   }
 let hufstr = arr1.join('');
  return hufstr;   
}

function untree(str,tr){
 let arr  = str.split('');
 search(arr, tr, 0,'');
 return arr.join('');
}

function search(arr,tree,cnt, tmp){
     let nod = tree;
     while( nod.left !==null&&nod.right !==null ){
         if(arr[cnt] === '0'){
             nod = nod.left;
       cnt++;
         }else{
              nod = nod.right;
              cnt++;
         }
     }
     for(let i = 0;i < cnt; i++){
   arr.shift();
  }
  if(flg === 0){
   tmp = nod.name;
    flg++;
	}
  arr.push(nod.name);
   if(arr[0]===tmp){
	   return;
   }else{
   search(arr,tree,0,tmp);
   }
 }

let lin = tree(str, arry);
let bck = untree(lin, arry[0]);
console.log(lin);
console.log(bck);