import {createNewFeedback, updateFeedback} from '_data/APIInterface';
import {useUser} from './useUser';

export const useFeedback = navigation => {
  const {user} = useUser();

  const createFeedback = async (location, score = null) => {
    let data = {
      userId: user.userId,
      location,
    };
    if (score) {
      data.score = score;
    }

    const res = await createNewFeedback(data);
    return res;
  };
  const updateFeedbackAction = async (id, feedbackText, score) => {
    let data = {
      id,
      feedbackText,
      score,
    };

    const res = await updateFeedback(data);
    return res;
  };
  const actionsFeedback = {
    createFeedback,
    updateFeedbackAction,
  };
  return {actionsFeedback};
};
