import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Breed } from './models';

@Injectable({
    providedIn: 'root'
})
export class BreedService {
    url = 'https://dog.ceo/api/breeds/list/all'

    constructor(public http: HttpClient) {}

    fetchAllBreeds(): Observable<Breed[]> {
        return this.http.get<Breed[]>(this.url)
    }
}
