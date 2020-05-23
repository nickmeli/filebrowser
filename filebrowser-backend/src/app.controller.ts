import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { rootFolders } from './data/root-foders';
import { folderContents } from './data/folder-contents';
import * as fs  from 'fs';
import * as path from 'path';
import { FsService } from './providers/fs.service';
import { IFile, IFolder, IFileStream } from './models/FilesSchema';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly fsService: FsService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('fetchfoldercontents')
  fetch_folder_contents() {
    const contents = [];
    return contents;
  }

  @Post('fetchrootfolders')
  fetch_root_folders(@Body() request: { path: string }) {
    const retval = this.fsService.getFolderTree(request.path);
    const root: IFolder = {
      foldername: path.basename(request.path),
      folderpath: request.path,
      subfolders: retval
    }
    return [root];
  }

  @Post('fetchfoldercontents')
  post_fetch_folder_contents(@Body() request: { folderpath: string }) {
    const contents: IFile[] = this.fsService.getFiles(request.folderpath);
    return contents;
  }

  @Post('file')
  get_file(@Body() request: { path: string, filename: string }, @Res() res: Response) {
    const fileStream: IFileStream = this.fsService.getFileStream(request.path);
    if (!fileStream) {
      res.status(HttpStatus.NOT_FOUND).send();
    }
    else {
      res.writeHead(200, {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": "attachment; filename=" + request.filename
      });
  
      fileStream.stream.pipe(res);
    }
  }
}
