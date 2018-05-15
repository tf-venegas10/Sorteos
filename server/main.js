import { Meteor } from 'meteor/meteor';
import "../imports/api/tossUps.js";
import "../imports/api/users.js";

//Les recomiendo utilizar DDPRateLimiter para evitar que se les hagan llamados multiples en poco tiempo a los meteor methods o a las publicadiones
//De igual manera les recomiendo utilizar el package audit-argument-checks para que les avise cuando llaman meteor methods sin hacer check de los parametros.

Meteor.startup(() => {
  // code to run on server at startup
});
