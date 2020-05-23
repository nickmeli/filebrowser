import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { IFolder, IFile, IFileStream } from '../models/FilesSchema';

@Injectable()
export class FsService {
    getFolderTree(rootPath: string): IFolder[] {
        const contents = this.getFolderFolders(rootPath);
        return contents ? contents : [];
    }

    getFiles(rootPath: string): IFile[] {
        const contents = fs.readdirSync(rootPath, { withFileTypes: true }).filter(f => f.isFile());
        let index: number = 1;
        return contents ? contents.map(f => {
            return {
                id: index++,
                filename: f.name,
                filepath: path.join(rootPath, f.name),
                filesize: fs.statSync(path.join(rootPath, f.name)).size,
                filetype: path.extname(path.join(rootPath, f.name)).replace('.', '')
            }
        })
            : [];
    }

    getFileStream(filePath: string): IFileStream {
        if (!fs.existsSync(filePath)) {
            return null;
        }

        return {
            size: fs.statSync(filePath).size,
            stream: fs.createReadStream(filePath)
        };
    }

    private getFolderFolders(currentPath: string): IFolder[] {
        const contents = fs.readdirSync(currentPath, { withFileTypes: true }).filter(f => f.isDirectory());
        return contents && contents.length > 0
            ? contents.map((f) => {
                return {
                    foldername: f.name,
                    folderpath: path.join(currentPath, f.name),
                    subfolders: this.getFolderFolders(path.join(currentPath, f.name))
                }
            })
            : null;
    }
}