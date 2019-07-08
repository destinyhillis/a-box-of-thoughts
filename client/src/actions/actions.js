import { REGISTER, LOGIN, LOGOUT, GET_USER, CREATE_BOARD, SELECTED_IMAGE, UPDATE_BOARD, 
  DELETE_BOARD, FIND_BOARD } from '../constants/action-types';

export function handleRegister(formData){
    return function(dispatch){
        return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users`, {
            method: "POST",
            body: JSON.stringify(formData),
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then(response => response.json())
            .then(json => { dispatch({ type: REGISTER, payload: json });
        })
    }
};

export function handleLogin(formData){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/users/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
      })
        .then(response => response.json())
        .then(res => {if(res.status === 200){ dispatch({ type: LOGIN, payload: res })}} )
  }
};

export function logout(){
  return function(dispatch){
    dispatch({ type: LOGOUT })
  }
};

export function getUser(){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => { dispatch({ type: GET_USER, payload: json })})
  }
};

export function createBoard(formData){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards`, {
      credentials: 'include',
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
          "Content-Type": "application/json"
      }
  })
    .then(response => response.json())
    .then(json => { dispatch({ type: CREATE_BOARD, payload: json })})
  }
};

export function selectedImageStateChange(newState){
  return ({ type: SELECTED_IMAGE, payload: newState })
};

export function deleteBoard(foundBoard){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${foundBoard}`, {
      method: "DELETE",
  })
  .then( dispatch({ type: DELETE_BOARD, payload: foundBoard }))

  }
};

export function findEditBoard(board){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${board}`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => { dispatch({ type: FIND_BOARD, payload: json })})
  }
}

export function editBoard(response){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${response}`, {
      method: "PUT",
      body: JSON.stringify(response),
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then( dispatch({ type: UPDATE_BOARD, payload: response })
  )
  }
};