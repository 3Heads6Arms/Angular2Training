import { Hero } from './hero';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HeroService {
    private heroesUrl = 'app/heroes';
    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        return this.http
            .get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 2000))
            .then(() => this.getHeroes());
    }

    getHero(id: number) {
        return this
            .getHeroes()
            .then(heroes => heroes.find(hero => hero.id === id));
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    insert(name: string): Promise<Hero>{
        const url = `${this.heroesUrl}`;
        let hero: Hero = new Hero();
        // todo:
        return this.http.post(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Hero)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
