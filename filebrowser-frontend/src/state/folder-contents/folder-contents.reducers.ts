import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import { IFetchContentsResponse } from "../../shared/models/ServereResponseSchema";
import { IFolderContentsState, FolderContentsActionTypes } from "./folder-contents.types";

export const initialState: IFolderContentsState = {
	contents: [],
	errors: [],
	loading: false
};

export const folderContentsReducer = (
	state: IFolderContentsState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, IFetchContentsResponse[]>
): IFolderContentsState => {
	switch (action.type) {
		case FolderContentsActionTypes.FETCH_CONTENTS:
		case FolderContentsActionTypes.FETCH_CONTENTS_FOLDER: {
			return { ...state, loading: true };
		}
		case FolderContentsActionTypes.FETCH_CONTENTS_SUCCESS: {
			return { ...initialState, contents: action.payload };
		}
		case FolderContentsActionTypes.FETCH_CONTENTS_FAILURE: {
			return {
				...state, loading: false
			};
		}
		default:
			return state;
	}
};