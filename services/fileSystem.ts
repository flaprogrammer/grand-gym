import AsyncStorage from '@react-native-community/async-storage';
import { ITraining, IFinishedTraining } from '../constants/trainings';
import { debounce } from 'debounce';
import moment from 'moment';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import * as store from './store';

const BACKUP_NAME = 'grandGymTrainingsHistoryBackup.json';

export async function exportFinishedTrainingsToFile() {
  if (FileSystem.documentDirectory != null) {
    try {
      const finishedTrainings = await store.getFinishedTrainings();
      await FileSystem.writeAsStringAsync(
        FileSystem.documentDirectory + BACKUP_NAME,
        JSON.stringify(finishedTrainings)
      );
      await Sharing.shareAsync(FileSystem.documentDirectory + BACKUP_NAME);
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log('no FileSystem.documentDirectory');
  }
}

export async function importFinishedTrainingsFromFile() {
  const importObject:any = await DocumentPicker.getDocumentAsync();
  if (!importObject || !importObject.uri) {
    console.log('import error');
    return;
  }
  const file:string = await FileSystem.readAsStringAsync(importObject.uri);
  try {
    let parsedFile:IFinishedTraining[] = JSON.parse(file);
    await store.mergeImportedTrainings(parsedFile);
  }
  catch (e) {
    console.log('Parse error');
  }
}


