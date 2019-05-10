export const FETCH_DATA = 'FETCH_DATA'
export const fetchData = () => {
  return {
    type: FETCH_DATA
  }
}

export const FETCH_DATA_LOGIN = 'FETCH_DATA_LOGIN'
export const fetchDataLogin = (value) => {
  return {
    type: FETCH_DATA_LOGIN,
    payload: value
  }
}

export const FETCH_PROFILE = 'FETCH_PROFILE'
export const fetchProfile = (value) => {
  return {
    type: FETCH_PROFILE,
    payload: value
  }
}


