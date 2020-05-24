import { IRootFolderResponse } from '../../shared/models/ServereResponseSchema';

export interface IRootFoldersState {
	readonly folders: IRootFolderResponse[];
	readonly loading: boolean;
    readonly errors: [];
    readonly rootFolderPath: string;
    readonly showSetDialog: boolean;
}

export const RootFoldersActionTypes = {
	FETCH_ROOT_FOLDERS: '@@root_folders/FETCH_ROOT_FOLDERS',
	FETCH_ROOT_FOLDERS_SUCCESS: '@@root_folders/FETCH_ROOT_FOLDERS_SUCCESS',
    FETCH_ROOT_FOLDERS_FAILURE: '@@root_folder/FETCH_ROOT_FOLDERS_FAILURE',
    
    CALL_SET_ROOT_FOLDER: '@@root_folders/CALLSET_ROOT_FOLDER',
    SET_ROOT_FOLDER: '@@root_folders/SET_ROOT_FOLDER',

    SET_DIALOG: '@@root_folders/SET_DIALOG',
    SET_DIALOG_OPEN: '@@root_folders/SET_DIALOG_OPEN',
    SET_DIALOG_CLOSE: '@@root_folders/SET_DIALOG_CLOSE',
};