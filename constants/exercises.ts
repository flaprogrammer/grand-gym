export enum muscleGroups {
  chest = 'Грудь',
  legs = 'Ноги',
  back = 'Спина'
}

export interface IExercise {
  name: string
  groups: [string]
}

export const Exercises: IExercise[] = [
  {
    name: 'Жим штанги на горизонтальной скамье',
    groups: [muscleGroups.chest]
  }, {
    name: 'Жим штанги под -45°',
    groups: [muscleGroups.chest]
  }, {
    name: 'Жим штанги на Смите на горизонтальной',
    groups: [muscleGroups.chest]
  }, {
    name: 'Жим штанги на Смите под 45°',
    groups: [muscleGroups.chest]
  }, {
    name: 'Жим штанги на Смите под -45°',
    groups: [muscleGroups.chest]
  }, {
    name: 'Жим гантелей на горизонтальной скамье',
    groups: [muscleGroups.chest]
  }, {
    name: 'Жим гантелей под 45°',
    groups: [muscleGroups.chest]
  }, {
    name: 'Жим гантелей под -45°',
    groups: [muscleGroups.chest]
  }, {
    name: 'Разведение гантелей на горизонтальной скамье',
    groups: [muscleGroups.chest]
  }, {
    name: 'Разведение гантелей под -45°',
    groups: [muscleGroups.chest]
  }, {
    name: 'Приседания со штангой',
    groups: [muscleGroups.legs]
  }, {
    name: 'Подтягивания',
    groups: [muscleGroups.back]
  },
];
