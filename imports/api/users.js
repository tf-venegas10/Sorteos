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
            online: auth
        });
    },

    'appusers.find'(userId){
        return Users.findOne({userId:userId});
    },

    'appusers.offline'(){
        Users.update({userId: Meteor.user()._id}, {$set: {online:false}});
    },

    'appusers.online'(){
        Users.update({userId: Meteor.user()._id}, {$set: {online:true}});
    }
});

