import { action } from 'typesafe-actions';
import { RootFoldersActionTypes } from './root-folder.types';
import { IRootFolderResponse } from '../../shared/models/ServereResponseSchema';

export const fetchRootFolders = (path: string) =>
	action(RootFoldersActionTypes.FETCH_ROOT_FOLDERS, [], {
		method: 'post',
        route: '/fetchrootfolders',
        data: {
            path
        }
    });
    
export const fetchRootFoldersSuccess = (data: IRootFolderResponse[]) =>
    action(RootFoldersActionTypes.FETCH_ROOT_FOLDERS_SUCCESS, data);
    
export const fetchRootFoldersFailure = (message: string) =>
    action(RootFoldersActionTypes.FETCH_ROOT_FOLDERS_FAILURE, message);
    
export const callSetRootFolderPath = (data: string) => 
    action(RootFoldersActionTypes.CALL_SET_ROOT_FOLDER, [], {
        data: {
            path: data
        }
    });

export const setRootFolderPath = (data: string) => 
    action(RootFoldersActionTypes.SET_ROOT_FOLDER, data);

export const callSetDialog = (show: boolean) => 
    action(RootFoldersActionTypes.SET_DIALOG, [], {
        data: {
            show
        }
    })

export const showSetDialog = (show: boolean) => 
    action(RootFoldersActionTypes.SET_DIALOG_OPEN, show);

export const hideSetDialog = (show: boolean) => 
    action(RootFoldersActionTypes.SET_DIALOG_CLOSE, show);
