import React from "react";
import TreeViewComponent from '../components/tree-view';
import { fetchRootFolders, callSetDialog } from '../../../state/root-folders/root-folder.actions';
import { connect } from "react-redux";
import { IApplicationState } from '../../../state';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import './left-navigation-panel.scss';
import FormDialogComponent from '../components/set-path-dialod';
import FolderIcon from '@material-ui/icons/Folder';
import LeftFooterComponent from '../components/left-footer-pane';

interface Props {
    getFolders: typeof fetchRootFolders;
    showDialog: typeof callSetDialog;
}

class LeftNavigationPanel extends React.Component<Props> {

    componentDidMount() {
    }

    openSettings = () => {
        this.props.showDialog(true);
    }

    render() {
        return (
            <div>
                <div className="wrap">
                    <Drawer
                        variant="permanent"
                        className='paper drawer-paper'>
                        <div className='toolbar-icon'>
                            <span className="logo">File browser</span>
                            <IconButton onClick={this.openSettings}>
                                <FolderIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <div className="tree-container">
                            <TreeViewComponent />
                        </div>
                        <Divider />
                        <FormDialogComponent />
                    </Drawer>
                </div>
                <div className="footer">
                    <LeftFooterComponent />
                </div>
            </div>
        );
    };
}

function mapStateToProps(state: IApplicationState) {
    return {
        contents: state.folders.rootFolderPath
    };
}

export default connect(
    mapStateToProps,
    { getFolders: fetchRootFolders, showDialog: callSetDialog }
)(LeftNavigationPanel);