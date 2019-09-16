import ACTIONS from "./action";
import _ from "lodash";

const defaultState = {
  message: []
};

const messageReducer = (state = defaultState, action) => {
  switch(action.type) {
    case ACTIONS.Types.SELECT_WORD: {

      let word = action.payload;
      let newWord = { id: state.message.length + 1, word: word };
      let newState = _.cloneDeep(state);
      
      newState.message.push(newWord);

      return newState;
    }

    default:
      return state;
  }
};

export default messageReducer;