import { Action } from '@ngrx/store'
import { Breed } from './models';

export class Fetch implements Action {
    readonly type = '[Breeds] Fetch'
}

export class FetchSuccess implements Action {
    readonly type = '[Breeds] Fetch Success'
    constructor(public payload: Breed[]) {}
}

