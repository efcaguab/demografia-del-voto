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
  emoji_title.classList.add("display-1")
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

document.getElementById("genero_row").appendChild(make_option_column("genero", "femenino", "👩", "Mujer", undefined))
document.getElementById("genero_row").appendChild(make_option_column("genero", "masculino", "👨", "Hombre", undefined))

document.getElementById("zona_row").appendChild(make_option_column("zona", "urbano", "👩‍💼", "Urbano", undefined))
document.getElementById("zona_row").appendChild(make_option_column("zona", "rural", "👩‍🌾", "Rural", undefined))

document.getElementById("estrato_row").appendChild(make_option_column("estrato", "bajo", "🏠", "Bajo", "Estrato 1 y 2"))
document.getElementById("estrato_row").appendChild(make_option_column("estrato", "medio", "🏢", "Medio", "Estrato 3"))
document.getElementById("estrato_row").appendChild(make_option_column("estrato", "alto", "🏰", "Alto", "Estrato 4, 5 y 6"))

document.getElementById("edad_row").appendChild(make_option_column("edad", "18.24", "👶", "18 - 24", undefined))
document.getElementById("edad_row").appendChild(make_option_column("edad", "25.34", "👦", "25 - 34", undefined))
document.getElementById("edad_row").appendChild(make_option_column("edad", "35.44", "👨", "35 - 44", undefined))
document.getElementById("edad_row").appendChild(make_option_column("edad", "45.54", "🧓", "45 - 54", undefined))
document.getElementById("edad_row").appendChild(make_option_column("edad", "55", "👴", "> 55", undefined))

document.getElementById("region_row").appendChild(make_option_column("region", "bogota", "🏙", "Bogota", undefined))
document.getElementById("region_row").appendChild(make_option_column("region", "norte", "🏖", "Costa", "Atlántico, Bolívar, Cesar, Cordoba, Guajira, Magdalena y Sucre"))
document.getElementById("region_row").appendChild(make_option_column("region", "centrooriental", "⛰", "Centro-oriente", "Boyacá, Caquetá, Cundinamarca, Huila, Meta, Tolima, Santander y Norte de Santander"))
document.getElementById("region_row").appendChild(make_option_column("region", "cafetera", "☕", "Cafetera", "Antioquia, Caldas, Quindío y Risaralda"))
document.getElementById("region_row").appendChild(make_option_column("region", "suroccidental", "🌳", "Sur-occidente", "Valle, Cauca, Choco y Nariño"))


document.getElementById("consulta_row").appendChild(make_option_column("consulta", "gran", "🐖", "Si", "En la consulta de Duque, Ramírez y Ordoñez"))
document.getElementById("consulta_row").appendChild(make_option_column("consulta", "inclusion", "🐀", "Si", "En la consulta de Petro y Caicedo"))
document.getElementById("consulta_row").appendChild(make_option_column("consulta", "no.consulta", "🐇", "Si", "Pero no en ninguna consulta"))
document.getElementById("consulta_row").appendChild(make_option_column("consulta", "no", "🚫", "No", undefined))

document.getElementById("partido_row").appendChild(make_option_column("partido", "no", "💔", "Ningún partido", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "verde", "💚", "Partido verde", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "polo", "💛", "Polo", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "conservador", "💙", "Partido Conservador", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "decencia", "🧡", "Coalicion de la Decencia", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "liberal", "❤", "Partido liberal", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "u", "💜", "Partido de la U", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "centro.democratico", "🖤", "Centro Democrático", undefined))
document.getElementById("partido_row").appendChild(make_option_column("partido", "cambio.radical", "💜", "Cambio Radical", undefined))