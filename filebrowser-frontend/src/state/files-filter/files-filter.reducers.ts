import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import { IFilterState, FilterActionTypes } from "./files-filter.types";

export const initialState: IFilterState = {
    filter: '',
    type: '',
};

export const fileFilterReducer = (
	state: IFilterState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, string>
): IFilterState => {
	switch (action.type) {
		case FilterActionTypes.FILTER_DISPACHED: {
			return { ...state, filter: action.payload };
        }
        case FilterActionTypes.FILTER_TYPE_CHANGED: {
            return { ...state, type: action.payload }
        }
		default:
			return state;
	}
};