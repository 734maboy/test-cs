/**
 * @typedef {Object} BaseProjectGroup
 * @property {number} id group Identificator
 * @property {string} groupTitle group title
 * @property {string} groupValue group value
 */
interface BaseProjectGroup {
  id: number;
  groupTitle: string;
  groupValue: string;
}

/**
 * @typedef {Object} ProjectSummaryProperties
 * @property {number} projectDescription description
 * @property {string} projectStatus project status
 * @property {string} projectPeopleNumber amount of people in project
 */
export interface ProjectSummaryProperties {
  projectDescription: string;
  projectStatus: string;
  projectPeopleNumber: number;
}

/**
 * @typedef {Object} ProjectTimeProperties
 * @property {number} projectDaysEstimate estimate of project job
 * @property {number} projectDaysEffort effort time of project job
 */
export interface ProjectTimeProperties {
  projectDaysEstimate: number;
  projectDaysEffort: number;
}

/**
 * @typedef {Object} ProjectBusinessProperties
 * @property {number} projectBusinessValue number of business value
 * @property {number} projectBudget budget of project
 * @property {string} projectBudgetCurrency using currency
 * @property {number} projectTeamCode internal team code
 */
export interface ProjectBusinessProperties {
  projectBusinessValue: number;
  projectBudget: number;
  projectBudgetCurrency: string;
  projectTeamCode: number;
}

export interface ProjectInfoGroup extends BaseProjectGroup {
  groupProperties: ProjectSummaryProperties;
}

export interface ProjectTimeGroup extends BaseProjectGroup {
  groupProperties: ProjectTimeProperties;
}

export interface ProjectBusinessGroup extends BaseProjectGroup {
  groupProperties: ProjectBusinessProperties;
}

export type TotalGroupProperties =
  | ProjectBusinessGroup
  | ProjectTimeGroup
  | ProjectInfoGroup;

/**
 * @typedef {Object} ProjectData
 * @property {string} name name of Project
 * @property {string} id unique identificator of project
 * @property {Array} groups project properties groups
 * @property {Array} children children elements of project
 */
export interface ProjectData {
  name: string;
  id: string;
  groups: [ProjectInfoGroup, ProjectTimeGroup, ProjectBusinessGroup];
  children: ProjectData[];
}

export interface TreeState {
  projects: ProjectData;
  selectedProject: ProjectData | null;
  error: null | string;
}

export interface SetProjectPropertiesAction {
  type: TreeActionTypes.SET_SELECTED_PROJECT_PROPS;
  payload: ProjectData;
}

export interface UpdateSelectedProjectAction {
  type: TreeActionTypes.UPDATE_SELECTED_PROJECT;
  payload: ProjectData;
}
export interface ImportProjectsDataAction {
  type: TreeActionTypes.IMPORT_PROJECTS_DATA;
  payload: ProjectData;
}

export interface GetProjectsData {
  type: TreeActionTypes.EXPORT_DATA;
}

export type TreeAction =
  | GetProjectsData
  | SetProjectPropertiesAction
  | UpdateSelectedProjectAction
  | ImportProjectsDataAction;

export enum TreeActionTypes {
  EXPORT_DATA = 'EXPORT_DATA',
  SET_SELECTED_PROJECT_PROPS = 'SET_SELECTED_PROJECT_PROPS',
  UPDATE_SELECTED_PROJECT = 'UPDATE_SELECTED_PROJECT',
  IMPORT_PROJECTS_DATA = 'IMPORT_PROJECTS_DATA',
}
