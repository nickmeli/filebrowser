import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";
import { callSetDialog, fetchRootFolders, callSetRootFolderPath } from '../../../state/root-folders/root-folder.actions';

interface Props {
    showDialog: boolean;
    callDialog: typeof callSetDialog;
    getFolders: typeof fetchRootFolders;
    setPath: typeof callSetRootFolderPath;
}

interface State {
    showDialog: boolean;
    rootPath: string;
}

class FormDialogComponent extends React.Component<Props, State> {
    constructor(props: Props) {
		super(props);

		this.state = {
            showDialog: false,
            rootPath: '',
        }
	}

    handleClose = () => {
        this.props.callDialog(false);
    };

    handleSet = () => {
        this.props.setPath(this.state.rootPath);
        this.props.callDialog(false);
    }

    handleChange = (event: any) => {
        this.setState({ rootPath: event.target.value});
    }

    keyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.props.callDialog(false);
            this.props.setPath(this.state.rootPath);
        }
    }

    render() {
        return (
            <Dialog open={this.props.showDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
                <DialogTitle id="form-dialog-title">Root directory</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Set root path"
                        type="path"
                        fullWidth
                        value={this.state.rootPath}
                        onChange={this.handleChange}
                        onKeyDown={this.keyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSet} color="primary">
                        Set
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

function mapStateToProps(state: IApplicationState) {
	return {
		showDialog: state.folders.showSetDialog
	};
}

export default connect(
	mapStateToProps,
	{ callDialog: callSetDialog, getFolders: fetchRootFolders, setPath: callSetRootFolderPath }
)(FormDialogComponent);