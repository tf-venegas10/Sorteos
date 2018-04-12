import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import {Users} from "./users.js";

export const TossUps = new Mongo.Collection('tossUps');


if (Meteor.isServer) {

    // This code only runs on the server

    Meteor.publish('sorteos', function tasksPublication() {

        let all=TossUps.find({owners: this.userId},{sort: {createdAt: -1} });

        return all;
    });

}

Meteor.methods({

    'tossUps.insert'(name) {

        check(name, String);


        // Make sure the user is logged in before inserting a tossUp

        if (!this.userId) {

            throw new Meteor.Error('not-authorized');

        }
        let userName = Meteor.call("appusers.find", this.userId);
        //TODO: add username
        TossUps.insert({
            name: name,
            actions: [],
            persons: [],
            weightsPersons: [],
            weightsActions: [],
            createdAt: new Date(),
            owners: [this.userId],
            resultsP:[],
            resultsA:[],
            resultsPandAs:[],
            results4All:[],
            usernames: [],//[Meteor.users.findOne(this.userId).username],
            spinAnglePerson:0,
            spinAngleAction:0,
            spinAnglePandAs:0


        });

    },

    'tossUps.remove'(tossUpId, callback) {

        check(tossUpId, String);

        TossUps.remove(tossUpId);
        if(callback){
            callback();
        }

    },

    'tossUps.addPerson'(tossUpId, userName, weight, callback) {

        check(tossUpId, String);
        check(userName, String);

        let thisToss = TossUps.findOne({_id:tossUpId});
        let persons = thisToss.persons;
        let weights = thisToss.weightsPersons;
        persons.push(userName);
        weights.push(weight);
        TossUps.update({_id:tossUpId}, {$set: {persons: persons, weightsPersons:weights}});
        if(callback){
            callback();
        }

    },

    'tossUps.addAction'(tossUpId, action, weight, callback) {

        check(tossUpId, String);
        check(action, String);

        let thisToss = TossUps.findOne(tossUpId);
        let actions = thisToss.actions;
        let weights = thisToss.weightsActions;
        weights.push(weight);
        actions.push(action);
        TossUps.update({_id:tossUpId}, {$set: {actions: actions, weightsActions:weights}});
        if(callback){
            callback();
        }

    },

     'tossUps.addResultP'(tossUpId, result, callback) {

        check(tossUpId, String);
        //do checking

        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.resultsP;
         if(results) {
             results.push(result);
         } else{
             results=[result];
         }
         TossUps.update({_id:tossUpId}, {$set: {resultsP: results}});
         if(callback){
             callback();
         }

    },

    'tossUps.addResultA'(tossUpId, result, callback) {

        check(tossUpId, String);

        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.resultsA;
        if(results) {
            results.push(result);
        } else{
            results=[result];
        }
        TossUps.update({_id:tossUpId}, {$set: {resultsA: results}});
        if(callback){
            callback();
        }

    },

    'tossUps.addResultPandAs'(tossUpId, result, callback) {

        check(tossUpId, String);

        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.resultsPandAs;
        if(results) {
            results.push(result);
        } else{
            results=[result];
        }
        TossUps.update({_id:tossUpId}, {$set: {resultsPandAs: results}});
        if(callback){
            callback();
        }
    },

    'tossUps.addResult4All'(tossUpId, result, callback) {

        check(tossUpId, String);
        check(result,Array);

        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.results4All;
        let timesThrown= thisToss.timesThrown;
        if(timesThrown){
            timesThrown++;
        }
        else{
            timesThrown=1;
        }
        if(results) {
            results.push(result);
        } else{
            results=[result];
        }
        TossUps.update({_id:tossUpId}, {$set: {results4All: [result], timesThrown:timesThrown}});
        if(callback){
            callback();
        }

    },
    'tossUps.spinPerson'(tossUpId, spinTime, booleanVal, startAngle, callback) {

        check(tossUpId, String);
        check(spinTime,Number);
        check(booleanVal,Boolean);
        check(startAngle,Number);


        TossUps.update({_id:tossUpId}, {$set: {spinPerson: booleanVal, spinTimePerson:spinTime, spinAnglePerson:startAngle}});
        if(callback){
            callback();
        }

    },'tossUps.spinAction'(tossUpId, spinTime, booleanVal,  startAngle,callback) {

        check(tossUpId, String);
        check(spinTime,Number);
        check(booleanVal,Boolean);
        check(startAngle,Number);


        TossUps.update({_id:tossUpId}, {$set: {spinAction: booleanVal, spinTimeAction:spinTime, spinAngleAction:startAngle}});
        if(callback){
            callback();
        }

    },'tossUps.spinPandAs'(tossUpId, spinTime,booleanVal,  startAngle,chosenOne,callback) {

        check(tossUpId, String);
        check(spinTime,Number);
        check(booleanVal,Boolean);
        check(startAngle,Number);
        check(chosenOne,String);


        TossUps.update({_id:tossUpId}, {$set: {spinPandAs: booleanVal, spinTimePandAs:spinTime, spinAnglePandAs: startAngle, chosenOne:chosenOne}});
        if(callback){
            callback();
        }

    },
    "tossUps.checkItem"(tossUpId, id, callback){
        check(tossUpId, String);
        check(id,Number);
        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.results4All[0];
        let changedResult=results[id];
        changedResult.checked=!changedResult.checked;
        TossUps.update({_id:tossUpId}, {$set: {results4All: [results]}});
        if(callback){
            callback();
        }

    },
    'tossUps.switchActions'(tossUpId, actions, weights, callback){
        check(tossUpId, String);
        check(actions, Array);
        check(weights,Array);
        TossUps.update({_id:tossUpId}, {$set: {actions: actions, weightsActions:weights}});
        if(callback){
            callback();
        }
    },

    'tossUps.switchPersons'(tossUpId, persons, weights, callback){
        check(tossUpId, String);
        check(persons, Array);
        check(weights,Array);
        TossUps.update({_id:tossUpId}, {$set: {persons: persons, weightsPersons:weights}});
        if(callback){
            callback();
        }
    },

    'tossUps.addOwner'(tossUpId, username, callback) {

        check(tossUpId, String);
        check(username, String);

        let thisToss = TossUps.findOne(tossUpId);
        let owners = thisToss.owners;
        let user = Users.findOne({username: username});
        if(user) {
            if(!owners.includes(user.userId)) {
                owners.push(user.userId);
                TossUps.update({_id: tossUpId}, {$set: {owners: owners}});
            }else{
                throw new Error("The user specified is already owner");
            }
        }else{
            throw new Error("The user specified doesn't exist");
        }
        if(callback){
            callback();
        }
    },

    'tossUps.deleteMyOwnership'(tossUpId, callback){
        let owners=TossUps.findOne(tossUpId).owners;
        let newOwners=[];
        owners.forEach((o)=>{
            if(o!==this.userId){
                newOwners.push(o);
            }
        });
        if(newOwners.length===0){
            TossUps.remove(tossUpId);
        }
        else {
            TossUps.update({_id: tossUpId}, {$set: {owners: newOwners}});
        }
        if(callback){
            callback();
        }
    },

});