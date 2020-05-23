
export interface IFilterState {
    readonly filter: string;
    readonly type: string;
}

export const FilterActionTypes = {
    FILTER_CHANGED: '@@filter/FILTER_CHANGED',
    FILTER_DISPACHED: '@@filter/FILTER_DISPACHED',

    FILTER_TYPE_CHANGED: '@@filter/TYPE_CHANGED'
};