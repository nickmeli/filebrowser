import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { IMetaAction } from "..";
import { serverApi } from "../providers/serverApi";
import { fetchRootFoldersFailure, fetchRootFoldersSuccess, showSetDialog, hideSetDialog, setRootFolderPath, fetchRootFolders } from "./root-folder.actions";
import { RootFoldersActionTypes } from "./root-folder.types";
import { IRootFolderResponse } from "../../shared/models/ServereResponseSchema";

/**
 * @desc Business logic of effect.
 */
function* handleFetch(action: IMetaAction): Generator {
	try {
        if (action.type === RootFoldersActionTypes.SET_DIALOG) {
            if (action.meta.data.show) {
                yield put(showSetDialog(true));
            }
            else {
                yield put(hideSetDialog(false));
            }
        }
        else if (action.type === RootFoldersActionTypes.CALL_SET_ROOT_FOLDER) {
            yield put(setRootFolderPath(action.meta.data.path));
            yield put(fetchRootFolders(action.meta.data.path));
        }
        else {
            const res: IRootFolderResponse[] | any = yield call(
                serverApi,
                action.meta.method,
                action.meta.route,
                action.meta.data
            );
    
            yield put(fetchRootFoldersSuccess(res));
        }
	} catch (err) {
		if (err instanceof Error) {
			yield put(fetchRootFoldersFailure(err.stack!));
		} else {
			yield put(fetchRootFoldersFailure("An unknown error occured."));
		}
	}
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
    yield takeEvery(RootFoldersActionTypes.FETCH_ROOT_FOLDERS, handleFetch);
    yield takeEvery(RootFoldersActionTypes.SET_DIALOG, handleFetch);
    yield takeEvery(RootFoldersActionTypes.CALL_SET_ROOT_FOLDER, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* rootFoldersSaga() {
	yield all([fork(watchFetchRequest)]);
}