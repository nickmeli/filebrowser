export interface IFetchContentsResponse {
    id: number;
    filename: string;
    filepath: string;
    filesize: any;
    filetype: string;
}

export interface IRootFolderResponse {
    id: string;
    foldername: string;
    folderpath: string;
    subfolders?: IRootFolderResponse[];
}