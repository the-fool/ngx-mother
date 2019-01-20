import { Action } from '@ngrx/store'
import { BreedImage } from './models'
import { HttpError } from '../misc'

export enum BreedImagesActionTypes {
    Fetch = '[Breed Images] Fetch',
    FetchSuccess = '[Breed Images] Fetch Success',
    FetchFailure = '[Breed Images] Fetch Failure'
}

export class Fetch implements Action {
    readonly type = BreedImagesActionTypes.Fetch
}

export class FetchSuccess implements Action {
    readonly type = BreedImagesActionTypes.FetchSuccess
    constructor(public payload: BreedImage[]) {}
}

export class FetchFailure implements Action {
    readonly type = BreedImagesActionTypes.FetchFailure
    constructor(public payload: HttpError) {}
}

export type BreedImageActions
    = Fetch
    | FetchSuccess
    | FetchFailure
