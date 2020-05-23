import React from "react";
import { IFetchContentsResponse } from "../../../shared/models/ServereResponseSchema";
import { fetchFolderContents } from '../../../state/folder-contents/folder-contents.actions';
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import ListView from './list-view';
import ThumbView from './thumb-view';
import Alert from '@material-ui/lab/Alert';
import FolderIcon from '@material-ui/icons/Folder';
import { IFilterState } from "../../../state/files-filter/files-filter.types";
import { downloadStarted } from '../../../state/download-file/download-file.actions';

interface Props {
	contents: IFetchContentsResponse[];
	viewType: string;
	filter: IFilterState;
	getContents: typeof fetchFolderContents;
    downloadFile: typeof downloadStarted;
}

class ItemList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
	}

	componentDidMount() {
	}

	get filteredContent(): IFetchContentsResponse[] {
		return this.props.contents.filter(f =>
						f.filename.includes(this.props.filter.filter)
						&& (!this.props.filter.type || this.props.filter.type === f.filetype));
	}

	getViewByType = () => {
		if (this.props.viewType === 'list') {
			return <ListView contents={this.filteredContent} downloadFile={this.props.downloadFile} />;
		}
		else {
			return <ThumbView contents={this.filteredContent} downloadFile={this.props.downloadFile} />;
		}
	}

	getHelperAlert = () => {
		if (!this.props.contents || this.props.contents.length == 0) {
			return (
				<Alert severity="info">
					<ul>
						<li>Click folder icon (top left) <FolderIcon fontSize="small" /> to set the root directory path.</li>
						<li>A list of directories will appear on the left pane.</li>
						<li>By clicking a directory on the left pane file contents will appear on central pane.</li>
					</ul>
				</Alert>
			);
		}
		else {
			return this.getViewByType();
		}
	}

	render() {
		return (
			this.getHelperAlert()
		);
	};
}

function mapStateToProps(state: IApplicationState) {
	return {
		contents: state.contents.contents,
		viewType: state.viewType.viewType,
		filter: state.filter,
	};
}

export default connect(
	mapStateToProps,
	{ getContents: fetchFolderContents, downloadFile: downloadStarted }
)(ItemList);
