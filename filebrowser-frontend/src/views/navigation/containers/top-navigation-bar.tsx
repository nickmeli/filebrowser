import React from 'react';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import { callViewType } from '../../../state/view-type/view-type.actions';
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './top-navigation-bar.scss';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fileFilterDispached } from '../../../state/files-filter/files-filter.actions';

interface Props {
    rootPath: string;
    callViewType: typeof callViewType;
    filterChanged: typeof fileFilterDispached;
}

interface State {
    alignment: string
}

class TopNavigationComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            alignment: 'list'
        };
    }

    handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        this.setState({ alignment: newAlignment });
        this.props.callViewType(newAlignment);
    };

    trimRootPath(): string {
        return this.props.rootPath.length < 40 ? this.props.rootPath : this.props.rootPath.substring(0, 40) + '...';
    }

    searchChange = (event: any) => {
        console.log(event.target.value);
        this.props.filterChanged(event.target.value);
    }

    render() {
        return (
            <AppBar position="absolute" className="app-bar ">
                <Toolbar className="toolbar app-bar-shift">
                    <Typography component="h1" variant="h6" color="inherit" noWrap className="title">
                        Root path: <i>{this.trimRootPath()}</i>
                    </Typography>
                    <div className="search">
                        <div className="search-icon">
                            <SearchIcon />
                        </div>
                        <InputBase
                            onChange={this.searchChange}
                            placeholder="Search…"
                            classes={{
                                root: "input-root",
                                input: "input-input",
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className="toogle-buttons">
                        <Grid container spacing={2} direction="column" alignItems="center">
                            <Grid item >
                                <ToggleButtonGroup size="small" value={this.state.alignment} exclusive onChange={this.handleChange}>
                                    <ToggleButton value="list" >
                                        <ListIcon style={{ color: 'white' }} fontSize="small" />
                                    </ToggleButton>
                                    < ToggleButton value="thumbs" >
                                        <AppsIcon style={{ color: 'white' }} fontSize="small" />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

function mapStateToProps(state: IApplicationState) {
    return {
        rootPath: state.folders.rootFolderPath
    };
}

export default connect(
    mapStateToProps,
    { callViewType: callViewType, filterChanged: fileFilterDispached }
)(TopNavigationComponent);