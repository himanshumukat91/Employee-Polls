export const GET_USERS = 'GET_USERS';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function getUsers(){
  return {
    type: GET_USERS,
  }
}

export function setCurrentUser(username){
  return {
    type: SET_CURRENT_USER,
    result: username
  }
}