import Firebase from 'fb';

class Product extends Firebase.Model {
  static collectionPath() { return 'products'; }

  static filter(list, filter) {
    if (filter.by === 'title') {
      if (filter.value?.length) {
        const filterTemrs = filter.value.toLowerCase().split(' ').filter(term => term.trim().length);
        return list.filter(product => filterTemrs.every(term => product.title.trim().toLowerCase().includes(term)));
      }
    }

    return list;
  }

  static sort(list, sorting) {
    if (sorting)
      return list.sort(function(c1, c2) {
        const firstPropValue = sorting.direction === 'asc' ? c1[sorting.by] : c2[sorting.by];
        const secondPropValue = sorting.direction === 'asc' ? c2[sorting.by] : c1[sorting.by];

        if (sorting.by === 'price' || sorting.by === 'quantity')
          return (firstPropValue || 0) - (secondPropValue || 0);
        else
          return (firstPropValue || '').localeCompare((secondPropValue || ''));
      });

    return list;
  };
}

export default Product;