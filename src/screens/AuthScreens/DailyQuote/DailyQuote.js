import React, {useEffect} from 'react';
import {Story} from 'kvell-app-ui';
import {useUser} from '_store/hooks/useUser';
import {useTests} from '_store/hooks/useTests';

export default function DailyQuote({navigation}) {
  const {actionsUser, user} = useUser();
  const {actionsTests} = useTests();
  const message = user.dailyQuote;

  useEffect(() => {
    actionsUser.GetUserDailyQuote();
    if (global.testmode) {
      actionsTests.clearMoodChecklistWheel();
    }
  }, []);

  return (
    <Story
      quote={message.quotes}
      author={message.author || ' '}
      shareTitle="Check this quote"
      onFinish={(actionsUser, actionsUser.DisableQuote)}
    />
  );
}
