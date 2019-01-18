import * as R from 'ramda'

export const pristineLifeEventState = () => ({ lifeEvent: new Pristine() })
const lifeEventLens = R.lensProp('lifeEvent')

export interface HttpError {
    code: number
    reason?: string | object
}

export class Pristine { }

export class Fetching {
    constructor(public timeStamp = Date.now()) { }
}

export class Refreshing {
    constructor(public timeStamp = Date.now()) { }
}

export class Success {
    constructor(public timeStamp = Date.now()) { }
}
type ErrorReason = Map<string, string>

export class Fail {
    constructor(public reason: ErrorReason, public timeStamp = Date.now()) { }
}

export type LifeEvent = Pristine | Fetching | Refreshing | Success | Fail

export interface LifeEventState {
    lifeEvent: LifeEvent
}
const setFetching = R.set(lifeEventLens, new Fetching())
const setSuccess = R.set(lifeEventLens, new Success())
const setRefreshing = R.set(lifeEventLens, new Refreshing())
const setFailure = (reasons: ErrorReason) => R.set(lifeEventLens, new Fail(reasons))

export const update = {
    setFetching,
    setSuccess,
    setRefreshing,
    setFailure
}
