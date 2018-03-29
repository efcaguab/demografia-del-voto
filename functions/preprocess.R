read_data <- function(x, factors, candidatos){
  
  encuesta <- read.csv(x) %>%
    mutate(candidato = as.character(candidato)) %>%
    dplyr::filter(candidato %in% candidatos) %>%
    mutate_if(is.numeric, function(x) x + 1)
  
  
  totals_2018_03_18 <- encuesta %>%
    select(candidato, X2018.03.18) %>%
    rename(total = X2018.03.18)
  
  columnas <- factors %>%
    map(~ names(encuesta)[str_detect(names(encuesta), .)]) %>%
    unlist()
  columnas <- c("candidato", columnas)
  
  encuesta_2018_03_18 <- encuesta %>% 
    select(-starts_with("X")) %>%
    select(columnas)
  
  list(demographics = encuesta_2018_03_18, totals = totals_2018_03_18)
}


as_proportion <- function(x, factors){
  x %>%
    map(~ mutate_if(., is.numeric, function(x) x / sum(x)))
}

expand_demographics <- function(x, factors){
  
  extract_second <- function(x){
    str_split_fixed(x, "_", 2)[,2]
  }
  
  e <- x$demographics
  
  for (i in 1:length(factors)){
    e <- e %>%
      tidyr::gather(UQ(paste0(factors[i], "_name")), UQ(paste0(factors[i], "_value")), contains(factors[i]))
  }
  
  e <- e %>% mutate_at(vars(contains("name")), extract_second)
  
  list(demographics = e, totals = x$totals)
}