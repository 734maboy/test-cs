import {ProjectData, TreeAction, TreeActionTypes, TreeState} from "../../types/tree";


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
                  isOutsourceProject: true,
                }
              },
              {
                id: 2,
                groupTitle: 'Time',
                groupValue: 'Time',
                groupProperties: {
                  projectDaysEstimate: 180,
                  projectDaysEffort: 35,
                }
              },
              {
                id: 3,
                groupTitle: 'Business',
                groupValue: 'Business',
                groupProperties: {
                  projectBusinessValue: 3,
                  projectBudget: 315000,
                  projectBudgetCurrency: 'USD',
                  projectTeamCode: 35
                }
              },
            ]
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
              isOutsourceProject: true,
            }
          },
          {
            id: 2,
            groupTitle: 'Time',
            groupValue: 'Time',
            groupProperties: {
              projectDaysEstimate: 180,
              projectDaysEffort: 35,
            }
          },
          {
            id: 3,
            groupTitle: 'Business',
            groupValue: 'Business',
            groupProperties: {
              projectBusinessValue: 3,
              projectBudget: 315000,
              projectBudgetCurrency: 'USD',
              projectTeamCode: 35
            }
          },
        ]
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
              isOutsourceProject: true,
            }
          },
          {
            id: 2,
            groupTitle: 'Time',
            groupValue: 'Time',
            groupProperties: {
              projectDaysEstimate: 180,
              projectDaysEffort: 35,
            }
          },
          {
            id: 3,
            groupTitle: 'Business',
            groupValue: 'Business',
            groupProperties: {
              projectBusinessValue: 3,
              projectBudget: 315000,
              projectBudgetCurrency: 'USD',
              projectTeamCode: 35
            }
          },
        ]
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
          isOutsourceProject: false,
        }
      },
      {
        id: 2,
        groupTitle: 'Time',
        groupValue: 'Time',
        groupProperties: {
          projectDaysEstimate: 180,
          projectDaysEffort: 35,
        }
      },
      {
        id: 3,
        groupTitle: 'Business',
        groupValue: 'Business',
        groupProperties: {
          projectBusinessValue: 5,
          projectBudget: 250000,
          projectBudgetCurrency: 'RUB',
          projectTeamCode: 35
        }
      },
    ]
  },
  selectedProject: null,
  error: null
}

function deepProjectUpdate(project: ProjectData, modifiedProject: ProjectData): ProjectData {
  let updatedAll = Object.assign({}, project);
  if (project.id === modifiedProject.id) {
    return {...updatedAll, ...modifiedProject};
  } else {
    if (project.children.length > 0) {
      updatedAll.children = [];
      project.children.forEach((child) => {
        updatedAll.children.push((deepProjectUpdate(child, modifiedProject)));
      })
    }
  }
  return updatedAll;
}

export const treeReducer = (state: TreeState = initState, action: TreeAction): TreeState => {
  switch (action.type) {
    case TreeActionTypes.EXPORT_DATA:
      return state
    case TreeActionTypes.SET_SELECTED_PROJECT_PROPS:
      return {...state, selectedProject: action.payload}
    case TreeActionTypes.IMPORT_PROJECTS_DATA:
      return {...state, projects: action.payload, selectedProject: null}
    case TreeActionTypes.UPDATE_SELECTED_PROJECT: {
      let updatedTree = deepProjectUpdate(state.projects, action.payload);
      return {...state, projects: {...updatedTree}}
    }
    default:
      return state;
  }
}
