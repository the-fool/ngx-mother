import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Breed } from './models'
import { BreedActions, BreedActionTypes } from './actions';
import { LifeEventState, Pristine, update} from '../misc';
export interface State extends EntityState<Breed>, LifeEventState {}

export const adapter = createEntityAdapter<Breed>()

export const initialState = adapter.getInitialState({
    lifeEvent: new Pristine()
})

export function reducer(state = initialState, action: BreedActions) {
    switch (action.type) {

        case BreedActionTypes.Fetch: {
            return update.setFetching(state)
        }
        default: {
            return state
        }
    }
}
