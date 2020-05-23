import { action } from "typesafe-actions";
import { FolderContentsActionTypes } from "./folder-contents.types";
import { IFetchContentsResponse } from "../../shared/models/ServereResponseSchema";

export const fetchFolderContents = () =>
    action(FolderContentsActionTypes.FETCH_CONTENTS, [], {
        method: "get",
        route: "/fetchfoldercontents"
    });

export const fetchFolderContentsByFolder = (folderpath: string) =>
    action(FolderContentsActionTypes.FETCH_CONTENTS_FOLDER, [], {
        method: "post",
        route: "/fetchfoldercontents",
        data: { folderpath }
    });

export const fetchFolderContentsSuccess = (data: IFetchContentsResponse[]) =>
    action(FolderContentsActionTypes.FETCH_CONTENTS_SUCCESS, data);

export const fetchFolderContentsFailure = (message: string) =>
    action(FolderContentsActionTypes.FETCH_CONTENTS_FAILURE, message);