
export interface IDownloadState {
    loading: boolean;
}

export const DownloadActionTypes = {
    DOWNLOAD_STARTED: '@@download/DOWNLOAD_STARTED',
    DOWNLOAD_FINISHED: '@@download/DOWNLOAD_FINISHED'
};