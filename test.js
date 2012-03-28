// JS goes here

var val_arr = JSON.parse('filename.json')
var time_arr = JSON.parse('filename2.json')


var timepoints = new Array();
// Format timepoint_data
var prep_time = function(timepoints, datapoints) {
  $.each(temp, function(i,v) {
    timepoints[i] = [Date.parse(v), datapoints[i]]
  })
  timepoints.sort( function(a,b) {
    return a[0]-b[0] 
  })
  return timepoints
}
var timepoints = prep_time(temp, input_data)
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
// TESTING FXNS and data prep
var test_invert = function(array) {
  output = new Array();
  $.each(array, function(i, value) {
    output[i] = [value[0], - value[1]] 
  })
  return output;
}
var out2_data = test_invert(output_data)
var out2_kde = test_invert(output_kde)


// DOCUMENT
$(document).ready(function() {
  var area_chart = new Highcharts.Chart({
  chart: {
    renderTo: 'bean',
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
  xAxis: { 
    min: bin_low_val,
    max: bin_high_val,
    gridLineWidth: 1, 
    reversed: false
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      shadow: false,
      borderWidth: 0,
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
    chart: {
      renderTo: 'time',
    },
    xAxis: { /*
      labels: {
        enabled: true, 
        formatter: function () {
          return Math.abs(this.value);
        }
      }, */
      gridLineWidth: 1, 
      type: 'datetime'
    },
    yAxis: { 
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
        data: timepoints,
        name: 'sample2_numline',
        color: '#1A47C9',
        zIndex: 1,
      }, {
        type: 'line', 
        data: out2_data, 
        name: 'sample1_numline',
        color: '#A1749C',
        zIndex: 1
      }]
  });
});
