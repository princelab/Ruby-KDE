// JS goes here

var input_data = [79, 54, 74, 62, 85, 55, 88, 85, 51, 85, 54, 84, 78, 47, 83, 52, 62, 84, 52, 79, 51, 47, 78, 69, 74, 83, 55, 76, 78, 79, 73, 77, 66, 80, 74, 52, 48, 80, 59, 90, 80, 58, 84, 58, 73, 83, 64, 53, 82, 59, 75, 90, 54, 80, 54, 83, 71, 64, 77, 81, 59, 84, 48, 82, 60, 92, 78, 78, 65, 73, 82, 56, 79, 71, 62, 76, 60, 78, 76, 83, 75, 82, 70, 65, 73, 88, 76, 80, 48, 86, 60, 90, 50, 78, 63, 72, 84, 75, 51, 82, 62, 88, 49, 83, 81, 47, 84, 52, 86, 81, 75, 59, 89, 79, 59, 81, 50, 85, 59, 87, 53, 69, 77, 56, 88, 81, 45, 82, 55, 90, 45, 83, 56, 89, 46, 82, 51, 86, 53, 79, 81, 60, 82, 77, 76, 59, 80, 49, 96, 53, 77, 77, 65, 81, 71, 70, 81, 93, 53, 89, 45, 86, 58, 78, 66, 76, 63, 88, 52, 93, 49, 57, 77, 68, 81, 81, 73, 50, 85, 74, 55, 77, 83, 83, 51, 78, 84, 46, 83, 55, 81, 57, 76, 84, 77, 81, 87, 77, 51, 78, 60, 82, 91, 53, 78, 46, 77, 84, 49, 83, 71, 80, 49, 75, 64, 76, 53, 94, 55, 76, 50, 82, 54, 75, 78, 79, 78, 78, 70, 79, 70, 54, 86, 50, 90, 54, 54, 77, 79, 64, 75, 47, 86, 63, 85, 82, 57, 82, 67, 74, 54, 83, 73, 73, 88, 80, 71, 83, 56, 79, 78, 84, 58, 83, 43, 60, 75, 81, 46, 90, 46, 74];
var kde = science.stats.kde().sample(input_data);
var kde_out = kde(input_data);
var normalization_value = 1;
var normalization_factor = 100;
var output_data = [];
var output_kde = [];
$.each(input_data, function(index, value) {
  output_data[index] = [value, normalization_value]
})
$.each(kde_out.sort(), function(index, value) {
  output_kde[index] = [value[0], value[1] * normalization_factor]
})
//var graph_kde_data = []
console.log(kde_out);
//for(var current = 0; current < kde_out.length / 2.0; current = current + 2)
  //graph_kde_data[current/2] = [kde_out[current], kde_out[current+1]];
//document.write(graph_kde_data[0]);
$(document).ready(function() {
  var area_chart=new Highcharts.Chart({

  chart:{
    renderTo: 'test',
    inverted: false
  },

  yAxis:{

  },
  plotOptions: {
    column: {
      pointWidth: 1, 
      allowPointSelect: false,
      enableMouseTracking: false
    }
  },

  series: [{
    type: 'column',
    data: output_data,
    name: 'number_line',
    color: '#1A47C9',
    inverted: false,
    marker: {
      enabled: false,
      states: {
        hover: {
          enabled: true
        }
      }
      }
    }, {
      type:'area',
        data: output_kde,
        name: 'neg_area',
        color: '#9E8FC9',
        inverted: true,
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true
            }
          }
       }
    }]
  },
  function(chart){
    varpoint=chart.series[0].data[8];
    varbox= text.getBBox();
    chart.renderer.rect(box.x-5,box.y-5,box.width+10,box.height+10,5).attr({
      fill:'#FFFFEF',
      stroke:'gray',
      'stroke-width':1,
      zIndex:4
    }).add();
  });
});
