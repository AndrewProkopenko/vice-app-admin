import axios from '../libs/axios'

export const GET_BY_ID = async (id) => (
    axios.get(`/lookup.php?i=${id}`)
)

export const GET_CATEGORIES = async () => (
    axios.get('/categories.php')
)

export const GET_AREA_LIST = async () => (
    axios.get('/list.php?a=list')
)

export const GET_CATEGORIES_LIST = async () => (
    axios.get('/list.php?c=list')
)

  
export const FILTER_BY_CATEGORY = async (category) => (
    axios.get(`/filter.php?c=${category}`)
)

export const FILTER_BY_AREA = async (area) => (
    axios.get(`/filter.php?a=${area}`)
)


export const GET_SINGLE_MEAL = async (id) => (
    axios.get(`/lookup.php?i=${id}`)
)

export const SEARCH_MEALS = async (query) => (
    axios.get(`/search.php?s=${query}`)
)

export const RANDON_MEAL = async () => (
    axios.get(`/random.php`)
)


 