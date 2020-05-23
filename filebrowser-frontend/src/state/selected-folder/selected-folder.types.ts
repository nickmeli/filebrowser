import { IRootFolderResponse } from '../../shared/models/ServereResponseSchema';

export interface ISelectedFolderState {
    readonly selectedFolder: IRootFolderResponse | null;
}

export const SelectedFolderActionTypes = {
    FOLDER_SELECTED: '@@selected-folder/FOLDER_SELECTED'
};