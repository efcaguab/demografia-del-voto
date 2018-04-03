function make_option(factor, level, emoji_char, option_title, option_text){
  
  // Make link
  var link = document.createElement("a")
  link.classList.add("action-button")
  link.classList.add("shiny-bound-input")
  link.setAttribute("href", "#")
  var button_id = "i_"
  link.id = button_id.concat(factor, "_", level)
  // Make image
  var emoji_title = document.createElement("h3")
  emoji_title.classList.add("display-7")
  emoji_title.innerText = emoji_char
  // Add image to link
  link.appendChild(emoji_title)
  // Make title
  var title_element = document.createElement("h6")
  title_element.innerText = option_title
  // Add title to link
  link.appendChild(title_element)
  // Make text if necessary
  if (option_text !== undefined){
    var text_element = document.createElement("p")
    text_element.innerText = option_text
    link.appendChild(text_element)
  }
  return link
}

function make_option_column(factor, level, img_src, option_title, option_text){
  var column_element = document.createElement("div")
  column_element.classList.add("col")
  column_element.classList.add("text-center")
  var column_id = factor.concat("_", level, "_col")
  column_element.id = column_id
  column_element.appendChild(make_option(factor, level, img_src, option_title, option_text))
  return column_element
}