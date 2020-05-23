import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { IMetaAction } from "..";
import { downloadFinished } from "./download-file.actions";
import { DownloadActionTypes } from "./download-file.types";
import { apiDownloadFile } from "../providers/serverApi";

/**
 * @desc Business logic of effect.
 */
function* handleFetch(action: IMetaAction): Generator {
	try {
		const res: any = yield call(
			apiDownloadFile,
            action.meta.route,
            action.meta.data,
        );
        
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', action.meta.data.filename);
        document.body.appendChild(link);
        link.click();

		yield put(downloadFinished());
	} catch (err) {
		yield put(downloadFinished());
	}
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
    yield takeEvery(DownloadActionTypes.DOWNLOAD_STARTED, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* downloadSaga() {
	yield all([fork(watchFetchRequest)]);
}