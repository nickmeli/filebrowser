import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import { IViewTypeState, ViewTypeActionTypes } from "./view-type.types";

export const initialState: IViewTypeState = {
	viewType: 'list'
};

export const viewTypeReducer = (
	state: IViewTypeState = initialState,
    action: Action<TypeConstant>
            & PayloadAction<TypeConstant, string>
): IViewTypeState => {
	switch (action.type) {
        case ViewTypeActionTypes.SET_VIEW_TYPE: {
            return { viewType: action.payload };
        }
		default:
			return state;
	}
};