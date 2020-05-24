
import { action } from "typesafe-actions";
import { fetchFolderContents, fetchFolderContentsByFolder, fetchFolderContentsSuccess, fetchFolderContentsFailure } from "../folder-contents.actions";
import { FolderContentsActionTypes } from "../folder-contents.types";
import * as content from './__mock-data__/content.json';
import { IFetchContentsResponse } from "../../../shared/models/ServereResponseSchema";

describe("folder content actions", () => {
	it("should create an action to fetch all contents", () => {
		const expectedAction = action(FolderContentsActionTypes.FETCH_CONTENTS, [], {
			method: "get",
			route: "/fetchfoldercontents"
		});

		expect(fetchFolderContents()).toEqual(expectedAction);
    });
    
    it("should create an action to fetch all contents of a folder", () => {
        const path: string = '/path/to/contents';
		const expectedAction = action(FolderContentsActionTypes.FETCH_CONTENTS_FOLDER, [], {
			method: "post",
            route: "/fetchfoldercontents",
            data: { folderpath: path }
		});

		expect(fetchFolderContentsByFolder(path)).toEqual(expectedAction);
	});

	it("should create an success action", () => {
		const expectedAction = action(
			FolderContentsActionTypes.FETCH_CONTENTS_SUCCESS,
			content
		);

		expect(fetchFolderContentsSuccess(content as IFetchContentsResponse[])).toEqual(expectedAction);
    });
    
    it("should create an failure action", () => {
        const message: string = "Failed to fetch data";
		const expectedAction = action(
			FolderContentsActionTypes.FETCH_CONTENTS_FAILURE,
			message
		);

		expect(fetchFolderContentsFailure(message)).toEqual(expectedAction);
	});
});