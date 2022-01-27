import {useSelector} from 'react-redux';
import formatHelper from './formatHelper';

export const useHelperChecklist = () => {
  const userChecklistOptions = useSelector(
    state => state.user.userChecklistOptions,
  );
  const userCompletedActivities = useSelector(
    state => state.user.userCompletedActivities,
  );

  const userOptionsEdit = userChecklistOptions.map((item, index) => {
    const activity_object = {
      id: index,
      label: formatHelper.RemoveSlash(item.title),
      showOnList: item.show_on_list,
      done: false,
      default: true,
    };
    return activity_object;
  });

  const buildCheckListData = () => {
    const newData = [];
    if (
      userChecklistOptions &&
      (userCompletedActivities === null || userCompletedActivities?.length == 0)
    ) {
      userChecklistOptions.map((item, index) => {
        const activity_object = {
          id: index,
          label: formatHelper.RemoveSlash(item.title),
          showOnList: item.show_on_list,
          done: false,
          default: true,
        };
        newData.push(activity_object);
      });
    } else if (userCompletedActivities?.length > 0) {
      userCompletedActivities.map((item, index) => {
        const activity_object = {
          id: index,
          label: formatHelper.RemoveSlash(item.title),
          showOnList: true,
          done: item.is_checked,
          default: true,
        };

        newData.push(activity_object);
      });

      userChecklistOptions.map((item, index) => {
        const activity_object = {
          label: formatHelper.RemoveSlash(item.title),
          showOnList: item.show_on_list,
          done: false,
          default: true,
        };
        const indexFind = newData.findIndex(
          newItem => newItem.label === activity_object.label,
        );

        const exists = indexFind < 0 ? false : true;

        if (exists) {
          const sameShow =
            newData[indexFind].showOnList === activity_object.showOnList;
          if (!sameShow && !newData[indexFind].done) {
            activity_object.done = newData[indexFind].done;
            newData[indexFind] = activity_object;
          }
        } else {
          activity_object.id = newData.length;
          newData.push(activity_object);
        }
      });
    }

    return newData;
  };

  const actions = {
    buildCheckListData,
  };
  return {
    actions,
    userChecklistOptions,
    userCompletedActivities,
    userOptionsEdit,
  };
};
