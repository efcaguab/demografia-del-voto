function make_option(factor, level, img_src, option_title, option_text){
  
  // Make link
  var link = document.createElement("a")
  link.classList.add("action-button")
  link.classList.add("shiny-bound-input")
  link.classList.add("text-dark")
  link.setAttribute("href", "#!")
  link.setAttribute("onclick", "$('#carrousel_demography').carousel('next')")
  var button_id = "i_"
  link.id = button_id.concat(factor, "_", level)
  // Make image
  var image = document.createElement("img")
  image.classList.add("button_image")
  image.classList.add("img-fluid")
  image.setAttribute("border", "0")
  image.setAttribute("alt", option_title)
  image.setAttribute("src", img_src)
  // image.setAttribute("width", "100")
  // image.setAttribute("height", "100")
  // Add image to link
  link.appendChild(image)
  // Make title
  var title_element = document.createElement("h6")
  // title_element.classList.add("small")
  title_element.classList.add("my-2")
  title_element.innerText = option_title
  // Add title to link
  link.appendChild(title_element)
  // If there is explanation text add a tooltip
  if (option_text !== undefined){
    link.setAttribute("data-toggle", "tooltip")
    link.setAttribute("title", option_text)
  } else {
  }
  return link
}

function make_option_column(factor, level, img_src, option_title, option_text){
  var column_element = document.createElement("div")
  column_element.classList.add("col-4")
  column_element.classList.add("text-center")
  column_element.classList.add("pb-4")
  var column_id = factor.concat("_", level, "_col")
  column_element.id = column_id
  column_element.appendChild(make_option(factor, level, img_src, option_title, option_text))
  return column_element
}

function make_empty_option_column(){
  var column_element = document.createElement("div")
  column_element.classList.add("col")
  return column_element
}

function make_carousel_caption(caption_text){
  // Create caption
  var caption_text_element = document.createElement("h5")
  caption_text_element.classList.add("text-dark")
  caption_text_element.classList.add("my-0")
  caption_text_element.innerText = caption_text
  // Create caption div
  var caption_element = document.createElement("div")
  caption_element.classList.add("carousel-caption")
  caption_element.classList.add("carousel-caption-demography")
  caption_element.classList.add("py-2")
  caption_element.appendChild(caption_text_element)
  // Create top container
  var container_element = document.createElement("div")
  container_element.classList.add("container")
  container_element.classList.add("text-center")
  container_element.appendChild(caption_element)
  return container_element
}

document.getElementById("genero_row").appendChild(make_option_column("genero", "masculino", "www/img/em/man.svg", "Hombre", undefined))
document.getElementById("genero_row").appendChild(make_option_column("genero", "femenino", "www/img/em/woman.svg", "Mujer", undefined))
document.getElementById("genero_row").appendChild(make_option_column("genero", "neutral", "www/img/em/adult.svg", "meh..", undefined))
document.getElementById("genero_container").insertBefore(make_carousel_caption("Soy..."), document.getElementById("genero_container").childNodes[0])

document.getElementById("zona_row").appendChild(make_empty_option_column())
document.getElementById("zona_row").appendChild(make_option_column("zona", "urbano", "www/img/em/woman-office-worker.svg", "Urbana", undefined))
document.getElementById("zona_row").appendChild(make_option_column("zona", "rural", "www/img/em/woman-farmer.svg", "Rural", undefined))
document.getElementById("zona_row").appendChild(make_empty_option_column())
document.getElementById("zona_container").insertBefore(make_carousel_caption("vivo en zona"), document.getElementById("zona_container").childNodes[0])

document.getElementById("estrato_row").appendChild(make_option_column("estrato", "bajo", "www/img/em/house.svg", "Bajo", "Estrato 1 y 2"))
document.getElementById("estrato_row").appendChild(make_option_column("estrato", "medio", "www/img/em/house-with-garden.svg", "Medio", "Estrato 3"))
document.getElementById("estrato_row").appendChild(make_option_column("estrato", "alto", "www/img/em/castle.svg", "Alto", "Estrato 4, 5 y 6"))
document.getElementById("estrato_container").insertBefore(make_carousel_caption("en una casa de estrato"), document.getElementById("estrato_container").childNodes[0])

document.getElementById("edad_row").appendChild(make_option_column("edad", "18.24", "www/img/em/baby.svg", "18-24", undefined))
document.getElementById("edad_row").appendChild(make_option_column("edad", "25.44", "www/img/em/man.svg", "25-44", undefined))
document.getElementById("edad_row").appendChild(make_option_column("edad", "45", "www/img/em/old-man.svg", ">45", undefined))
document.getElementById("edad_container").insertBefore(make_carousel_caption("tengo..."), document.getElementById("edad_container").childNodes[0])

document.getElementById("region_row").appendChild(make_option_column("region", "bogota", "www/img/em/cityscape.svg", "Bogota", undefined))
document.getElementById("region_row").appendChild(make_option_column("region", "centrooriental", "www/img/em/national-park.svg", "Centro", "Boyacá, Caquetá, Cundinamarca, Huila, Meta, Tolima, Santander, Norte de Santander, Antioquia, Caldas, Quindío y Risaralda"))
document.getElementById("region_row").appendChild(make_option_column("region", "costas", "www/img/em/beach-with-umbrella.svg", "Costas", "Atlántico, Bolívar, Cesar, Cordoba, Guajira, Magdalena, Sucre, Valle, Cauca, Choco y Nariño"))
document.getElementById("region_container").insertBefore(make_carousel_caption("vivo en"), document.getElementById("region_container").childNodes[0])


document.getElementById("consulta_row").appendChild(make_option_column("consulta", "gran", "www/img/em/pig.svg", "Duque", "En la consulta de Duque, Ramírez y Ordoñez"))
document.getElementById("consulta_row").appendChild(make_option_column("consulta", "inclusion", "www/img/em/rat.svg", "Petro", "En la consulta de Petro y Caicedo"))
document.getElementById("consulta_row").appendChild(make_option_column("consulta", "no", "www/img/em/prohibited.svg", "Ninguna", "No vote por ninguna consulta o no vote en las elecciones de marzo"))
document.getElementById("consulta_container").insertBefore(make_carousel_caption("voté en la consulta de..."), document.getElementById("consulta_container").childNodes[0])







// document.getElementById("partido_row").appendChild(make_option_column("partido", "no", "💔", "Ningún partido", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "verde", "💚", "Partido verde", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "polo", "💛", "Polo", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "conservador", "💙", "Partido Conservador", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "decencia", "🧡", "Coalicion de la Decencia", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "liberal", "❤", "Partido liberal", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "u", "💜", "Partido de la U", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "centro.democratico", "🖤", "Centro Democrático", undefined))
// document.getElementById("partido_row").appendChild(make_option_column("partido", "cambio.radical", "💜", "Cambio Radical", undefined))