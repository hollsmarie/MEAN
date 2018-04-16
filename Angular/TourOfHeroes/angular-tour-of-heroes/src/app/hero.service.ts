import { Injectable } from '@angular/core';
import { Hero } from './heroes/hero';
import { HEROES } from './mock-heroes';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'; //simulate getting the data from the server
import { MessageService } from './message.service'; //imports the message service


@Injectable() //tells Angular that this service might itself have injected dependencies 
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes'); 
    return of(HEROES);//of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of (HEROES.find(hero => hero.id === id));
  }

}

