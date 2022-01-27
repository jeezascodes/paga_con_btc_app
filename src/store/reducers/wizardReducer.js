const initialState = {
  isTabTooltipVisible: 0,
  scrollHeight: 0,
};

export const wizardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOOLTIP_VISIBLE": {
      return {
        ...state,
        isTabTooltipVisible: state.isTabTooltipVisible + 1,
        scrollHeight: !action.data ? state.scrollHeight : action.data,
      };
    }
    default:
      return state;
  }
};
