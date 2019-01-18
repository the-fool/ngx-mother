import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { Breed } from './models'

export interface State extends EntityState<Breed> {}

export const adapter = createEntityAdapter<Breed>()
export const initialState = adapter.getInitialState()

export function reducer(state = initialState, action) {
    switch (action.type) {
        default: {
            return state
        }
    }
}
