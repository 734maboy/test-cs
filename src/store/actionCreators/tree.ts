import { Dispatch } from 'redux';
import { ProjectData, TreeAction, TreeActionTypes } from '../../types/tree';

export const setProjectData = (project: ProjectData) => {
  return async (dispatch: Dispatch<TreeAction>) => {
    dispatch({
      type: TreeActionTypes.SET_SELECTED_PROJECT_PROPS,
      payload: project,
    });
  };
};
