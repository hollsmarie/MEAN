import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // hero: Hero = { //refactored the Component's hero property to be a type of Hero, initialized it with an id of 1 and name of Windstorm
  //   id: 1,
  //   name: 'Windstorm'

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

getHeroes(): void {
  this.heroService.getHeroes()
  .subscribe(heroes => this.heroes = heroes); //adjusted to match the new hero service method; waits for the observable to emit the array of heroes then the subscribe passes the emitted array to the callback
} 

}
