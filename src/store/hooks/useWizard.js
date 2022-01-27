import { setWizard } from "_store/actions/wizardActions";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

export const useWizard = () => {
  const dispatch = useDispatch();
  const wizard = useSelector((state) => state.wizard);

  // List of Actions
  const setWizardTooltip = (data) => {
    dispatch(setWizard(data));
  };

  return {
    wizard,
    setWizardTooltip,
  };
};
