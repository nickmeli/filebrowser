import React from "react";
import { IFetchContentsResponse } from "../../../shared/models/ServereResponseSchema";
import { IApplicationState } from '../../../state';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { from } from 'linq';
import { Utils } from "../../../providers/utils";
import { filterFileTypeChanged } from '../../../state/files-filter/files-filter.actions';
import { Bar as ChartJsBar, Pie } from 'react-chartjs-2';

interface Props {
    contents: IFetchContentsResponse[];
    typeChanged: typeof filterFileTypeChanged
}

interface BarDataset {
    label: string;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    hoverBackgroundColor: string;
    hoverBorderColor: string;
    data: number[];
}

interface PieDataset {
    data: number[];
    backgroundColor: string[];
    hoverBackgroundColor: string[];
}

interface FilesData {
    labels: string[];
    datasets: BarDataset[];
}

interface FileSize {
    labels: string[];
    datasets: PieDataset[];
}

class ChartViewComponent extends React.Component<Props> {

    clickFilesChart = (event: any) => {
        // this.props.typeChanged(event.activeLabel);
    }

    clickSizeChart = (event: any) => {
        // this.props.typeChanged(event.activeLabel);
    }

    pieLabelCallback = (tooltipItem: any, data: FileSize) => {
        const val = Utils.convertBytes(data.datasets[0].data[tooltipItem.index]);
        return ' ' + val;
    }

    get types(): string[] {
        return from(this.props.contents).select(x => x.filetype).distinct().toArray();
    }

    get filesByType(): FilesData {
        const labels: string[] = [];
        const dataset: BarDataset = {
            label: 'Files count',
            backgroundColor: Utils.getRandomColor(),
            borderColor: Utils.getRandomColor(),
            borderWidth: 1,
            hoverBackgroundColor: Utils.getRandomColor(),
            hoverBorderColor: Utils.getRandomColor(),
            data: []
        };

        this.types.forEach(t => {
            labels.push(t);
            dataset.data.push(from(this.props.contents).count(x => x.filetype === t));
        });
        
        return {
            labels,
            datasets: [dataset]
        };
    }

    get sizesByType(): FileSize {
        const labels: string[] = [];
        const dataset: PieDataset = {
            backgroundColor: [],
            hoverBackgroundColor: [],
            data: []
        };

        this.types.forEach(t => {
            labels.push(t);
            dataset.data.push(from(this.props.contents).where(x => x.filetype === t).sum(x => x.filesize));
            dataset.backgroundColor.push(Utils.getRandomColor());
            dataset.hoverBackgroundColor.push(Utils.getRandomColor());
            // readable: Utils.convertBytes(from(this.props.contents).where(x => x.filetype == t).sum(x => x.filesize))
        });

        return {
            labels,
            datasets: [dataset]
        };
    }

    render() {
        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {this.props.contents.length > 0 && <ChartJsBar
                            data={this.filesByType}
                            width={200}
                            height={230}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true,
                                            stepSize: 1,
                                        }
                                    }]
                                }
                            }}/>}
                    </Grid>
                    <Grid item xs={6}>
                        {this.props.contents.length > 0 && <Pie 
                            data={this.sizesByType}
                            options={{
                                maintainAspectRatio: false,
                                tooltips: {
                                    callbacks: {
                                        label: this.pieLabelCallback
                                    }
                                }
                            }} />}
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: IApplicationState) {
    return {
        contents: state.contents.contents,
    };
}

export default connect(
    mapStateToProps,
    {
        typeChanged: filterFileTypeChanged
    }
)(ChartViewComponent);
