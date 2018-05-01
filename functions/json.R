
json_demographics <- function(x, factors){
  factors_df_split <- foreach(i=1:length(factors)) %do% {
    factor_df <- x$demographics %>%
      select(candidato, contains(factors[i]))
    factor_categ <- names(factor_df)[-1]
    factor_df_split <- foreach(j=1:length(factor_categ)) %do% {
      factor_df %>%
        select(candidato, contains(factor_categ[j])) %>%
        rename_column_2()
    }
    categ_names <- factor_categ %>%
      stringr::str_split("_") %>%
      purrr::map(~ .[2]) %>%
      unlist()
    names(factor_df_split) <- categ_names
    factor_df_split
  }
  names(factors_df_split) <- factors
  
  # jsonlite::toJSON(factors_df_split)
  factors_df_split
}

json_totals <- function(x){
  x$totals %>%
    rename_column_2() 
}
rename_column_2 <- function(x, name = "value"){
  names(x)[2] <- "value"
  x
}
