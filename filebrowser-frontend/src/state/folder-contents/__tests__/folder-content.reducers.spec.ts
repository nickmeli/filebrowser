  
import { fetchFolderContents, fetchFolderContentsByFolder, fetchFolderContentsSuccess, fetchFolderContentsFailure } from "../folder-contents.actions";
import { initialState, folderContentsReducer } from "../folder-contents.reducers";
import * as content from './__mock-data__/content.json';
import { IFetchContentsResponse } from "../../../shared/models/ServereResponseSchema";

describe("post reducer", () => {
	it("should return initial state", () => {
		expect(
			folderContentsReducer(initialState, { type: "no type", payload: [] })
		).toEqual(initialState);
	});
	it("should handle fetching all contents", () => {
		expect(folderContentsReducer(initialState, fetchFolderContents())).toEqual({
			...initialState,
			loading: true
		});
    });
    it("should handle fetching all contents", () => {
        const path: string = '/path/to/contents';
		expect(folderContentsReducer(initialState, fetchFolderContentsByFolder(path))).toEqual({
			...initialState,
			loading: true
		});
	});
	it("should handle all data successfully fetch contents", () => {
		expect(folderContentsReducer(initialState, fetchFolderContentsSuccess(content as IFetchContentsResponse[]))).toEqual({
			...initialState,
			contents: content
		});
    });
});