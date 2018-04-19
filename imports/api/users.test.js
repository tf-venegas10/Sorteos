import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'chai';

import {Users} from './users.js';

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
if(Meteor.isServer) {
    describe('users', () => {
        describe('methods', () => {

            const userId = Random.id();

            beforeEach(function () {
                Users.remove({});
                Users.insert({userId:1});
            });

            it('can insert user', () => {
                Meteor.methods.call('appusers.insert', true);
                assert.equal(Users.find().count(), 1)
            });

            it('can find user', () => {
                let user = Meteor.methods.call('appusers.find',1);
                let realUser=Users.find({userId:1});
                assert.isNotNull(user);
                assert.equals(user.userId, 1);
            });

            it('can set user offline', () => {
                const setOffline = Meteor.server._methodHandlers['appusers.offline'];
                let user = setOffline.apply();
                assert.isTrue(user.online);
            });
        });
    });
}