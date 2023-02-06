import { ProjectData } from '../types/tree';

/**
 * Функция для поиска измененного объекта
 * @param project Объект где производится поиск объекта
 * @param modifiedProject Измененный объект, поиск которого производится
 */
export function deepProjectUpdate(
  project: ProjectData,
  modifiedProject: ProjectData
): ProjectData {
  const updatedAll = Object.assign({}, project);
  if (project.id === modifiedProject.id) {
    return { ...updatedAll, ...modifiedProject };
  } else {
    if (project.children.length > 0) {
      updatedAll.children = [];
      project.children.forEach((child) => {
        updatedAll.children.push(deepProjectUpdate(child, modifiedProject));
      });
    }
  }
  return updatedAll;
}
