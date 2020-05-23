import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { IMetaAction } from "..";
import { fileFilterDispached } from "./files-filter.actions";
import { FilterActionTypes } from "./files-filter.types";

/**
 * @desc Business logic of effect.
 */
function* handleFetch(action: IMetaAction): Generator {
	try {
        yield put(fileFilterDispached(action.meta.data.viewType));
	} catch (err) {
		
	}
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
    yield takeEvery(FilterActionTypes.FILTER_CHANGED, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* viewTypeSaga() {
	yield all([fork(watchFetchRequest)]);
}