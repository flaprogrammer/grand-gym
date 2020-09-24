export enum muscleGroups {
  chest = 'Грудь',
  legs = 'Ноги',
  back = 'Спина',
  deltas = 'Дельты',
  press = 'Пресс',
  hands = 'Руки'
}

export interface IExercise {
  key: string
  name: string
  groups: [string]
}

export const Exercises: IExercise[] = [
  // Грудь
  {
    key: 'zhim-shtangi-horizontal',
    name: 'Жим штанги на горизонтальной скамье',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-smit-horizontal',
    name: 'Жим Смите на горизонтальной',
    groups: [muscleGroups.chest]
  }, {
    key: 'zhim-smit-45',
    name: 'Жим на Смите под 45°',
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
    key: 'svedenie-ruk-krossover',
    name: 'Сведение рук на кроссовере',
    groups: [muscleGroups.chest]
  }, {
    key: 'svedenie-ruk-batterfly',
    name: 'Сведение рук на баттерфляй',
    groups: [muscleGroups.chest]
  },

  // Дельты
  {
    key: 'zhim-shtangi-stoya',
    name: 'Жим штанги стоя',
    groups: [muscleGroups.deltas]
  }, {
    key: 'zhim-ganteley-nad-golovoy',
    name: 'Жим гантелей над головой',
    groups: [muscleGroups.deltas]
  }, {
    key: 'razvedenie-ruk-batterfly',
    name: 'Разведение рук на баттерфляй',
    groups: [muscleGroups.deltas]
  },

  // Пресс
  {
    key: 'podnimanie-nog-visya',
    name: 'Поднимание ног вися',
    groups: [muscleGroups.press]
  }, {
    key: 'podnimanie-koleney-shved-stenka',
    name: 'Поднимание коленей на шведской стенке',
    groups: [muscleGroups.press]
  }, {
    key: 'skruchivanie-korpusa-na-skamie-45',
    name: 'Скручивание корпуса на скамье 45°',
    groups: [muscleGroups.press]
  },

  // Ноги
  {
    key: 'prisedaniya-shtanga',
    name: 'Приседания со штангой',
    groups: [muscleGroups.legs]
  }, {
    key: 'prisedaniya-gakk-trenajere',
    name: 'Приседания в Гакк тренажере',
    groups: [muscleGroups.legs]
  },  {
    key: 'prisedaniya-plie',
    name: 'Приседания плие',
    groups: [muscleGroups.legs]
  }, {
    key: 'zhim-nogami-v-trenajere',
    name: 'Жим ногами в тренажере',
    groups: [muscleGroups.legs]
  }, {
    key: 'sgibanie-nog-trenajer',
    name: 'Сгибание ног на тренажере',
    groups: [muscleGroups.legs]
  }, {
    key: 'rasgibanie-nog-trenajer',
    name: 'Разгибание ног на тренажере',
    groups: [muscleGroups.legs]
  },  {
    key: 'svedenie-nog-na-trenajere',
    name: 'Сведение ног на тренажере',
    groups: [muscleGroups.legs]
  }, {
    key: 'stanovaja-s-gantelyami',
    name: 'Становая с гантелями',
    groups: [muscleGroups.legs]
  }, {
    key: 'ikri-na-trenajere',
    name: 'Икры на тренажере',
    groups: [muscleGroups.legs]
  }, {
    key: 'vipadi-v-dvijenii',
    name: 'Выпады в движении',
    groups: [muscleGroups.legs]
  },

  // Спина
  {
    key: 'podtyagivaniya',
    name: 'Подтягивания',
    groups: [muscleGroups.back]
  }, {
    key: 'podtyagivaniya-obratnim-hvatom',
    name: 'Подтягивания обратным хватом',
    groups: [muscleGroups.back]
  },  {
    key: 'podtyagivaniya-gravotron',
    name: 'Подтягивания на гравитроне',
    groups: [muscleGroups.back]
  }, {
    key: 'tyaga-verhnego-bloka',
    name: 'Тяга верхнего блока',
    groups: [muscleGroups.back]
  }, {
    key: 'tyaga-k-jivotu-na-trenajere',
    name: 'Тяга к животу на тренажере',
    groups: [muscleGroups.back]
  }, {
    key: 'stanovaja-so-shtangoy',
    name: 'Становая со штангой',
    groups: [muscleGroups.back]
  },

  // Руки
  {
    key: 'frantsuzskiy-zhim',
    name: 'Французский жим',
    groups: [muscleGroups.hands]
  }
];
