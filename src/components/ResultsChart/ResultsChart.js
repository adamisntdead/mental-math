import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';
import ResultsItem from '../ResultsTable/ResultsItem'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default class ResultsChart extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            options: {
                chart: {
                    type: 'area',
                    stacked: false,
                    height: 350,
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: false
                    },
                    toolbar: {
                        autoSelected: 'zoom'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                },
                title: {
                    text: `@${this.props.username}`,
                    align: 'left',
                    style: {
                        color: this.props.theme.dark ? '#FFFFFF' : '#000000' // Change for dark mode
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        inverseColors: false,
                        opacityFrom: 0.5,
                        opacityTo: 0,
                        stops: [0, 90, 100]
                    },
                },
                yaxis: {
                    labels: {
                        formatter: function (val) {
                            return val
                        },
                        style: {
                            colors: this.props.theme.dark ? '#FFFFFF' : '#000000' // Change for dark mode
                        }
                    },
                    title: {
                        text: 'Score'
                    },
                },
                xaxis: {
                    type: 'datetime',
                    labels: {
                        style: {
                            colors: this.props.theme.dark ? '#FFFFFF' : '#000000' // Change for dark mode
                        }
                    }
                },
                tooltip: {
                    shared: false,
                    theme: this.props.theme.dark ? 'dark' : 'light', // Change for dark mode'dark',
                    y: {
                        formatter: function (val) {
                            return val
                        }
                    }
                }
            },


        };
    }

    render() {
        const data = this.props.scores.map(dataPoint => {
            const date = moment(dataPoint.date, 'MMMM Do YYYY, h:mm:ss a').format("X")
            return [parseInt(date) * 1000, dataPoint.score]
        })
        data.sort((a, b) => b[0] - a[0])

        const series = [{
            name: '120s Trial',
            data
        }]

        console.log(series)

        return (
            <div id="chart">
                <Chart options={this.state.options} series={series} type="area" height={350} />
            </div>)
    }

}