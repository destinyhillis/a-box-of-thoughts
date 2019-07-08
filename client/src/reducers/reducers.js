import { REGISTER, LOGIN, LOGOUT, GET_USER, CREATE_BOARD, SELECTED_IMAGE, UPDATE_BOARD, DELETE_BOARD, FIND_BOARD } from "../constants/action-types";

const initialState = {
  loggedIn: false,
  currentUser: null,
  boards: [],
  renderBoardDetail: false,
  selectedImage: {},
  editBoard: {},
  };


export const rootReducer = (state = initialState, action) => {
  if (action.type === REGISTER) {
    return {
      loggedIn: true,
      currentUser: action.payload.data
    } 
  }
  if (action.type === LOGIN) {
    return {
      loggedIn: true,
      currentUser: action.payload.data
    } 
  }
  if (action.type === LOGOUT) {
    return {
      loggedIn: false,
      currentUser: null
    } 
  }
  if (action.type === GET_USER) {
    return Object.assign({}, state, { boards: action.payload.data.boards, renderBoardDetail: true })
  }
  if (action.type === CREATE_BOARD){
    console.log(state, 'create board')
    return Object.assign({}, state, { boards: state.boards.concat(action.payload.data) });
  }
  if (action.type === SELECTED_IMAGE){
    return Object.assign({}, state, { selectedImage: action.payload.data });
  }
  if (action.type === DELETE_BOARD){
    return Object.assign({}, state, { boards: state.boards.filter(board => board._id !== action.payload) });
  }
  if (action.type === UPDATE_BOARD){
    const addNewBoard = state.boards.map((board) => {
      if(board._id === action.payload.editBoardId){
        return {...board, title: action.payload.title, description: action.payload.description}
      } else return board
    })
    return Object.assign({}, state, { boards: addNewBoard })
  }
  if (action.type === FIND_BOARD) {
    return Object.assign({}, state, { editBoard: action.payload.data })
  }

  return state;
};

