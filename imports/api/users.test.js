import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'chai';

import {Users} from './users.js';

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
Meteor.methods({
    'test.resetDatabase': () => resetDatabase(),
});

describe('users', () => {
    describe('methods', () => {

        const userId = Random.id();

        beforeEach(function () {
            Users.remove({});
        });

        it('can insert user', () => {
            const insertUser = Meteor.server._methodHandlers['appusers.insert'];
            insertUser.apply(true);
            assert.equal(Users.find().count, 0)
        });

        it('can find user', () => {
            const findUser = Meteor.server._methodHandlers['appusers.find'];
            let user = findUser.apply(userId);
            assert.isNotNull(user);
            assert.equals(users.userId,userId);
        });

        it('can set user offline', ()=>{
            const setOffline = Meteor.server._methodHandlers['appusers.offline'];
            let user = setOffline.apply();
            assert.isTrue(user.online);
        });
    });
});