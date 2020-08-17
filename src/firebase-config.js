import * as firebase from 'firebase/app';
import 'firebase/auth';

const app = {
  apiKey: 'AIzaSyBIMErHqr623c4QZcuFHjLYteoATkoxQsc',
  authDomain: 'burger-queen-6172d.firebaseapp.com',
  databaseURL: 'https://burger-queen-6172d.firebaseio.com',
  projectId: 'burger-queen-6172d',
  storageBucket: 'burger-queen-6172d.appspot.com',
  messagingSenderId: '390103630935',
  appId: '1:390103630935:web:42d80d1a225f1f60eb8f12',
};
firebase.initializeApp(app);
export default firebase;
