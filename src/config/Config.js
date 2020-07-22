import * as firebase from 'firebase';

// replace this with your credentials//
const firebaseConfig = {
    apiKey: "AIzaSyDpj3UAAuWs4mb0LR5wEOc2JlkZ4_Wb-cA",
    authDomain: "fir-withreact-fb164.firebaseapp.com",
    databaseURL: "https://fir-withreact-fb164.firebaseio.com",
    projectId: "fir-withreact-fb164",
    storageBucket: "fir-withreact-fb164.appspot.com",
    messagingSenderId: "969602719178",
    appId: "1:969602719178:web:39b537826f701a05350333",
    measurementId: "G-542P0EC578"
};
////////////////////////////////////////

const fire = firebase.initializeApp(firebaseConfig);

export default fire