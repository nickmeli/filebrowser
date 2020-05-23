import { action } from 'typesafe-actions';
import { SelectedFolderActionTypes } from './selected-folder.types';
import { IRootFolderResponse } from '../../shared/models/ServereResponseSchema';

export const folderSelected = (data: IRootFolderResponse) => 
    action(SelectedFolderActionTypes.FOLDER_SELECTED, data);
