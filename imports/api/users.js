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
            userId: Meteor.user()._id,
            email: Meteor.user().email,
            username: Meteor.user().username,
            notifications: [],
            online: auth
        });
    },

    'appusers.find'(userId){
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        return Users.findOne({userId:userId});
    },

    'appusers.offline'(){
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        Users.update({userId: Meteor.user()._id}, {$set: {online:false}});
    },

    'appusers.online'(){
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        Users.update({userId: Meteor.user()._id}, {$set: {online:true}});
    },

    'appusers.updateUserLocation'(location, tossID){
        check(location, String);
        check(tossID, String);
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        Users.update({userId: Meteor.user()._id}, {$set: {currLocation:location, currToss:tossID}});
    },

    'appusers.setNotificationsVerified'(){
        if (!this.userId) {
            throw new Meteor.Error("not-authorized");
        }
        Users.update({userId: Meteor.user()._id}, {$set:{notificationsVerified:true}})
    }
});

