import moment from 'moment';
import {dateFormats, LimitDaysEditChecklist} from '_utils/constans/Constants';
import {Colors} from '_utils/styles';
import {FixedColors, colorByMood} from '_utils/styles/colors';

export const formatDate = date => {
  return moment(date).format(dateFormats.SHORT_DATE);
};
export const addDay = (date, days) => {
  return moment(date).add(days, 'd');
};

export const getDisabledDates = month => {
  const fromDate = addDay(formatDate(), 1);
  const toDate = moment(month).add(2, 'month').endOf('month');
  const diff = toDate.diff(fromDate, 'd');
  const range = [];
  for (let i = 0; i < diff; i++) {
    range.push(moment(fromDate).add(i, 'd'));
  }
  return range;
};

export const marketDays = (data = [], theme, month, selectedDate) => {
  const sortData = data.sort((a, b) => moment(a?.date) > moment(b?.date));
  let market = {};
  const today = formatDate(selectedDate);

  sortData.map((item, index, array) => {
    const date = formatDate(item.date);
    let startingDay = true;
    let endingDay = true;
    const dayBefore = formatDate(addDay(item.date, -1));
    const dayAfter = formatDate(addDay(item.date, 1));
    const indexAfter = array[index + 1]
      ? formatDate(array[index + 1]?.date)
      : null;
    const indexBefore = array[index - 1]
      ? formatDate(array[index - 1]?.date)
      : null;
    if (indexAfter === dayAfter || indexBefore === dayBefore) {
      startingDay = indexAfter === dayAfter && indexBefore !== dayBefore;
      endingDay = indexAfter !== dayAfter && indexBefore === dayBefore;
    }
    const marketDay = today === date;
    market[date] = {
      selected: item.checklistData !== null,
      marked: item.diaryData !== null,
      color: Colors(theme).selectedCalendar,
      startingDay: startingDay,
      endingDay: endingDay,
      selectedDate: marketDay,
      selectedColor: Colors(theme).cardColor,
      dotColor:
        item.mood !== null ? colorByMood(item.mood) : Colors(theme).dotColor,
    };
  });
  const todayExists =
    sortData.filter(item => formatDate(item.date) === today).length > 0;
  if (!todayExists) {
    market[today] = {
      selectedDate: true,
      startingDay: true,
      selectedColor: Colors(theme).background,
      endingDay: true,
    };
  }

  const daysDisabled = getDisabledDates(month);

  daysDisabled.map(item => {
    const date = formatDate(item);
    market[date] = {
      disableTouchEvent: true,
      textColor: FixedColors().disabledCalendar,
    };
  });
  return market;
};

export const getEnabledEdit = selectedDay => {
  const today = formatDate();
  const selected = formatDate(selectedDay);
  const dayBefore = formatDate(addDay(today, -LimitDaysEditChecklist));

  if (selected >= dayBefore) {
    return true;
  } else {
    return false;
  }
};
