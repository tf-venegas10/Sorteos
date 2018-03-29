import {Meteor} from 'meteor/meteor';

import {Mongo} from 'meteor/mongo';

import {check} from 'meteor/check';

export const TossUps = new Mongo.Collection('tossUps');

if (Meteor.isServer) {

    // This code only runs on the server

    Meteor.publish('tossUps', function tasksPublication(userId) {

         let all=TossUps.find();
            if (all && all.length>0) {
                all.filter((tossup) => {
                    return (tossup.owners.indexOf(userId) !== -1);
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
            persons: [],
            createdAt: new Date(),
            owners: [this.userId],

            usernames: [Meteor.users.findOne(this.userId).username],

        });

    },

    'tossUps.remove'(tossUpId) {

        check(tossUpId, String);

        TossUps.remove(tossUpId);

    },

    'tossUps.addPerson'(tossUpId, personId, userName) {

        check(tossUpId, String);
        check(userName, String);

        let thisToss= TossUps.findOne(tossUpId);
        let persons= thisToss.persons;
        persons.push({userName:userName, id: personId});
        TossUps.update(tossUpId, {$set: {persons: persons}});

    },
    'tossUps.addAction'(tossUpId, action) {

            check(tossUpId, String);
            check(action, String);

            let thisToss= TossUps.findOne(tossUpId);
            let actions= thisToss.actions;
            actions.push(action);
            TossUps.update(tossUpId, {$set: {actions: actions}});

        },

});