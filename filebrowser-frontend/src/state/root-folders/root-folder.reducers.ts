import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import { IRootFolderResponse } from "../../shared/models/ServereResponseSchema";
import { IRootFoldersState, RootFoldersActionTypes } from "./root-folder.types";

export const initialState: IRootFoldersState = {
	folders: [],
	errors: [],
    loading: false,
    rootFolderPath: '',
    showSetDialog: false,
};

export const rootFoldersReducer = (
	state: IRootFoldersState = initialState,
    action: Action<TypeConstant>
            & PayloadAction<TypeConstant, IRootFolderResponse[]>
            & PayloadAction<TypeConstant, string>
            & PayloadAction<TypeConstant, boolean>
): IRootFoldersState => {
	switch (action.type) {
		case RootFoldersActionTypes.FETCH_ROOT_FOLDERS: {
			return { ...state, loading: true };
		}
		case RootFoldersActionTypes.FETCH_ROOT_FOLDERS_SUCCESS: {
			return { ...state, loading: false, folders: action.payload };
		}
		case RootFoldersActionTypes.FETCH_ROOT_FOLDERS_FAILURE: {
			return {
				...state
			};
        }
        case RootFoldersActionTypes.SET_ROOT_FOLDER: {
            return { ...state, rootFolderPath: action.payload, };
        }
        case RootFoldersActionTypes.SET_DIALOG_OPEN: {
            return { ...state, showSetDialog: action.payload };
        }
        case RootFoldersActionTypes.SET_DIALOG_CLOSE: {
            return { ...state, showSetDialog: action.payload };
        }
		default:
			return state;
	}
};