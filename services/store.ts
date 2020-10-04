import AsyncStorage from '@react-native-community/async-storage';
import { ITraining, IFinishedTraining } from '../constants/trainings';
import { debounce } from 'debounce';
import moment from 'moment';


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

export async function saveTrainingUserWeight(trainingId: string, userWeight: string) {
  const readyTrainings:ITraining[] = await getReadyTrainings();
  readyTrainings.forEach(training => {
    if (training.id === trainingId) {
      training.userWeight = userWeight;
    }
  });
  await AsyncStorage.setItem(READY_TRAININGS, JSON.stringify(readyTrainings));
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

export async function saveTrainingResultsDebounced(trainingId: string, results: any[]) {
  debounce(saveTrainingResults, 2000)(trainingId, results);
}

export async function deleteExerciseFromTraining(trainingId: string, exerciseKey: string) {
  const readyTrainings:ITraining[] = await getReadyTrainings();
  readyTrainings.forEach(training => {
    if (training.id === trainingId) {
      training.exercises = training.exercises.filter(e => e !== exerciseKey);
    }
  });
  await AsyncStorage.setItem(READY_TRAININGS, JSON.stringify(readyTrainings));
}

export async function addExerciseToTraining(trainingId: string, exerciseKey: string) {
  const readyTrainings:ITraining[] = await getReadyTrainings();
  readyTrainings.forEach(training => {
    if (training.id === trainingId) {
      training.exercises.push(exerciseKey)
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
    await deleteTraining(trainingId);
  }
}


// FINISHED TRAININGS

export async function getFinishedTrainings(reverse = false) {
  const trainingsString: string | null = await AsyncStorage.getItem(FINISHED_TRAININGS);
  if (trainingsString) {
    const trainings = JSON.parse(trainingsString);
    if (trainings && trainings.reverse) {
      if (reverse) {
        trainings.reverse();
      }
      return trainings;
    }
  }
  else return [];
}

export async function deleteFinishedTraining(date: Date) {
  let finishedTrainings:IFinishedTraining[] = await getFinishedTrainings();
  finishedTrainings = finishedTrainings || [];
  finishedTrainings = finishedTrainings.filter(training => training.date !== date);
  return await AsyncStorage.setItem(FINISHED_TRAININGS, JSON.stringify(finishedTrainings));
}

export async function sortFinishedTrainings() {
  let finishedTrainings:IFinishedTraining[] = await getFinishedTrainings();
  // @ts-ignore
  finishedTrainings = finishedTrainings.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf());
  return await AsyncStorage.setItem(FINISHED_TRAININGS, JSON.stringify(finishedTrainings));
}
