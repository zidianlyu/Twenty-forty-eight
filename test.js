function test(arr) {
    let newArr = [];
    arr = arr.filter(x => x !== 0);
    while (arr.length > 0) {
        if (arr.length > 1 && arr[arr.length - 1] === arr[arr.length - 2]) {
            newArr.unshift(arr[arr.length - 1] * 2);
            arr.pop();
            arr.pop();
            continue;
        }
        newArr.unshift(arr.pop());
    }

    while (newArr.length < 4) {
        newArr.unshift(0);
    }
    return newArr;
}

let input1 = [2, 2, 2, 2];
// let exp1 = [4, 4, 0, 0];

let input2 = [0, 2, 2, 2];
// let exp2 = [4, 2, 0, 0];

let input3 = [2, 0, 2, 2];
// let exp3 = [4, 2, 0, 0];

let input4 = [4, 2, 4, 4];
let exp4 = [4, 2, 8, 0];

let input5 = [4, 4, 8, 0];
let exp5 = [8, 8, 0, 0];
console.log(test(input1));
console.log(test(input2));
console.log(test(input3));
console.log(test(input4));
console.log(test(input5));
