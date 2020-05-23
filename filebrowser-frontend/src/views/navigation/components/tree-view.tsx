import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TreeView } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { IRootFoldersState } from "../../../state/root-folders/root-folder.types";
import { IRootFolderResponse } from "../../../shared/models/ServereResponseSchema";
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";
import { fetchFolderContentsByFolder } from '../../../state/folder-contents/folder-contents.actions';
import { folderSelected } from '../../../state/selected-folder/selected-folder.actions';

interface Props {
	folders: IRootFolderResponse[];
	getContents: typeof fetchFolderContentsByFolder;
	setSelectedFolder: typeof folderSelected;
}

interface State {
	expanded: string[];
	selected: string[];
}

class TreeViewComponent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			expanded: [],
			selected: []
		}
	}

	componentDidMount() {

	}

	handleToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
		this.setState({ expanded: nodeIds });
	};

	handleSelect = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
		this.setState({ selected: nodeIds });
	};

	TreeViewNode = (nodes?: IRootFolderResponse[]) => {
		if (nodes && nodes.length > 0) {
			return (
				<>
					{nodes.map((item: IRootFolderResponse, index: number) => (
						<TreeItem key={index} nodeId={item.folderpath} label={item.foldername} onLabelClick={() => this.clickNode(item)}>
							{this.TreeViewNode(item.subfolders)}
						</TreeItem>
					))}
				</>
			);
		}
	}

	clickNode = (node: IRootFolderResponse) => {
		this.props.getContents(node.folderpath);
		this.props.setSelectedFolder(node);
	}

	render() {
		return (
			<TreeView
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				expanded={this.state.expanded}
				selected={this.state.selected}
				onNodeToggle={this.handleToggle}
				onNodeSelect={this.handleSelect}>
				{ this.props.folders && this.TreeViewNode(this.props.folders) }
			</TreeView>
		);
	}
}

function mapStateToProps(state: IApplicationState) {
	return {
		folders: state.folders.folders
	};
}

export default connect(
	mapStateToProps,
	{ getContents: fetchFolderContentsByFolder, setSelectedFolder: folderSelected }
)(TreeViewComponent);
