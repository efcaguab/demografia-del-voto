var make_circles = function (data, parentSvg, length, lines) {
  var grouped_candidates = group_small_candidates(data, length);
  var normalised_data = normalise_preferences(grouped_candidates, length);
  var cols_vector = get_columns(normalised_data, lines, length)
  var expanded_data = expand_candidates(grouped_candidates, normalised_data, length, lines, cols_vector);
  draw_circles(expanded_data, parentSvg, length, lines, cols_vector);
}

var draw_circles = function (data, parentSvg, length, lines, cols_vector) {
  var xRange = 1000
  var lineLength = cols_vector.reduce(function(x,y) {return x+ y}) + 2;
  var n_gaps = cols_vector.filter(function(x) { return x != 0}).length - 1 ;
  var circleRadius = xRange * 0.9 * 0.5 / lineLength
  var yRange = circleRadius * 2 * lines * 1.1111111

  d3.select(parentSvg)
    .attr("viewBox", "0 0 " + xRange + " " + yRange)

  var xScale = d3.scaleLinear().domain([0, lineLength ]).range([0, xRange]);
  var yScale = d3.scaleLinear().domain([0, lines]).range([0, yRange])
  var gClass = "g-" + parentSvg.substr(1)
  var gCircleClass = "g-circle-" + parentSvg.substr(1)
  
  d3.select(parentSvg)
    .append("g")
    .attr("id", gClass)
    .attr("transform", "translate(0," + circleRadius +")")
    .selectAll("g")
    .data(data)
    .enter()
    .append("g")
    .attr("class", gCircleClass)
    .attr("transform", (d,i) => "translate(" + xScale(Math.floor(d.index / lines) + 0.5 + d.candidate_index / n_gaps * 2) + ", " + yScale((d.index % lines) + 0.05) + ")")
  
  var gCircle = d3.selectAll("." + gCircleClass)
  
  gCircle
    .append("circle")
    .attr("r", circleRadius)
    .attr("class", "voter")
    .style("fill", function(d) {return d3.rgb(d.color)})
    .attr("class", function (d) { return d3.select(this).attr("class") + " " + d.candidate })

  gCircle
    .append("text")
}

var group_small_candidates = function (idata, length) {
  var sorted_data = idata.sort(function (x, y) { return d3.ascending(x.value, y.value) });
  var cum_value = 0
  for (i = 0; i < sorted_data.length; i++) {
    cum_value = cum_value + sorted_data[i].value;
    sorted_data[i].cum_value = cum_value;
    sorted_data[i].others = Math.floor(cum_value * length) < 1;
  }
  var small_candidates = sorted_data.filter(function (x) { return x.others })
  if (small_candidates.length == 1) {
    var big_candidates = sorted_data;
    big_candidates.sort(function (x, y) { return d3.descending(x.value, y.value) })
  } else {
    var big_candidates = sorted_data.filter(function (x) { return x.others == false });
    var small_total = 0
    for (i = 0; i < small_candidates.length; i++) {
      small_total = small_total + small_candidates[i].value
    }
    big_candidates.sort(function (x, y) { return d3.descending(x.value, y.value) })
    big_candidates.push({ "candidato": "otros", "value": small_total })
  }
  return big_candidates
}

var normalise_preferences = function (idata, length) {
  var obj_length = idata.length;
  var weights = [];
  for (var i = 0; i < obj_length; i++) {
    weights.push(idata[i].value);
  }
  return normalise(weights, length)
};

