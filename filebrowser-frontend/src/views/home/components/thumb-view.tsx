import React from "react";
import { IFetchContentsResponse } from "../../../shared/models/ServereResponseSchema";
import { fetchFolderContents } from '../../../state/folder-contents/folder-contents.actions';
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import { downloadStarted } from '../../../state/download-file/download-file.actions';
import './thumb-view';

interface Props {
	contents: IFetchContentsResponse[];
    downloadFile: typeof downloadStarted;
}

export default class ThumbView extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
    }
    
    get gridItems(): IFetchContentsResponse[][] {
        const rows: number = Math.ceil(this.props.contents.length / 4);
        const retval: IFetchContentsResponse[][] = [];
        for (var i = 0; i < rows; i++) {
            let temp: IFetchContentsResponse[] = [];
            for (var j = 0; j < 4; j++) {
                if ((i * 4 + j) < this.props.contents.length) {
                    temp.push(this.props.contents[i * 4 + j]);
                }
            }
            retval.push(temp);
        }
        
        return retval;
    }

    renderRow = (row: IFetchContentsResponse[]) => {
        return row.map((item: IFetchContentsResponse) => (
            <Grid item xs={3}>
                <Grid container spacing={1} style={{textAlign: 'center'}} onDoubleClick={() => this.handleDoubleClick(item)} className="clickable">
                    <Grid item xs={12}>
                        <InsertDriveFileIcon fontSize="large"/>
                    </Grid>
                    <Grid item xs={12}>
                        <div>{item.filename}</div>
                    </Grid>
                </Grid>
            </Grid>
        ));
    }

    handleDoubleClick = (item: IFetchContentsResponse) => {
        this.props.downloadFile(item.filepath, item.filename);
    }

	render() {
        console.log(this.gridItems);
		return (
			<div>
				{this.props.contents && this.gridItems.map((item: IFetchContentsResponse[], index) => (
					<Grid container spacing={3} key={index}>
						{this.renderRow(item)}
					</Grid>
				))}
			</div>
		);
	};
}
