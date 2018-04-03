
#' Calculate factor significance
#'
#' @param d encuestas
#' @param f factors
#'
#' @return a data frame with the xi square statistics
#'
factor_significance <- function(d, f) {
  f %>%
    `names<-`(f) %>%
    purrr::map_df(~ xi_square(d$demographics, .), .id = "factor") %>%
    arrange(desc(statistic))
}


  
#' Calculate xi square for a particular factor name
#'
#' @param x data frame with survey
#' @param y factor name as string
#' @param B number of replicates for Monte Carlo test
#'
#' @return a data frame with the xi square statistics
#' 
xi_square <- function(x, y, B = 10000){
  x %>%
    select(contains(y)) %>%
    as.matrix() %>% 
    round() %>% 
    chisq.test(rescale.p = T, simulate.p.value = T, B = B) %>%
    broom::tidy() %>%
    select(statistic, p.value)
}
