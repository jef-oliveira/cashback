import Firebase from 'fb';

class Person extends Firebase.Model {
  constructor(doc) {
    super(doc);

    if (!this.transactions)
      this.transactions = [];

    this.__cashbackBalance = this.__getCashbackBalanceFromTransactions();
    this.__lastTransaction = this.__getMostRecentTransaction();
  }

  static filter(list, filter) {
    if (filter.by === 'name') {
      if (filter.value?.length) {
        const filterTemrs = filter.value.toLowerCase().split(' ').filter(term => term.trim().length);
        return list.filter(person => filterTemrs.every(term => person.name.trim().toLowerCase().includes(term)));
      }
    }

    return list;
  }

  static sort(list, sorting) {
    if (sorting)
      return list.sort(function(c1, c2) {
        const firstPropValue = sorting.direction === 'asc' ? c1[sorting.by] : c2[sorting.by];
        const secondPropValue = sorting.direction === 'asc' ? c2[sorting.by] : c1[sorting.by];

        if (sorting.by === 'lastTransaction')
          return (firstPropValue?.date || 0) - (secondPropValue?.date || 0);
        if (sorting.by === 'name' || sorting.by === 'phone')
          return (firstPropValue || '').localeCompare((secondPropValue || ''));
        else
          return (firstPropValue || 0) - (secondPropValue || 0);
      });

    return list;
  };

  __getMostRecentTransaction() {
    return this.transactions.sort((t1, t2) => t2.date - t1.date)[0];
  }

  __getCashbackBalanceFromTransactions() {
    return this.transactions.reduce((balance, transaction) => (balance + transaction.value), 0);
  }

  get cashbackBalance() {
    return this.__cashbackBalance;
  }

  get lastTransaction() {
    return this.__lastTransaction;
  }

  addTransaction(transaction) {
    const trackingData = this.__trackingData('create');
    const newTransaction = { ...trackingData, date: trackingData.createdAt, ...transaction };
    this.transactions.push(newTransaction);
    this.__cashbackBalance += newTransaction.value;
    this.__lastTransaction = newTransaction;
  }
}

export default Person;