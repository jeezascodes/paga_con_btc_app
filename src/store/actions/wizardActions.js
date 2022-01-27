const ACTIONS = {
  SET_TOOLTIP_VISIBLE: "SET_TOOLTIP_VISIBLE",
};

export const setWizard = (data) => {
  return { type: ACTIONS.SET_TOOLTIP_VISIBLE, data };
};
