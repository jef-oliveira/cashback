import Firebase from 'fb';

class User extends Firebase.Model {
  static collectionPath() { return 'users'; }
}

export default User;