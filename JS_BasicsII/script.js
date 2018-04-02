function magic_multiply(x,y){
    // --- your code here ---
    if(x == 0, y == 0)
    {
        return ("All inputs 0");
    }

    else if(typeof(x) === "string" && typeof(y) === "number")
    {
        for(let i = 0; i < y; i++)
        {
            console.log(x);
        }
        return ("Passed")

    }

    else if(typeof(x) === Number || typeof(y) === "string")
    {
        return ("Cannot multiply a number and a string")

    }

    else if(x instanceof Array && typeof(y) === "number")
    {
        var newArr =[];
        for(var i =0; i < x.length; i++)
        {
            newArr.push(x[i] * y);
        }
        return newArr;
    }

    else {
        return x * y;
    }  

}

let test5 = magic_multiply("Brendo", 4);
console.log(test5);
//test passed


let test4 = magic_multiply(7, "three");
console.log(test4);
//test passed

let test3 = magic_multiply([1, 2, 3], 2);
console.log(test3);
//test passed

let test2 = magic_multiply(0, 0);
console.log(test2);
//test passed

let test1 = magic_multiply(5, 2);
console.log(test1);
//test passed
