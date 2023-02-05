import {ProjectBusinessGroup, ProjectData, ProjectInfoGroup, ProjectTimeGroup} from "../types/tree";

const baseFields = [
  "id",
  "groupTitle",
  "groupValue",
  "groupProperties"
]

const summaryFields = [
  "projectDescription",
  "projectStatus",
  "projectPeopleNumber",
  "isOutsourceProject",
];

const timeFields = [
  "projectDaysEstimate",
  "projectDaysEffort",
];

const businessFields = [
  "projectBusinessValue",
  "projectBudget",
  "projectBudgetCurrency",
  "projectTeamCode",
];

function validateGroups(groups: [ProjectInfoGroup, ProjectTimeGroup, ProjectBusinessGroup]): boolean {
  function validateEachGroupProps(props: string[], conditionPropNames: string[]) {
    return conditionPropNames.every(prop => props.includes(prop));
  }

  let [summary, time, business] = groups;

  let summaryKeys = Object.keys(summary);
  let timeKeys = Object.keys(time);
  let businessKeys = Object.keys(business);

  if (validateEachGroupProps(summaryKeys, baseFields) &&
    validateEachGroupProps(timeKeys, baseFields) &&
    validateEachGroupProps(businessKeys, baseFields)) {

    let summaryProps = Object.keys(summary.groupProperties);
    let timeProps = Object.keys(time.groupProperties);
    let businessProps = Object.keys(business.groupProperties);
    return validateEachGroupProps(summaryProps, summaryFields) &&
      validateEachGroupProps(timeProps, timeFields) &&
      validateEachGroupProps(businessProps, businessFields);
  }

  return false;
}


export function simpleValidateParsedData(data: ProjectData): boolean {

  if (!(data.id && data.name)) return false;

  if (Array.isArray(data.groups) && data.groups.length === 3 && Array.isArray(data.children)) {
    let isGroupsValid = validateGroups(data.groups);
    let childrenValidateSet = new Set<boolean>();
    data.children.forEach((child) => {
      childrenValidateSet.add(simpleValidateParsedData(child));
    })
    return isGroupsValid && !childrenValidateSet.has(false);
  }
  return false;
}
