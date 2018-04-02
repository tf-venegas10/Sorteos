import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

import {Users} from "./users.js";

export const TossUps = new Mongo.Collection('tossUps');


if (Meteor.isServer) {

    // This code only runs on the server

    Meteor.publish('sorteos', function tasksPublication() {

         let all=TossUps.find();
            if (all && all.length>0) {
                all.filter((tossup) => {
                    return (tossup.owners.includes(this.userId));
                });
            }
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

        });

    },

    'tossUps.remove'(tossUpId) {

        check(tossUpId, String);

        TossUps.remove(tossUpId);

    },

    'tossUps.addPerson'(tossUpId, userName, weight) {

        check(tossUpId, String);
        check(userName, String);

        let thisToss = TossUps.findOne({_id:tossUpId});
        let persons = thisToss.persons;
        let weights = thisToss.weightsPersons;
        persons.push(userName);
        weights.push(weight);
        TossUps.update({_id:tossUpId}, {$set: {persons: persons, weightsPersons:weights}});

    },

    'tossUps.addAction'(tossUpId, action, weight) {

        check(tossUpId, String);
        check(action, String);

        let thisToss = TossUps.findOne(tossUpId);
        let actions = thisToss.actions;
        let weights = thisToss.weightsActions;
        weights.push(weight);
        actions.push(action);
        TossUps.update({_id:tossUpId}, {$set: {actions: actions, weightsActions:weights}});

    },

     'tossUps.addResultP'(tossUpId, result) {

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

    },

    'tossUps.addResultA'(tossUpId, result) {

        check(tossUpId, String);

        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.resultsA;
        if(results) {
            results.push(result);
        } else{
            results=[result];
        }
        TossUps.update({_id:tossUpId}, {$set: {resultsA: results}});

    },

    'tossUps.addResultPandAs'(tossUpId, result) {

        check(tossUpId, String);

        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.resultsPandAs;
        if(results) {
            results.push(result);
        } else{
            results=[result];
        }
        TossUps.update({_id:tossUpId}, {$set: {resultsPandAs: results}});

    },

    'tossUps.addResult4All'(tossUpId, result) {

        check(tossUpId, String);

        let thisToss = TossUps.findOne(tossUpId);
        let results = thisToss.results4All;
        if(results) {
            results.push(result);
        } else{
            results=[result];
        }
        TossUps.update({_id:tossUpId}, {$set: {results4All: results}});

    },

    'tossUps.switchActions'(tossUpId, actions, weights){
        check(tossUpId, String);
        check(actions, Array);
        check(weights,Array);
        TossUps.update({_id:tossUpId}, {$set: {actions: actions, weightsActions:weights}});
    },

    'tossUps.switchPersons'(tossUpId, persons, weights){
        check(tossUpId, String);
        check(persons, Array);
        check(weights,Array);
        TossUps.update({_id:tossUpId}, {$set: {persons: persons, weightsPersons:weights}});
    },

    'tossUps.addOwner'(tossUpId, username) {

        check(tossUpId, String);
        check(username, String);

        let thisToss = TossUps.findOne(tossUpId);
        let owners = thisToss.owners;
        let user = Users.findOne({username: username});
        if(user) {
            if(!owners.includes(user._id)) {
                owners.push(user._id);
                TossUps.update({_id: tossUpId}, {$set: {owners: owners}});
            }else{
                throw new Error("The user specified is already owner");
            }
        }else{
            throw new Error("The user specified doesn't exist");
        }
    },

    'tossUps.deleteMyOwnership'(tossUpId){
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
    }

});