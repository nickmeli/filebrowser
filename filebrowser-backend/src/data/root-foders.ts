
export const rootFolders = [
    {
        id: "1",
        foldername: 'folder 1',
        folderpath: 'path/to/folder1',
        innerFolders: [
            {
                id: "2",
                foldername: 'folder 1_1',
                folderpath: 'path/to/folder1/folder1_1'
            },
            {
                id: "3",
                foldername: 'folder 1_2',
                folderpath: 'path/to/folder1/folder1_2',
                innerFolders: [
                    {
                        id: "4",
                        foldername: 'folder 1_2_1',
                        folderpath: 'path/to/folder1/folder1_1/folder1_2_1'
                    }
                ]
            }
        ]
    },
    {
        id: "5",
        foldername: 'folder 2',
        folderpath: 'path/to/folder2',
        innerFolders: [
            {
                id: "6",
                foldername: 'folder 2_1',
                folderpath: 'path/to/folder2/folder2_1',
                innerFolders: [
                    {
                        id: "7",
                        foldername: 'folder 2_2_1',
                        folderpath: 'path/to/folder2/folder2_1/folder2_1_1'
                    }
                ]
            },
            {
                id: "8",
                foldername: 'folder 2_2',
                folderpath: 'path/to/folder2/folder2_2'
            }
        ]
    },
    {
        id: '9',
        foldername: 'folder 3',
        folderpath: 'path/to/folder3'
    }
];