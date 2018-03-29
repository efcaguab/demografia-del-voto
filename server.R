library(dplyr)
d <- readRDS("./data/demographics_df.rds")
source("./functions/calculate_probabilities.R")

call_compile <- function(e, t, ...){
  argumentos <- list(...)
  argumentos <- argumentos [unlist(lapply(argumentos, function(x) x != ""))]
  filtrado <- do.call(filtering, c(list(e = e, t = t), argumentos))
  compile(filtrado) %>%
    select(candidato, tot)
}

# Define server logic required to draw a histogram
server <- function(input, output) {
  output$candidate_rank <- renderTable({
    call_compile(d$demographics, d$totals, 
                 region = input$i_region, 
                 zona = input$i_zona, 
                 edad = input$i_edad,
                 partido = input$i_partido,
                 consulta = input$i_consulta,
                 estrato = input$i_estrato,
                 genero = input$i_genero)
  })
}
