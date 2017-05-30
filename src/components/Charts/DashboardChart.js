import React, {Component} from 'react';
const ReactHighcharts = require('react-highcharts'); // Expects that Highcharts was loaded in the code.

class DashboardChart extends Component {

  buildConfig(props){
    return {
      chart: {
        marginRight: 130,
        marginBottom: 40
      },
      title: {
        text: `Porcentaje de utilizacion de ancho de banda en ${props ? props.isp : this.props.isp}`,
        x: -20 //center
      },
      subtitle: {
        text: `Grafico general para ${props ? props.email : this.props.email}`,
        x: -20
      },
      xAxis: {
        max: 50,
        type: 'datetime',
        //plotBands: redmarker,
        categories: props ? props.fechas : this.props.fechas,
        tickInterval: 6,
        labels: {
          enabled: true,
          formatter: function () {
            if(this.value < 0){
              return "";
            }
            const date = new Date(this.value);
            return `${date.getDay()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}`;
          },
        },
        min: -38,
        max: 12,
      },
      yAxis: {
        title: {
          text: '% de utilizacion'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }],
        min: 0, max: 1
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -10,
        y: 100,
        borderWidth: 0
      },
      scrollbar: {
        enabled: true
      },
      series: props ? props.data : this.props.data,
      plotOptions: {
        series: {
          cursor: 'pointer',
          turboThreshold: 0,
          marker: {
            lineWidth: 1
          }
        }
      },
    };
  }

  componentWillMount() {
    this.config = this.buildConfig();
  }

  componentWillReceiveProps(newProps){
    this.config = this.buildConfig(newProps);
  }

  render() {
    return(
      <ReactHighcharts config = {this.config}></ReactHighcharts>
    )
  }
}
export default DashboardChart;