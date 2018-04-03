if(!packrat:::isPackratModeOn()) packrat::on()

# workflow library
library(drake)
# required packages
require(dplyr)
require(tidyr)
require(stringr)
require(purrr)

f <- list.files("./functions", full.names = T) %>%
  map(source)

factors <- c("region", "zona", "estrato", "genero", "edad", "partido", "consulta")
candidatos <- c("duque", "petro", "fajardo", "vargas", "delacalle", "morales", "cordoba", "blanco")

prepare_data <- drake_plan(
  encuesta = read_data("./data/encuesta_2018-03-18.csv", factors, candidatos),
  encuesta_prop = as_proportion(encuesta),
  demographics_df = expand_demographics(encuesta_prop, factors),
  strings_in_dots = "literals"
)

write_data <- drake_plan(
  "./data/demographics_df.rds" = saveRDS(demographics_df, "./data/demographics_df.rds"),
  file_targets = T,
  strings_in_dots = "literals"
)

plan <- rbind(prepare_data, write_data)
project_config <- drake_config(plan)
vis_drake_graph(project_config, targets_only = T)
make(plan)


