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
                    return (tossup.owners.indexOf(this.userId) !== -1);
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


        TossUps.insert({
            name: name,
            actions: [],
            persons: [this.userName],
            weightsPersons: [1],
            weightsActions: [],
            createdAt: new Date(),
            owners: [this.userId],

            usernames: [this.username],//[Meteor.users.findOne(this.userId).username],

        });

    },

    'tossUps.remove'(tossUpId) {

        check(tossUpId, String);

        TossUps.remove(tossUpId);

    },

    'tossUps.addPerson'(tossUpId, userName, weight) {

        check(tossUpId, String);
        check(userName, String);

        let thisToss = TossUps.findOne({ObjectID:tossUpId});
        console.log(thisToss);
        let persons = thisToss.persons;
        let weights = thisToss.weightsPersons;
        persons.push(userName);
        weights.push(weight);
        TossUps.update({ObjectID:tossUpId}, {$set: {persons: persons, weightsPersons:weights}});

    },

    'tossUps.addAction'(tossUpId, action, weight) {

        check(tossUpId, String);
        check(action, String);

        let thisToss = TossUps.findOne(tossUpId);
        let actions = thisToss.actions;
        let weights = thisToss.weightsActions;
        weights.push(weight);
        actions.push(action);
        TossUps.update(tossUpId, {$set: {actions: actions, weightsActions:weights}});

    },
    'tossUps.switchActions'(tossUpId, actions){
        check(tossUpId, String);
        check(actions, Array);
        TossUps.update(tossUpId, {$set: {actions: actions}});
    },
    'tossUps.switchPersons'(tossUpId, persons){
        check(tossUpId, String);
        check(persons, Array);
        TossUps.update(tossUpId, {$set: {persons: persons}});
    },

    'tossUps.addOwner'(tossUpId, username) {

        check(tossUpId, String);
        check(username, String);

        let thisToss = TossUps.findOne(tossUpId);
        let owners = thisToss.owners;
        let userId = Users.findOne({username: username}).userId;
        owners.push(userId);
        TossUps.update(tossUpId, {$set: {owners: owners}});
    },

});