var expand_candidates = function(idata, normalised_candidates, length, lines, cols_vector){
  
  var total_spaces = cols_vector.map(function(x) {return x * lines});
  total_spaces.unshift(0)
  var total_index = total_spaces.reduce(function(a,b,i){ return i === 0 ?  [b]: a.concat(a[i-1]+b);},0);
  
  var obj_length = idata.length;
  var candidates = [];
  for (var i = 0; i < obj_length; i++) {
    candidates.push(idata[i].candidato);
  }
  var expanded_array = generateWeighedList(candidates, normalised_candidates, length);
  var expanded_object = array2object(expanded_array)
  var l = expanded_object.length
  var previous_candidate;
  var candidate_index = -1;
  var element_index = 0;
  for(var i = 0; i < l; i ++){
    var this_candidate = expanded_object[i].candidate
    if(this_candidate != previous_candidate){
      candidate_index = candidate_index + 1;
      element_index = total_index[candidate_index];
    }

    expanded_object[i].color = candidateThemes[this_candidate].color;
    expanded_object[i].index = element_index;
    expanded_object[i].candidate_index = candidate_index;
    expanded_object[i].full_name = candidateThemes[this_candidate].full_name;
    expanded_object[i].short_name = candidateThemes[this_candidate].short_name;
    expanded_object[i].initial = candidateThemes[this_candidate].initial;
    element_index = element_index + 1;
    previous_candidate = this_candidate;
  }
  return expanded_object;
}

var generateWeighedList = function (list, weight, length) {
  var weighed_list = [];
  // Loop over weights
  for (var i = 0; i < weight.length; i++) {
    var multiples = weight[i] * length;
    // Loop over the list of items
    for (var j = 0; j < multiples; j++) {
      weighed_list.push(list[i]);
    }
  }
  return weighed_list;
};

var array2object = function (arr) {
  var obj = []
  for (var i = 0; i < arr.length; ++i)
    obj[i] = { "candidate": arr[i] };
  return (obj);
}

var normalise = function (weights, length) {
  var tmp_array = [];
  var lowerSum = 0;
  for (var i = 0; i < weights.length; i++) {
    var this_value = weights[i] * length;
    var floored = Math.floor(this_value);
    tmp_array[i] = {
      "result": floored,
      "difference": this_value - floored,
      "index": i
    };
    lowerSum = lowerSum + tmp_array[i].result;
  }
  tmp_array = tmp_array.sort(function (x, y) {
    return d3.descending(x.difference, y.difference);
  })
  var difference = length - lowerSum
  for (var i = 0; i < difference; i++) {
    tmp_array[i].result = tmp_array[i].result + 1
  }

  tmp_array = tmp_array.sort(function (x, y) {
    return d3.ascending(x.index, y.index)
  })

  var rounded_weights = []
  for (var i = 0; i < tmp_array.length; i++) {
    rounded_weights[i] = tmp_array[i].result / length
  }
  return rounded_weights
}

var get_columns = function(normalised_candidates, lines, length){
  return normalised_candidates.map(function(x) {return Math.ceil(x * length / lines)});
}

var candidateThemes = {
  "petro" : {
    "short_name": "Petro",
    "color": "#6d356f",
    "full_name" : "Gustavo Petro",
    "initial": "P"
  },
  "fajardo": {
    "short_name": "Fajardo",
    "color": "#008333",
    "full_name": "Sergio Fajardo",
    "initial": "F"
  },
  "duque" : {
    "short_name": "Duque",
    "color": "#667f9e",
    "full_name": "Iván Duque", 
    "initial": "D"
  }, 
  "vargas": {
    "short_name": "Vargas Lleras",
    "color": "#2e3191",
    "full_name": "Germán Vargas",
    "initial": "G"
  }, 
  "delacalle" : {
    "short_name": "De la Calle", 
    "color": "rgb(194, 13, 25)", 
    "full_name": "Humberto De la Calle", 
    "initial": "C"
  }, 
  "morales" : {
    "short_name": "Morales", 
    "color": "#ff6600", 
    "full_name": "Viviane Morales", 
    "initial": "M"
  },
  "cordoba" : {
    "short_name": "Cordoba", 
    "color": "rgb(157, 19, 90)", 
    "full_name": "Piedad Cordoba", 
    "initial": "O"
  }, 
  "blanco" : {
    "short_name": "Blanco", 
    "color": "white", 
    "full_name": "Voto en Blanco", 
    "initial": "B"
  }, 
  "otros": {
    "short_name": "Otros", 
    "color": "grey", 
    "full_name": "Otros candidatos", 
    "initial": "O"
  }
}