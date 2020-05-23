import { IFetchContentsResponse } from "../../shared/models/ServereResponseSchema";

export interface IFolderContentsState {
	readonly contents: IFetchContentsResponse[];
	readonly loading: boolean;
	readonly errors: [];
}

export const FolderContentsActionTypes = {
    FETCH_CONTENTS: "@@folder_contents/FETCH_CONTENTS",
    FETCH_CONTENTS_FOLDER: "@@folder_contents/FETCH_CONTENTS_FOLDER",
	FETCH_CONTENTS_SUCCESS: "@@folder_contents/FETCH_CONTENTS_SUCCESS",
	FETCH_CONTENTS_FAILURE: "@@folder_contents/FETCH_CONTENTS_FAILURE"
};