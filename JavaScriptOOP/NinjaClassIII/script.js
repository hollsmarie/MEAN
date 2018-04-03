class Ninja {
    contructor(name){
        this.name = name;
        this.health = 100;
        this.strength = 3;
        this.speed = 3;
    }
    sayName(){
        console.log(this.name)
    }
    showStats(){//This should show the Ninja's Strength and Speed, as well as their health.
        console.log(this.strength)
        console.log(this.speed)
        console.log(this.health)
    }
    drinkSake(){//This should add +10 Health to the Ninja
        this.health +=10;
        console.log(this.health)
    }
}

class Sensei extends Ninja {
    constructor(name){
        //this.name = name;
        super (name);
        this.health = 200;
        this.speed = 10;
        this.strength = 10;
        this.wisdom = 10;

    }
    speakWisdom() {
        super.drinkSake();
        console.log("You have made minimal progress. But minimal progress is still progress.")
    }
}






//Extend the Ninja class and create the Sensei class. 
//A Sensei should have 200 Health, 10 speed, and 10 strength by default. 
//In addition, a Sensei should have a new attribute called wisdom, and the default should be 10. 
//Finally, add the speakWisdom() method. speakWisdom() should call the drinkSake() method from the Ninja class, 
//before console.logging a wise message.