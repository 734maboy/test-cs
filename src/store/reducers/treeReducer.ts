import { TreeAction, TreeActionTypes, TreeState } from '../../types/tree';
import { deepProjectUpdate } from '../../utils/utils';

const initState: TreeState = {
  projects: {
    id: 'root',
    name: 'ROOT',
    children: [
      {
        id: 'space-x-pro',
        name: 'SpacExPro',
        children: [
          {
            id: 'boomer',
            name: 'BOOMER',
            children: [],
            groups: [
              {
                id: 1,
                groupTitle: 'Summary',
                groupValue: 'Summary',
                groupProperties: {
                  projectDescription: 'lorem inpsum some inttrtrt',
                  projectStatus: 'In progress',
                  projectPeopleNumber: 35,
                },
              },
              {
                id: 2,
                groupTitle: 'Time',
                groupValue: 'Time',
                groupProperties: {
                  projectDaysEstimate: 180,
                  projectDaysEffort: 35,
                },
              },
              {
                id: 3,
                groupTitle: 'Business',
                groupValue: 'Business',
                groupProperties: {
                  projectBusinessValue: 3,
                  projectBudget: 315000,
                  projectBudgetCurrency: 'USD',
                  projectTeamCode: 35,
                },
              },
            ],
          },
        ],
        groups: [
          {
            id: 1,
            groupTitle: 'Summary',
            groupValue: 'Summary',
            groupProperties: {
              projectDescription: 'lorem inpsum some inttrtrt',
              projectStatus: 'In progress',
              projectPeopleNumber: 35,
            },
          },
          {
            id: 2,
            groupTitle: 'Time',
            groupValue: 'Time',
            groupProperties: {
              projectDaysEstimate: 180,
              projectDaysEffort: 35,
            },
          },
          {
            id: 3,
            groupTitle: 'Business',
            groupValue: 'Business',
            groupProperties: {
              projectBusinessValue: 3,
              projectBudget: 315000,
              projectBudgetCurrency: 'USD',
              projectTeamCode: 35,
            },
          },
        ],
      },
      {
        id: 'mobX-tail',
        name: 'MOBX-TAIL',
        children: [],
        groups: [
          {
            id: 1,
            groupTitle: 'Summary',
            groupValue: 'Summary',
            groupProperties: {
              projectDescription: 'lorem inpsum some inttrtrt',
              projectStatus: 'In progress',
              projectPeopleNumber: 35,
            },
          },
          {
            id: 2,
            groupTitle: 'Time',
            groupValue: 'Time',
            groupProperties: {
              projectDaysEstimate: 180,
              projectDaysEffort: 35,
            },
          },
          {
            id: 3,
            groupTitle: 'Business',
            groupValue: 'Business',
            groupProperties: {
              projectBusinessValue: 3,
              projectBudget: 315000,
              projectBudgetCurrency: 'USD',
              projectTeamCode: 35,
            },
          },
        ],
      },
    ],
    groups: [
      {
        id: 1,
        groupTitle: 'Summary',
        groupValue: 'Summary',
        groupProperties: {
          projectDescription: 'sd',
          projectStatus: 'In progress',
          projectPeopleNumber: 15,
        },
      },
      {
        id: 2,
        groupTitle: 'Time',
        groupValue: 'Time',
        groupProperties: {
          projectDaysEstimate: 180,
          projectDaysEffort: 35,
        },
      },
      {
        id: 3,
        groupTitle: 'Business',
        groupValue: 'Business',
        groupProperties: {
          projectBusinessValue: 5,
          projectBudget: 250000,
          projectBudgetCurrency: 'RUB',
          projectTeamCode: 35,
        },
      },
    ],
  },
  selectedProject: null,
  error: null,
};

export const treeReducer = (
  state: TreeState = initState,
  action: TreeAction
): TreeState => {
  switch (action.type) {
    case TreeActionTypes.EXPORT_DATA:
      return state;
    case TreeActionTypes.SET_SELECTED_PROJECT_PROPS:
      return { ...state, selectedProject: action.payload };
    case TreeActionTypes.IMPORT_PROJECTS_DATA:
      return { ...state, projects: action.payload, selectedProject: null };
    case TreeActionTypes.UPDATE_SELECTED_PROJECT: {
      const updatedTree = deepProjectUpdate(state.projects, action.payload);
      return { ...state, projects: { ...updatedTree } };
    }
    default:
      return state;
  }
};
