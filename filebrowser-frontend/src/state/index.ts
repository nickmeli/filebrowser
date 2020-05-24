import { createStore, combineReducers, applyMiddleware } from "redux";
import { all, fork } from "redux-saga/effects";
import {
	Action,
	PayloadAction,
	TypeConstant
} from "typesafe-actions";
import { folderContentsReducer } from "./folder-contents/folder-contents.reducers";
import folderContetnsSaga from "./folder-contents/folder-contents.saga";
import { IFolderContentsState } from "./folder-contents/folder-contents.types";
import { rootFoldersReducer } from "./root-folders/root-folder.reducers";
import rootFoldersSaga from "./root-folders/root-folder.saga";
import { IRootFoldersState } from "./root-folders/root-folder.types";
import { viewTypeReducer } from "./view-type/view-type.reducers";
import viewTypeSaga from "./view-type/view-type.saga";
import { IViewTypeState } from "./view-type/view-type.types";
import sagaMiddleware from "./middlewares/sagas";
import { IFilterState } from "./files-filter/files-filter.types";
import { fileFilterReducer } from './files-filter/files-filter.reducers';
import { ISelectedFolderState } from "./selected-folder/selected-folder.types";
import { selectedFolderReducer } from './selected-folder/selected-folder.reducers';
import { IDownloadState } from "./download-file/download-file.types";
import { downloadReducer } from './download-file/download-file.reducers';
import downloadSaga from './download-file/download-file.saga';
import { reducer as notifications } from 'react-notification-system-redux';

interface IMeta {
	method: 'get' | 'post';
    route: string;
    data: any;
}

export declare type MetaAction<TType extends TypeConstant, TMeta> = {
    type: TType;
    meta: TMeta;
};

// The top-level state object
export interface IApplicationState {
    contents: IFolderContentsState;
    folders: IRootFoldersState;
    viewType: IViewTypeState;
    filter: IFilterState;
    selectedFolder: ISelectedFolderState;
    download: IDownloadState;
    notifications: any;
}

export interface IMetaAction extends MetaAction<TypeConstant, IMeta> {}

export interface IReducerAction<TPayload> extends Action<TypeConstant>, PayloadAction<TypeConstant, TPayload> {}

export const rootReducer = combineReducers<IApplicationState>({
    contents: folderContentsReducer,
    folders: rootFoldersReducer,
    viewType: viewTypeReducer,
    filter: fileFilterReducer,
    selectedFolder: selectedFolderReducer,
    download: downloadReducer,
    notifications: notifications,
});

export function* rootSaga() {
	yield all([fork(folderContetnsSaga), fork(rootFoldersSaga), fork(viewTypeSaga), fork(downloadSaga)]);
}

const middlewares = applyMiddleware(sagaMiddleware);
// Create Store
export const store = createStore(rootReducer, {}, middlewares);
sagaMiddleware.run(rootSaga);

