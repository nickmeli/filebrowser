import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import { IRootFolderResponse } from "../../shared/models/ServereResponseSchema";
import { ISelectedFolderState, SelectedFolderActionTypes } from "./selected-folder.types";

export const initialState: ISelectedFolderState = {
    selectedFolder: null
};

export const selectedFolderReducer = (
	state: ISelectedFolderState = initialState,
    action: Action<TypeConstant>
            & PayloadAction<TypeConstant, IRootFolderResponse>
): ISelectedFolderState => {
	switch (action.type) {
		case SelectedFolderActionTypes.FOLDER_SELECTED: {
			return { selectedFolder: action.payload };
		}
		default:
			return state;
	}
};