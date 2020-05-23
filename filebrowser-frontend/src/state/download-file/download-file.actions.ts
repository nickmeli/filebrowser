import { action } from "typesafe-actions";
import { DownloadActionTypes } from "./download-file.types";

export const downloadStarted = (path: string, filename: string) =>
    action(DownloadActionTypes.DOWNLOAD_STARTED, [], {
        route: '/file',
        data: {
            path,
            filename
        }
    });

export const downloadFinished = () =>
    action(DownloadActionTypes.DOWNLOAD_FINISHED, []);
