import { resetDatabase } from 'meteor/xolvio:cleaner';
import faker from 'faker';

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
Meteor.methods({
    'test.resetDatabase': () => resetDatabase(),
});

describe('my module', function (done) {
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