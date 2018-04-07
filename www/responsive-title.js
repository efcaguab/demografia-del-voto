function resize_font(target_element_id, reference_element_id) {
  var el = document.getElementById(target_element_id);
  var style = window.getComputedStyle(el, null).getPropertyValue('font-size');
  var fontSize = parseFloat(style);
  var factor = document.getElementById(reference_element_id).offsetWidth / el.offsetWidth
  el.style.fontSize = (factor * fontSize) + "px"
}

resize_font("title1", "subtitle")
resize_font("title2", "subtitle")

// $(window).resize(function() { resize_font("title2", "subtitle") });

