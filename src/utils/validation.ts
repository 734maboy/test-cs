import {
  ProjectBusinessGroup,
  ProjectData,
  ProjectInfoGroup,
  ProjectTimeGroup,
} from '../types/tree';

const baseFields = ['id', 'groupTitle', 'groupValue', 'groupProperties'];

const summaryFields = [
  'projectDescription',
  'projectStatus',
  'projectPeopleNumber',
];

const timeFields = ['projectDaysEstimate', 'projectDaysEffort'];

const businessFields = [
  'projectBusinessValue',
  'projectBudget',
  'projectBudgetCurrency',
  'projectTeamCode',
];

/**
 * Фукнция для валидации групп проекта
 * @param groups Массив групп для валидации
 */
function validateGroups(
  groups: [ProjectInfoGroup, ProjectTimeGroup, ProjectBusinessGroup]
): boolean {
  function validateEachGroupProps(
    props: string[],
    conditionPropNames: string[]
  ) {
    return conditionPropNames.every((prop) => props.includes(prop));
  }

  const [summary, time, business] = groups;

  const summaryKeys = Object.keys(summary);
  const timeKeys = Object.keys(time);
  const businessKeys = Object.keys(business);

  if (
    validateEachGroupProps(summaryKeys, baseFields) &&
    validateEachGroupProps(timeKeys, baseFields) &&
    validateEachGroupProps(businessKeys, baseFields)
  ) {
    const summaryProps = Object.keys(summary.groupProperties);
    const timeProps = Object.keys(time.groupProperties);
    const businessProps = Object.keys(business.groupProperties);
    return (
      validateEachGroupProps(summaryProps, summaryFields) &&
      validateEachGroupProps(timeProps, timeFields) &&
      validateEachGroupProps(businessProps, businessFields)
    );
  }

  return false;
}

/**
 * Функция валидации данных при импорте
 *  @param {ProjectData} data Объект для валидации
 */
export function simpleValidateParsedData(data: ProjectData): boolean {
  if (!(data.id && data.name)) return false;

  if (
    Array.isArray(data.groups) &&
    data.groups.length === 3 &&
    Array.isArray(data.children)
  ) {
    const isGroupsValid = validateGroups(data.groups);
    const childrenValidateSet = new Set<boolean>();
    data.children.forEach((child) => {
      childrenValidateSet.add(simpleValidateParsedData(child));
    });
    return isGroupsValid && !childrenValidateSet.has(false);
  }
  return false;
}
