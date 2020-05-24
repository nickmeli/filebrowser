import React from "react";
import ItemList from '../components/item-list';
import Paper from '@material-ui/core/Paper';
import './home.scss';
import Grid from '@material-ui/core/Grid';
import ChartViewComponent from '../components/chart-view';

export class HomeContainer extends React.Component {

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className="container" >
                        <div>
                            <ItemList />
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper  className="chart-container" >
                        <div>
                            <ChartViewComponent />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        );
    };
}