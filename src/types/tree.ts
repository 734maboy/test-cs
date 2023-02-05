
interface BaseProjectGroup {
  id: number;
  groupTitle: string;
  groupValue: string;
}

export interface ProjectSummaryProperties {
  projectDescription: string;
  projectStatus: string;
  projectPeopleNumber: number;
  isOutsourceProject: boolean;
}

export interface ProjectTimeProperties {
  projectDaysEstimate: number;
  projectDaysEffort: number;
}

export interface ProjectBusinessProperties {
  projectBusinessValue: number;
  projectBudget: number;
  projectBudgetCurrency: string;
  projectTeamCode: number;
}

export interface ProjectInfoGroup extends BaseProjectGroup{
  groupProperties: ProjectSummaryProperties;
}

export interface ProjectTimeGroup extends BaseProjectGroup{
  groupProperties: ProjectTimeProperties;
}

export interface ProjectBusinessGroup extends BaseProjectGroup{
  groupProperties: ProjectBusinessProperties;
}

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

export type TreeAction = GetProjectsData | SetProjectPropertiesAction | UpdateSelectedProjectAction | ImportProjectsDataAction;

export enum TreeActionTypes {
  EXPORT_DATA = "EXPORT_DATA",
  SET_SELECTED_PROJECT_PROPS = "SET_SELECTED_PROJECT_PROPS",
  UPDATE_SELECTED_PROJECT = "UPDATE_SELECTED_PROJECT",
  IMPORT_PROJECTS_DATA = "IMPORT_PROJECTS_DATA",
}

