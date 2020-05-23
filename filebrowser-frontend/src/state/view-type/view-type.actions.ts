import { action } from 'typesafe-actions';
import { ViewTypeActionTypes } from './view-type.types';

export const callViewType = (viewType: string) => 
    action(ViewTypeActionTypes.CALL_VIEW_TYPE, [], {
        data: {
            viewType
        }
    })

export const setViewtype = (viewType: string) => 
    action(ViewTypeActionTypes.SET_VIEW_TYPE, viewType);
