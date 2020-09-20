export interface ITraining {
  id: string,
  exercises: string[],
  results?: object,
  date?: Date
}

export interface IFinishedTraining {
  id: string,
  exercises: string[],
  results: object,
  date: Date
}

