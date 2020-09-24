import AsyncStorage from '@react-native-community/async-storage';
import { ITraining, IFinishedTraining } from '../constants/trainings';

const READY_TRAININGS = 'readyTrainings';
const FINISHED_TRAININGS = 'finishedTrainings';

// READY TRAININGS
export async function getReadyTrainings() {
  const trainingsString: string | null = await AsyncStorage.getItem(READY_TRAININGS);
  if (trainingsString) {
    return JSON.parse(trainingsString);
  }
  else return [];
}

export async function getTrainingById(id: string) {
  const readyTrainings:ITraining[] = await getReadyTrainings();
  return readyTrainings.find(t => t.id === id) || null;
}

export async function addTraining(selectedExercises: any[]) {
  let readyTrainings:ITraining[] = await getReadyTrainings();
  readyTrainings = readyTrainings || [];
  const training: ITraining = {
    id: (+new Date()).toString(),
    exercises: selectedExercises
  };
  readyTrainings.push(training);
  await AsyncStorage.setItem(READY_TRAININGS, JSON.stringify(readyTrainings));
}

export async function deleteTraining(id: string) {
  let readyTrainings:ITraining[] = await getReadyTrainings();
  readyTrainings = readyTrainings || [];
  readyTrainings = readyTrainings.filter(training => training.id !== id);
  return await AsyncStorage.setItem(READY_TRAININGS, JSON.stringify(readyTrainings));
}

export async function saveTrainingResults(trainingId: string, results: any[]) {
  const readyTrainings:ITraining[] = await getReadyTrainings();
  readyTrainings.forEach(training => {
    if (training.id === trainingId) {
      training.results = results;
    }
  });
  await AsyncStorage.setItem(READY_TRAININGS, JSON.stringify(readyTrainings));
}

export async function finishTraining(trainingId: string) {
  let readyTraining:ITraining | null = await getTrainingById(trainingId);
  let finishedTrainings:ITraining[] = await getFinishedTrainings();
  if (readyTraining) {
    readyTraining.date = new Date();
    finishedTrainings.push(readyTraining);
    await AsyncStorage.setItem(FINISHED_TRAININGS, JSON.stringify(finishedTrainings));
  }
}


// FINISHED TRAININGS

export async function getFinishedTrainings() {
  const trainingsString: string | null = await AsyncStorage.getItem(FINISHED_TRAININGS);
  if (trainingsString) {
    return JSON.parse(trainingsString);
  }
  else return [];
}

export async function deleteFinishedTraining(date: Date) {
  let finishedTrainings:IFinishedTraining[] = await getFinishedTrainings();
  finishedTrainings = finishedTrainings || [];
  finishedTrainings = finishedTrainings.filter(training => training.date !== date);
  return await AsyncStorage.setItem(FINISHED_TRAININGS, JSON.stringify(finishedTrainings));
}
