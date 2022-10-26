import Person from './Person';

class User extends Person {
  static collectionPath() { return 'users'; }

  get registered() {
    return true;
  }
}

export default User;