import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Users = new Mongo.Collection("appusers");

if(Meteor.isServer){
    Meteor.publish("appusers",()=>{
        return Users.find();
    });
}

Meteor.methods({
    'appusers.insert'(auth) {

        check(auth,Boolean);

        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        Users.insert({
            userId: Meteor.userId,
            email: Meteor.user().email,
            username: Meteor.user().username
        });
    },
});

