import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { IMetaAction } from "..";
import { serverApi } from "../providers/serverApi";
import { fetchFolderContentsFailure, fetchFolderContentsSuccess } from "./folder-contents.actions";
import { FolderContentsActionTypes } from "./folder-contents.types";
import { IFetchContentsResponse } from "../../shared/models/ServereResponseSchema";
import { success, error } from 'react-notification-system-redux';

/**
 * @desc Business logic of effect.
 */
function* handleFetch(action: IMetaAction): Generator {
	try {
		const res: IFetchContentsResponse[] | any = yield call(
			serverApi,
			action.meta.method,
            action.meta.route,
            action.meta.data,
		);

		yield put(fetchFolderContentsSuccess(res));const notificationOpts = {
			title: 'Folder contents',
			message: 'Folder contents retrieved successfully',
			autoDismiss: 5,
		};
		yield put(success(notificationOpts));
	} catch (err) {
		const notificationOpts = {
            title: 'Folder contents load error',
            message: '',
            autoDismiss: 5,
        };
		if (err instanceof Error) {
			yield put(fetchFolderContentsFailure(err.stack!));
			notificationOpts.message = (err as Error).message;
		} else {
			yield put(fetchFolderContentsFailure("An unknown error occured."));
			notificationOpts.message = 'An unknown error occured.';
		}
		yield put(error(notificationOpts));
	}
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
    yield takeEvery(FolderContentsActionTypes.FETCH_CONTENTS, handleFetch);
    yield takeEvery(FolderContentsActionTypes.FETCH_CONTENTS_FOLDER, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* folderContetnsSaga() {
	yield all([fork(watchFetchRequest)]);
}