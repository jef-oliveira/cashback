import Person from './Person';

class Client extends Person {
  static collectionPath() { return 'clients'; }
}

export default Client;