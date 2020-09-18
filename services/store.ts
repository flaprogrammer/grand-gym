import AsyncStorage from '@react-native-community/async-storage';
import { v1 as uuid } from 'uuid';
import { ITraining } from '../constants/trainings';

const READY_TRAININGS = 'readyTrainings';


export async function getTrainings() {
  const trainingsString: string | null = await AsyncStorage.getItem(READY_TRAININGS);
  if (trainingsString) {
    return JSON.parse(trainingsString);
  }
  else return [];
}

export async function addTraining(selectedExercises: any[]) {
  let readyTrainings:ITraining[] = await getTrainings();
  readyTrainings = readyTrainings || [];
  const training: ITraining = {
    id: uuid(),
    exercises: selectedExercises
  };
  readyTrainings.push(training);
  await AsyncStorage.setItem(READY_TRAININGS, JSON.stringify(readyTrainings));
}

export async function deleteTraining(id: string) {
  let readyTrainings:ITraining[] = await getTrainings();
  readyTrainings = readyTrainings || [];
  readyTrainings = readyTrainings.filter(training => training.id !== id);
  return await AsyncStorage.setItem(READY_TRAININGS, JSON.stringify(readyTrainings));
}
