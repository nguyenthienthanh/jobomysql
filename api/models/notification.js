import firebase, { database } from 'firebase';
/**
 * User Model
 * @class User
 */
export default class Notification {
  constructor({sendAt, messages, recipientIds}) {
    this.id = database().ref().child('notification').push().key;
    this.sendAt = sendAt;
    this.messages = messages;
    this.recipientIds = recipientIds;
    this.createdAt = Date.now();
  }
}
