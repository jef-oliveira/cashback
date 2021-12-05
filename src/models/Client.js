class Client {
  constructor(props) {
    this.creationDate = props.creationDate || new Date();
    this.id = props.id || `${this.creationDate.getTime()}`;
    this.name = props.name;
    this.phone = props.phone;
    this.transactions = props.transactions || [];

    this.cashbackBalance = this.cashbackBalanceFromTransactions;
  }

  get lastTransaction() {
    return this.transactions.sort((t1, t2) => t2.date - t1.date)[0];
  }

  get cashbackBalanceFromTransactions() {
    return this.transactions.reduce((balance, transaction) => (balance + transaction.value), 0);
  }

  addTransaction(transaction) {
    this.transactions.push({ ...transaction });
    this.cashbackBalance += transaction.value;
  }
}

Client.filter = function(clientsList, filter) {
  if (filter.by === 'name') {
    if (filter.value.length) {
      const filterTemrs = filter.value.toLowerCase().split(' ').filter(term => term.trim().length);
      return clientsList.filter(client => filterTemrs.every(term => client.name.trim().toLowerCase().includes(term)));
    }
  }

  return clientsList;
};

Client.sort = function(clientsList, sorting) {
  return clientsList.sort(function(c1, c2) {
    const firstPropValue = sorting.direction === 'asc' ? c1[sorting.by] : c2[sorting.by];
    const secondPropValue = sorting.direction === 'asc' ? c2[sorting.by] : c1[sorting.by];

    if (sorting.by === 'lastTransaction')
      return firstPropValue.date - secondPropValue.date;
    if (sorting.by === 'name' || sorting.by === 'phone')
      return firstPropValue.localeCompare(secondPropValue);
    else
      return firstPropValue - secondPropValue;
  });
};

export default Client;