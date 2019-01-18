import { Action } from '@ngrx/store'
import { Breed } from './models'
import { HttpError } from '../misc'

export enum BreedActionTypes {
    Fetch = '[Breeds] Fetch',
    FetchSuccess = '[Breeds] Fetch Success',
    FetchFailure = '[Breeds] Fetch Failure'
}

export class Fetch implements Action {
    readonly type = BreedActionTypes.Fetch
}

export class FetchSuccess implements Action {
    readonly type = BreedActionTypes.FetchSuccess
    constructor(public payload: Breed[]) {}
}

export class FetchFailure implements Action {
    readonly type = BreedActionTypes.FetchFailure
    constructor(public payload: HttpError) {}
}

export type BreedActions
    = Fetch
    | FetchSuccess
    | FetchFailure
