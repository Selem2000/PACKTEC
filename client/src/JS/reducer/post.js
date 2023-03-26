import { FAILD_POST, GET_ALL_POSTS, LOAD_POST } from "../constants/post";

const initialState = {
  posts: [],
  load: false,
  errors: [],
};

const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_POST:
      return { ...state, load: true };
    case GET_ALL_POSTS:
      console.log(state);

      return { ...state, posts: payload.Posts, load: false };
    case FAILD_POST:
      return { ...state, errors: payload, load: false };
    case "VIDE_ERRORS":
      return { ...state, errors: [] };
    default:
      return state;
  }
};

export default postReducer;
