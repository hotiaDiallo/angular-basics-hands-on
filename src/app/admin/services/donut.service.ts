import { Injectable } from '@angular/core';
import { Donut } from '../models/donut.model';
import { HttpClient } from '@angular/common/http';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonutService {

  private donuts: Donut[] = [];

  constructor(private http: HttpClient) { }

  read() {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    return this.http.get<Donut[]>(`/api/donuts`)
      .pipe(
        tap(donuts => this.donuts = donuts)
      );
  }

  /* readOne(id: string) {
    const donut = this.read().find((donut: Donut) => donut.id === id);

    if (donut) {
      return donut;
    }
    return { name: '', price: 0, icon: '', description: '' }
  } */

  create(payload: Donut) {
    this.donuts = [...this.donuts, payload];
    console.log(this.donuts);
  }

  update(payload: Donut) {
    this.donuts = this.donuts.map((donut: Donut) => {
      if (donut.id === payload.id) {
        return payload;
      }
      return donut;
    })
    console.log(this.donuts);
  }

  delete(payload: Donut) {
    this.donuts = this.donuts.filter((donut: Donut) => donut.id !== payload.id)
    console.log(this.donuts);
  }


}
