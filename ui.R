width_select_inputs <- "100%"

htmlTemplate(
  "demografia_template.html",
  # inputs
  input_region = 
    selectInput("i_region", 
                label = "",
                choices = list("En qué región vive?" = "",
                               Bogota = "bogota", 
                               Norte = "norte", 
                               Centrooriental = "centrooriental", 
                               Cafetera = "cafetera", 
                               Suroccidental = "suroccidental"), 
                width = width_select_inputs),
  input_zona = 
    selectInput("i_zona", 
                label = "", 
                choices = list("Zona urbana o rural?" = "",
                               Rural = "rural", 
                               Urbana = "urbano"),
                width = width_select_inputs),
  input_estrato = 
    selectInput("i_estrato",
                label = "", 
                choices = list("Estrato?" = "",
                               "Bajo (1 y 2)" = "bajo",
                               "Medio (3)" = "medio", 
                               "Alto (4, 5 o 6)" = "alto"), 
                width = width_select_inputs),
  input_genero = 
    selectInput("i_genero",
                label = "", 
                choices = list("Hombre o mujer?" = "",
                               "Hombre" = "masculino",
                               "Mujer" = "femenino"), 
                width = width_select_inputs),
  input_edad = 
    selectInput("i_edad",
                label = "", 
                choices = list("Edad?" = "",
                               "De 18 a 24 años" = "18.24",
                               "De 25 a 34 años" = "25.34",
                               "De 35 a 44 años" = "35.44",
                               "De 45 a 54 años" = "45.54",
                               "Más de 55 años" = "55"), 
                width = width_select_inputs),
  input_partido = 
    selectInput("i_partido",
                label = "", 
                choices = list("A que partido pertenece?" = "",
                               "Ningun partido" = "no",
                               "Cambio Radical" = "cambio.radical",
                               "Centro Democrático" = "centro.democratico",
                               "Coalición lista de la decencia" = "decencia",
                               "Partido de la U" = "u",
                               "Partido Conservador" = "conservador",
                               "Partido Liberal" = "liberal",
                               "Partido Verde" = "verde",
                               "Polo Democrático Alternativo" = "polo"), 
                width = width_select_inputs),
  input_consulta = 
    selectInput("i_consulta",
                label = "", 
                choices = list("Votó en las elecciones de Marzo?" = "",
                               "Si, pero no en ninguna consulta" = "no.consulta",
                               "Si, en la consulta de Duque, Ramírez y Ordoñez" = "gran",
                               "Si, en la consulta de Petro y Caicedo" = "inclusion",
                               "No" = "no.voto"), 
                width = width_select_inputs),


# outputs -----------------------------------------------------------------

candidate_rank = tableOutput("candidate_rank"),
buttons_test = textOutput("buttons_out")
)

