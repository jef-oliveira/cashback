import Person from './Person';

class Client extends Person {
  static collectionPath() { return 'clients'; }

  async beforeSave() {
    console.log('[CLIENT] will save ', this.name);
    if (this.initialCashback) {
      const trackingData = this.__trackingData('create');
      this.addTransaction({
        ...trackingData,
        createdAt: this.createdAt,
        date: this.createdAt,
        value: this.initialCashback
      });
      delete this.initialCashback;
    }
  }
}

export default Client;