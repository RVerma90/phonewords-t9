// types of action
const Types = {
  SELECT_WORD: "SELECT_WORD",
  DELETE_WORD: "DELETE_WORD"
};

// actions
const selectWord = word => ({
  type: Types.SELECT_WORD,
  payload: word
});


export default {
  selectWord,
  Types
};