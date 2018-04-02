
//Part I
function starString(num)
{
    let stars = "";
    while(num > 0)
    {
        stars = stars + "*"
        num --;
    }
    return stars;
}
starString(8);

//Part II
function drawStars(arr)
{
    for(var i =0; i< arr.length; i++)
    {
        let star = "";
        while (arr[i] > 0)
        {
            star = star + "*";
            arr[i] --;
        }
        console.log(star);
    }
}
drawStars([4, 6, 1, 3, 5, 7, 25]);

//Part III
function drawMoreStars(arr)
{
    for(var i = 0; i <arr.length; i++)
    {
        if(typeof arr[i] == "number")
        {
            let star = "";
            while (arr[i] > 0)
                {
                star = star + "*"
                arr[i] --;
                }
            console.log(star);
        }
        else if(typeof arr[i] == "string")
        {
            let star = "";
            let string = arr[i].length;
            while(string > 0)
            {
                star = star + arr[i][0];
                string --;
            }
          console.log(star.toLowerCase());
        }
    }

}
drawMoreStars([4, "Tom", 1, "Michael", 5, 7, "Jimmy Smith"]);