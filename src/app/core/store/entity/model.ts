import * as R from 'ramda';

// Life-Event states
class Fetching {
  constructor(public timeStamp = Date.now()) {}
}

class Refreshing {
  constructor(public timeStamp = Date.now()) {}
}

class Success {
  constructor(public timeStamp = Date.now()) {}
}

class Fail {
  constructor(public timeStamp = Date.now(), public reason: {[key: string]: string}) {}
}

type LifeEvent = Fetching | Refreshing | Success | Fail;

interface Page {
  lifeEvent: LifeEvent;
  entities: string[];
}

interface PagedResults {
  pages: {[index: number]: Page };
  count: number;
}

interface CurrentPaginationState {
  searchQuery: string;
  pageNumber: number;
}

export interface PaginatedEntity<T> {
  pagination: {[queryString: string]: PagedResults};
  entities: {[id: string]: T};
  recentState?: CurrentPaginationState;
}

export interface PaginateResults<T> {
  totalCount: number;
  entities: T[];
  pageIndex: number;
}

// utility
const dictFromList = R.indexBy(R.prop('id'));

// lenses
const pageLens = (queryString: string, pageIndex: number) => R.lensPath(['pagination', queryString, 'pages', pageIndex]) as any; 
const pageLifeEventLens = (lens: R.Lens) => R.compose(lens, R.lensProp('lifeEvent')) as R.Lens;

const entitiesLens = R.lensProp('entities');
const totalCountLens = R.lensProp('totalCount');

export function createEntityAdapter<T>() {
  const blankPage = (): Page => ({
    lifeEvent: new Fetching(),
    entities: []
  });

  type PaginatedEntityTransform = (x: PaginatedEntity<T>) => PaginatedEntity<T>;

  function fetchPage(queryString: string, pageNumber: number, state: PaginatedEntity<T>): PaginatedEntity<T> {
    const basePageLens = pageLens(queryString, pageNumber);
    const lifeEventLens = R.compose(basePageLens, R.lensProp('lifeEvent')) as R.Lens;

    const freshenPage = R.ifElse(
       R.pipe(R.view(lifeEventLens), R.isNil),
       R.set(basePageLens, blankPage),
       R.set(lifeEventLens, new Refreshing())
    ) as PaginatedEntityTransform;

    const pipeline = R.pipe(
      freshenPage
    );

    return pipeline(state);
  }

  function fetchPageSuccess(queryString: string, results: PaginateResults<T>, state: PaginatedEntity<T>): PaginatedEntity<T> {
    const pageIndex = results.pageIndex;
    const totalCount = results.totalCount;
    const basePageLens = pageLens(queryString, pageIndex);
    const entityIds = R.map(R.prop('id'), results.entities);
    const entityDict = dictFromList(results.entities);

    const setEntities = R.over(
      entitiesLens,
      R.merge(R.__, entityDict),
    ) as PaginatedEntityTransform;

    const setTotalCount = R.set(
      totalCountLens,
      totalCount,
    ) as PaginatedEntityTransform;

    const entityIdsLens = R.compose(basePageLens, R.lensProp('entities')) as R.Lens;
    const setPageEntityIds = R.set(
      entityIdsLens,
      entityIds
    ) as PaginatedEntityTransform;

    const setLifeEvent = R.set(
      pageLifeEventLens(basePageLens),
      new Success()
    ) as PaginatedEntityTransform;

    const pipeline = R.pipe(
      setEntities,
      setTotalCount,
      setPageEntityIds,
      setLifeEvent
    );

    return pipeline(state);
  }

  return {
    fetchPage,
    fetchPageSuccess
  };
}
