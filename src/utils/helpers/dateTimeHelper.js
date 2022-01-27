import moment from 'moment';
import {dateFormats} from '_utils/constans/Constants';

class DateTimeHelper {
  // convert date to YYYY-MM-DD format ie: 2020-12-12
  ToRequestDateString = date => {
    return moment(date).format(dateFormats.SHORT_DATE);
  };
  FirstDayMonth = date => {
    return moment(date).startOf('month').format(dateFormats.SHORT_DATE);
  };
  LastDayMonth = date => {
    return moment(date).endOf('month').format(dateFormats.SHORT_DATE);
  };
  ToWeekDay = date => {
    return moment(date).format(dateFormats.WEEKDAY_NAME);
  };
  ToMonthDay = date => {
    return moment(date).format(dateFormats.MONTH_DAY);
  };
  ToLocalDate = date => {
    return moment(date).local().format(dateFormats.REGULAR_TIME);
  };
  ToUtcDate = date => {
    return moment(date).utc().format(dateFormats.SHORT_DATE);
  };
  LastSevenDays = date => {
    return moment(date).subtract(7, 'd').format(dateFormats.SHORT_DATE);
  };
}

export default new DateTimeHelper();
