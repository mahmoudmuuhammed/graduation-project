// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AgoraConfig } from 'angular-agora-rtc';

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyCPBUsCCVJ5j_AAHmKyMHLAc0Tgu7gQaQc",
    authDomain: "medkitc.firebaseapp.com",
    databaseURL: "https://medkitc.firebaseio.com",
    projectId: "medkitc",
    storageBucket: "medkitc.appspot.com",
    messagingSenderId: "155055518569",
    appId: "1:155055518569:web:b607e06a4bb3276a7203f8",
    measurementId: "G-QFC77J5M9S"
  },
  mapboxConfig: {
    apiKey: 'pk.eyJ1IjoibWFobW91ZDIyMzM5OSIsImEiOiJja2FwcXIzOXAwNHhqMnhwd2RyamRuZzFrIn0.Zy578QQBG6yZWla3XgM42w'
  }
  
  , agoraConfig: {
    AppID: '0aa38281b2a84016b2c5b0ed745d13a0',
  }
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
