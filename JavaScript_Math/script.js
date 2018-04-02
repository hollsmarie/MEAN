// Math 1
// Write a function called zero_negativity(). 
// This function should take an array. 
// Return true if the input array contains no negative numbers, return false if it does.

// function zero_negativity(arr)
// {
//     for(var i = 0; i< arr.length; i++)
//     {
//         if(arr[i] < 0)
//         {
//             return false;
//         }
//     }
//     return true;
// }

// zero_negativity([-11, 2, 3])

// Math 2
// Write a function called is_even(). 
// This function should take a number. 
// Return true if the input number is even, return false if the number is odd.

// function is_even(num)
// {
//     if(num % 2 == 0)
//     {
//         return true;
//     }
//     else
//     {
//         return false;
//     }

// }

// is_even(23)

// Math 3
// Write a function called how_many_even(). 
// This function should take an array. 
// Return the total number of elements in the array that are even. 
// You may call is_even() to solve this.

// function how_many_even(arr)
// {
//     var count = 0
//     for(var i=0; i<arr.length; i++)
//     {
//         if(arr[i] % 2 == 0)
//         count ++;
//     }
//     return count;

// }

// how_many_even([10,2,3,6])


// Math 4
// Write a function called create_dummy_array(). 
// This function should take a number n. 
// Return an array of random numbers between 0 and 9 with the length of n.


// function create_dummy_array(n)
// {
//     var newArr = [];
//     var i = 0
//     while (i<n)
//     {
//         x = Math.floor(Math.random() * 10);
//         newArr.push(x);
//         i++
//     }
//    return newArr;

// }
// create_dummy_array(3)


// Math 5
// Write a function called random_choice(). 
// This function should take an array. 
// Return a random element of the array, based on its length. 
// This function should never return undefined.

function random_choice(arr)
{
    var random = Math.floor(Math.random()*(arr.length));
    return(arr[random])   
}

random_choice([7,3,4,6,2])