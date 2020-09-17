export enum muscleGroups {
  chest = 'Грудь',
  legs = 'Ноги',
  back = 'Спина'
}

export interface IExercise {
  key: string
  name: string
  groups: [string]
}

export const Exercises: IExercise[] = [
  {
    key: 'zhim-shtangi-horizontal',
    name: 'Жим штанги на горизонтальной скамье',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-shtangi-minus-45',
    name: 'Жим штанги под -45°',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-shtangi-smit-horizontal',
    name: 'Жим штанги на Смите на горизонтальной',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-shtangi-smit-45',
    name: 'Жим штанги на Смите под 45°',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-shtangi-smit-minus-45',
    name: 'Жим штанги на Смите под -45°',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-ganteley-horizontal',
    name: 'Жим гантелей на горизонтальной скамье',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-ganteley-45',
    name: 'Жим гантелей под 45°',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-ganteley-minus-45',
    name: 'Жим гантелей под -45°',
    groups: [muscleGroups.chest]
  }, {
    key: 'razvedenie-ganteley-horizontal',
    name: 'Разведение гантелей на горизонтальной скамье',
    groups: [muscleGroups.chest]
  }, {
    key: 'razvedenie-ganteley-minus-45',
    name: 'Разведение гантелей под -45°',
    groups: [muscleGroups.chest]
  }, {
    key: 'prisedaniya-shtanga',
    name: 'Приседания со штангой',
    groups: [muscleGroups.legs]
  }, {
    key: 'podtyagivaniya',
    name: 'Подтягивания',
    groups: [muscleGroups.back]
  },
];
