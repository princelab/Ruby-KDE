// JS goes here

var input_data = [79, 54, 74, 62, 85, 55, 88, 85, 51, 85, 54, 84, 78, 47, 83, 52, 62, 84, 52, 79, 51, 47, 78, 69, 74, 83, 55, 76, 78, 79, 73, 77, 66, 80, 74, 52, 48, 80, 59, 90, 80, 58, 84, 58, 73, 83, 64, 53, 82, 59, 75, 90, 54, 80, 54, 83, 71, 64, 77, 81, 59, 84, 48, 82, 60, 92, 78, 78, 65, 73, 82, 56, 79, 71, 62, 76, 60, 78, 76, 83, 75, 82, 70, 65, 73, 88, 76, 80, 48, 86, 60, 90, 50, 78, 63, 72, 84, 75, 51, 82, 62, 88, 49, 83, 81, 47, 84, 52, 86, 81, 75, 59, 89, 79, 59, 81, 50, 85, 59, 87, 53, 69, 77, 56, 88, 81, 45, 82, 55, 90, 45, 83, 56, 89, 46, 82, 51, 86, 53, 79, 81, 60, 82, 77, 76, 59, 80, 49, 96, 53, 77, 77, 65, 81, 71, 70, 81, 93, 53, 89, 45, 86, 58, 78, 66, 76, 63, 88, 52, 93, 49, 57, 77, 68, 81, 81, 73, 50, 85, 74, 55, 77, 83, 83, 51, 78, 84, 46, 83, 55, 81, 57, 76, 84, 77, 81, 87, 77, 51, 78, 60, 82, 91, 53, 78, 46, 77, 84, 49, 83, 71, 80, 49, 75, 64, 76, 53, 94, 55, 76, 50, 82, 54, 75, 78, 79, 78, 78, 70, 79, 70, 54, 86, 50, 90, 54, 54, 77, 79, 64, 75, 47, 86, 63, 85, 82, 57, 82, 67, 74, 54, 83, 73, 73, 88, 80, 71, 83, 56, 79, 78, 84, 58, 83, 43, 60, 75, 81, 46, 90, 46, 74];
var kde = science.stats.kde().sample(input_data);
var normalization_value = 5;
var normalization_factor = 300;
// http://ejohn.org/blog/fast-javascript-maxmin/
Array.max = function( array ){
    return Math.max.apply( Math, array );
};
Array.min = function( array ){
    return Math.min.apply( Math, array );
};
// END ejohn.org
var bin_and_normalize_input = function(input_data, normalization_val) {
  var val_pairs = new Array();
  var x_vals = new Array();
  $.each(input_data.sort(), function(index, value) {
    val_pairs[index] = [value, normalization_val]
    x_vals[index] = value
  })
  // BIN HERE
  size = x_vals.length
  bin_width = size / 100.0
  bin_low_val = Array.min(x_vals) - size * 0.05
  bin_high_val = Array.max(x_vals) + size * 0.05
  num_bins =  Math.ceil((bin_high_val - bin_low_val)/bin_width)
  var output = new Array(size);
  // Set loop conditions
  var j = 0, bin_low = bin_low_val, bin_mid = bin_low + bin_width /2.0, bin_high = bin_low + bin_width
  // Initialize the x values
  $.each(output, function(i, val) {
    output[i] = new Array(2);
    output[i][0] = bin_mid + bin_width * i;
    output[i][1] = 0;
  });
  $.each(output, function(i, value) {
    while (val_pairs[j][0] < value[0] && j < size - 1) {
      output[i][1] = value[1] + val_pairs[j][1] * 0.05
      j++
    }
  });
  return output;
};
var normalize_kde = function(input_kde, factor) {
  var output = [];
  $.each(input_kde.sort(), function(index, value) {
    output[index] = [value[0], value[1] * factor]
  });
  return output;
};

var output_data = bin_and_normalize_input(input_data, normalization_value);
var output_kde = normalize_kde(kde(input_data), normalization_factor);
var test_invert = function(array) {
  output = new Array();
  $.each(array, function(i, value) {
    output[i] = [value[0], - value[1]] 
  })
  return output;
}
var out2_data = test_invert(output_data)
var out2_kde = test_invert(output_kde)
$(document).ready(function() {
  var area_chart=new Highcharts.Chart({
  chart:{
    renderTo: 'bean',
    height: 300,
    width: 300,
    inverted: true, 
  },
  yAxis: {
    labels: {
      enabled: true, 
      formatter: function () {
        return Math.abs(this.value);
      }
    }, 
    gridLineWidth: 1, 
  },
  xAxis:{ 
    min: bin_low_val,
    max: bin_high_val,
    gridLineWidth: 1, 
    reversed: false
  },
  plotOptions: {
    column: {
      pointWidth: 1, 
      allowPointSelect: false,
      enableMouseTracking: false, 
      showInLegend: false,
    }, 
    series: {
      animation: false,
      marker: {
        enabled: false
      }, 
      turboThreshold: 10
    },
    area: { 
      enableMouseTracking: false,
    }
  },
  series: [{
      type: 'column',
      data: output_data,
      name: 'sample2_numline',
      color: '#1A47C9',
      zIndex: 1,
    }, {
      type: 'area',
      data: output_kde,
      name: 'sample2_kde',
      color: '#9E8FC9',
    }, {
      type: 'column', 
      data: out2_data, 
      name: 'sample1_numline',
      color: '#A1749C',
      zIndex: 1
    }, {
      type: 'area',
      data: out2_kde,
      name: 'sample1_kde',
      color: '#E9F89C',
    }]
  });
  /*
  function(chart){
    varpoint=chart.series[0].data[8];
    varbox= text.getBBox();
    chart.renderer.rect(box.x-5,box.y-5,box.width+10,box.height+10,5).attr({
      fill:'#FFFFEF',
      stroke:'gray',
      'stroke-width':1,
      zIndex:4
    }).add();
  } */
  var time_plot = new Highcharts.Chart({
    chart:{
      renderTo: 'time',
      height: 300,
      width: 400,
    },
    xAxis: { /*
      labels: {
        enabled: true, 
        formatter: function () {
          return Math.abs(this.value);
        }
      }, */
      gridLineWidth: 1, 
    },
    yAxis:{ 
      gridLineWidth: 1, 
      reversed: false
    },
    plotOptions: {
      series: {
        animation: false,
        marker: {
          enabled: false
        }, 
        turboThreshold: 10
      },
    },

    series: [{
        type: 'line',
        data: output_data,
        name: 'sample2_numline',
        color: '#1A47C9',
        zIndex: 1,
      }, {
        type: 'line', 
        data: output_data, 
        name: 'sample1_numline',
        color: '#A1749C',
        zIndex: 1
      }]
  });
});
