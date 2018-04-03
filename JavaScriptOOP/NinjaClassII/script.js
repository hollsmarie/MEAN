
        function NinjaCreator (name) {
            this.name = name;
            this.health = 100;
            const speed = 3;
            const strength = 3;
            
            this.drinkSake = function(){
                this.health += 10;
            }
            this.sayName = function(){
                console.log(this.name)
            }
            this.showStats = function(){
                console.log(strength);
                console.log(speed);
                console.log(this.health);
            }
        }

        this.punch = function(ninja){
            if (ninja instanceof Ninja)
            {
            this.health -= 5;
            console.log (ninja.name + "was punched by" + this.name + "and lost 5 health points")
            }
        }

        this.kick = function(ninja){
            if (ninja instanceof Ninja)
            {
                while (this.strength > 0){
                    this.health -= 15;
                }
                console.log (ninja.name + "was kicked by" + this.name + "and now has a health score of" + this.health)
    

            }
        }


holly = new NinjaCreator("holly");
holly.sayName();
holly.showStats();
holly.drinkSake();
