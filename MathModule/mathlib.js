module.exports = function (){
    return {
      add: function(num1, num2) { 
           console.log("the sum is:" , num1 + num2)
      },
      multiply: function(num1, num2) {
          console.log("the product is:", num1 * num2)
      },
      square: function(num) {
          console.log("the square is:", num * num)
      },
      random: function(num1, num2) {
          random = Math.floor(Math.random() * 36)
          console.log("the random number is:", random)
      }
    }
  };