import React from "react";
import { IFetchContentsResponse, IRootFolderResponse } from "../../../shared/models/ServereResponseSchema";
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";
import { Utils } from "../../../providers/utils";
import Alert from '@material-ui/lab/Alert';

interface Props {
    contents: IFetchContentsResponse[];
    selectedFolder: IRootFolderResponse | null;
}

class LeftFooterComponent extends React.Component<Props> {

    totalFiles = () => {
        if (this.props.contents && this.props.contents.length > 0) {
            return (
                <div>
                    <b>Total Files in Folder:</b> {this.props.contents.length}
                </div>
            );
        }
        return <div></div>;
    }

    totalFilesSize = () => {
        if (this.props.contents && this.props.contents.length > 0) {
            return (
                <div>
                    <b>Total Files Size:</b> {Utils.convertBytes(this.calculateTotalSize())}
                </div>
            );
        }
        return <div></div>;
    }

    calculateTotalSize = (): number => {
        let retval: number = 0;

        if (this.props.contents) {
            this.props.contents.forEach(f => {
                retval += f.filesize;
            })
        }

        return retval;
    }

    totalFolders = () => {
        if (this.props.selectedFolder && this.props.selectedFolder.subfolders) {
            return (
                <div>
                    <b>Total Folders:</b> {this.props.selectedFolder.subfolders.length}
                </div>
            );
        }
        return <div></div>;
    }

    render () {
        return (
            <div>
                {this.props.contents.length > 0 && 
                <Alert severity="info">
					Double click file to download.
				</Alert>}
                <div>
                    {this.totalFiles()}
                </div>
                <div>
                    {this.totalFilesSize()}
                </div>
                <div>
                    {this.totalFolders()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: IApplicationState) {
	return {
        contents: state.contents.contents,
        selectedFolder: state.selectedFolder.selectedFolder,
	};
}

export default connect(
	mapStateToProps,
	{  }
)(LeftFooterComponent);