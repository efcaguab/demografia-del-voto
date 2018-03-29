

filtering <- function(e, t, ...){
  filters <- c(...)
  if (length(filters) > 0){
    name_cols <- paste(names(filters), "name", sep = "_")
    value_cols <- paste(names(filters), "value", sep = "_")
    for(i in 1:length(filters)){
      filter_criteria <- lazyeval::interp(~y == x, .values=list(y = as.name(name_cols[i]), x = filters[i]))
      e <- e %>%
        filter_(filter_criteria)
    }
    keep_cols <- c("candidato", name_cols, value_cols)
    e <- e %>% select(!!!keep_cols)
    distinct(e)
  } else {
    t
  }
}

compile <- function(x){
  y <- x %>%
    select_if(is.numeric) %>%
    mutate(tot = Reduce(`*`, .)) %>%
    mutate(tot = tot / sum(tot))
  bind_cols(select_if(x, is.character), y)
}

# a <- e %>%
#   split(list(.$region_name, .$zona_name, .$estrato_name, .$genero_name, .$edad_name, .$partido_name, .$consulta_name)) %>%
#  map_df(~compile(.))
# 
# a %>% 
#   ggplot(aes(x = candidato, y = qlogis(tot))) + 
#   geom_boxplot()
# 
# a %>% 
#   ggplot(aes(x = candidato, y = rank)) + 
#   geom_boxplot()
