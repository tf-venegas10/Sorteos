import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import {Users} from './users.js';

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
Meteor.methods({
    'test.resetDatabase': () => resetDatabase(),
});

describe('users', function (done) {
    describe('methods',()=>{
        beforeEach(function (done) {
            // We need to wait until the method call is done before moving on, so we
            // use Mocha's async mechanism (calling a done callback)
            Meteor.call('test.resetDatabase', done);

            Factory.define('tossUps', TossUps, {
                listId: () => Factory.get('list'),
                text: () => faker.lorem.sentence(),
                createdAt: () => new Date(),
            });

        });
    });
});