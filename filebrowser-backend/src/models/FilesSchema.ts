import { ReadStream } from "fs";

export interface IFolder {
    foldername: string;
    folderpath: string;
    subfolders?: IFolder[];
}

export interface IFile {
    id: number;
    filename: string;
    filepath: string;
    filesize: any;
    filetype: string;
}

export interface IFileStream {
    size: number;
    stream: ReadStream;
}