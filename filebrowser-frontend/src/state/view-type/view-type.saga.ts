import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { IMetaAction } from "..";
import { setViewtype } from "./view-type.actions";
import { ViewTypeActionTypes } from "./view-type.types";

/**
 * @desc Business logic of effect.
 */
function* handleFetch(action: IMetaAction): Generator {
	try {
        yield put(setViewtype(action.meta.data.viewType));
	} catch (err) {
		
	}
}

/**
 * @desc Watches every specified action and runs effect method and passes action args to it
 */
function* watchFetchRequest(): Generator {
    yield takeEvery(ViewTypeActionTypes.CALL_VIEW_TYPE, handleFetch);
}

/**
 * @desc saga init, forks in effects, other sagas
 */
export default function* viewTypeSaga() {
	yield all([fork(watchFetchRequest)]);
}