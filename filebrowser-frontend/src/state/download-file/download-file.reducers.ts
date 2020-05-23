import { Action, PayloadAction, TypeConstant } from "typesafe-actions";
import { IDownloadState, DownloadActionTypes } from "./download-file.types";

export const initialState: IDownloadState = {
    loading: false
};

export const downloadReducer = (
	state: IDownloadState = initialState,
	action: Action<TypeConstant> & PayloadAction<TypeConstant, string>
): IDownloadState => {
	switch (action.type) {
		case DownloadActionTypes.DOWNLOAD_STARTED: {
			return { loading: true };
        }
        case DownloadActionTypes.DOWNLOAD_FINISHED: {
            return { loading: false };
        }
		default:
			return { loading: false };
	}
};