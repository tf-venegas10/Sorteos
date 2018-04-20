import {Meteor} from 'meteor/meteor';
import {Random} from 'meteor/random';
import {assert} from 'chai';

import {Users} from './users.js';

// NOTE: Before writing a method like this you'll want to double check
// that this file is only going to be loaded in test mode!!
if (Meteor.isServer) {
    describe('users', () => {
        describe('methods', () => {

            beforeEach(function () {
                Users.remove({});
                Meteor.users.remove({});
                Accounts.createUser({
                    email: "test@test.com",
                    password: "testpa",
                    username: "test"
                }, (err)=>{
                    if(!err){
                        Users.insert({
                            userId: 1,
                            email: "test@test.com",
                            username: "test",
                            notifications: [],
                            online: true
                        });
                    }
                    else{
                        console.log("Error on add")
                    }
                });
            });

            it('can insert user', () => {
                Meteor.user().logout();
                Accounts.createUser({
                    email: "test1@test1.com",
                    password: "testpa",
                    username: "test1"
                },(err)=>{
                    Meteor.methods.call('appusers.insert', true);
                });
                assert.equal(Users.find().length(), 2)
            });

            it('can find user', () => {
                Meteor.methods.call('appusers.find', 1);
                let realUser = Users.find({userId: 1}).fetch();
                assert.isNotNull(realUser);
                assert.equal(realUser.userId, 1);
            });

            it('can set user offline', () => {
                Meteor.call('appusers.offline');
                let user = Users.find({userId:1});
                assert.isFalse(user.online);
            });

            it('can set user online', () => {
                Meteor.call('appusers.online');
                let user = Users.find({userId:1});
                assert.isTrue(user.online);
            });
        });
    });
}