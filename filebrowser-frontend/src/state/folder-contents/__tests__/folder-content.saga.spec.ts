import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { serverApi } from "../../providers/serverApi";
import { fetchFolderContents, fetchFolderContentsByFolder, fetchFolderContentsSuccess, fetchFolderContentsFailure } from "../folder-contents.actions";
import folderContetnsSaga from "../folder-contents.saga";
import * as content from './__mock-data__/content.json';
import { IFetchContentsResponse } from "../../../shared/models/ServereResponseSchema";

describe("folder content saga", () => {
	it("should handle successfully fetching content", () => {
		return (
			expectSaga(folderContetnsSaga)
				.provide([[matchers.call.fn(serverApi), content]])
				.put(fetchFolderContentsSuccess(content as IFetchContentsResponse[]))
				.dispatch(fetchFolderContents())
				.run()
		);
    });
    
    it("should handle successfully fetching folder content", () => {
        const path: string = '/path/to/contents';
		return (
			expectSaga(folderContetnsSaga)
				.provide([[matchers.call.fn(serverApi), content]])
				.put(fetchFolderContentsSuccess(content as IFetchContentsResponse[]))
				.dispatch(fetchFolderContentsByFolder(path))
				.run()
		);
	});
});