var idata = [{ "candidato": "duque", "value": 0.455 }, { "candidato": "petro", "value": 0.2653 }, { "candidato": "fajardo", "value": 0.1072 }, { "candidato": "vargas", "value": 0.0637 }, { "candidato": "delacalle", "value": 0.0509 }, { "candidato": "morales", "value": 0.0262 }, { "candidato": "cordoba", "value": 0.0074 }, { "candidato": "blanco", "value": 0.0242 }]

    var visTotals = function(idata){
      var length = 20;
      var grouped_candidates = group_small_candidates(idata, length);
      var expanded_data = expand_candidates(grouped_candidates, length);
      dataViz(expanded_data, "#demography-flex")
    }

    var dataViz = function (data, parentDiv) {
      d3.select(parentDiv)
        .selectAll("div.candidate")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "candidate py-0 px-2 text-monospace")
        .attr("class", function (d) { return d3.select(this).attr("class") + " " + d.candidate })
        // .style("width", "9%")
        .html(d => d.candidate.toUpperCase().charAt(0));
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

    var expand_candidates = function (idata, length) {
      var obj_length;
      var candidates = [];
      var weights = [];
      obj_length = idata.length;
      for (var i = 0; i < obj_length; i++) {
        candidates.push(idata[i].candidato);
        weights.push(idata[i].value);
      }
      var expanded_array = generateWeighedList(candidates, normalise(weights, length), length);
      return array2object(expanded_array)
    };

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

   d3.json("data/totals.json").then(visTotals)