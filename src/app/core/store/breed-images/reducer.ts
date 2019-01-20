import { BreedImage } from './models';
import { Pristine, LifeEventState, update } from '../misc';
import { BreedImageActions, BreedImagesActionTypes } from './actions';
import * as R from 'ramda'

type ImageUrl = string

export interface State extends LifeEventState {
    breeds: {
        [breedName: string]: Map<ImageUrl, BreedImage>
    }
}

export const initialState: State = {
    lifeEvent: new Pristine(),
    breeds: {}
}

export function reducer(state = initialState, action: BreedImageActions): State {
    switch (action.type) {
        case BreedImagesActionTypes.Fetch: {
            return update.setFetching(state)
        }

        case BreedImagesActionTypes.FetchSuccess: {
            const imagesByBreed = R.groupBy(R.prop('breed'), action.payload)
            return state
        }
        default: {
            return state
        }
    }
}
