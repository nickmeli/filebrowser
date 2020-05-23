import { action } from "typesafe-actions";
import { FilterActionTypes } from "./files-filter.types";

export const fileFilterChanged = (filter: string) =>
    action(FilterActionTypes.FILTER_CHANGED, [], {
        data: {
            filter
        }
    });

export const fileFilterDispached = (data: string) =>
    action(FilterActionTypes.FILTER_DISPACHED, data);

export const filterFileTypeChanged = (data: string) =>
    action(FilterActionTypes.FILTER_TYPE_CHANGED, data);