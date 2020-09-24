export interface ITraining {
  id: string,
  exercises: string[],
  results?: object,
  date?: Date,
  userWeight?: string
}

export interface IFinishedTraining {
  id: string,
  exercises: string[],
  results: object,
  userWeight: string,
  date: Date
}

