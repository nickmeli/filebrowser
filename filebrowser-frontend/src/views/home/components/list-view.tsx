import React from "react";
import { IFetchContentsResponse } from "../../../shared/models/ServereResponseSchema";
import Grid from '@material-ui/core/Grid';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import './list-view.scss'
import { Utils } from '../../../providers/utils';
import { downloadStarted } from '../../../state/download-file/download-file.actions';

interface Props {
    contents: IFetchContentsResponse[],
    downloadFile: typeof downloadStarted
}

export default class ListView extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
    }

    handleDoubleClick = (item: IFetchContentsResponse) => {
        this.props.downloadFile(item.filepath, item.filename);
    }

    render() {
        return (
            <div>
                <Grid container spacing={3} className="list-row">
                    <Grid item xs={3}>
                        <b>File name</b>
                    </Grid>
                    <Grid item xs={5}>
                        <b>File path</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Size</b>
                    </Grid>
                    <Grid item xs={2}>
                        <b>Type</b>
                    </Grid>
                </Grid>
                <div className="list-container">
                    {this.props.contents && this.props.contents.map((item: IFetchContentsResponse, index) => (
                        <Grid container spacing={3} key={index} className="list-row clickable" onDoubleClick={() => this.handleDoubleClick(item)}>
                            <Grid item xs={3}>
                                <div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <InsertDriveFileIcon fontSize="small" />
                                                </td>
                                                <td style={{ padding: '0 1px' }}>
                                                    <div>{item.filename}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div>{item.filepath}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>{Utils.convertBytes(item.filesize)}</div>
                            </Grid>
                            <Grid item xs={2}>
                                <div>{item.filetype}</div>
                            </Grid>
                        </Grid>
                    ))}
                </div>
            </div>
        );
    };
}
