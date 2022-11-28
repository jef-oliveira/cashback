import { useState, useMemo, useCallback } from 'react';

import { Dialog, Info, Input, Icon, Button, Loader } from 'components';
import { Product } from 'models';
import { fetchProductInfo } from 'services'

import './styles.scss';

const AUTO_PROPS = [
  { name: 'title', label: 'Título', icon: 'book' },
  { name: 'subtitle', label: 'Subtítulo', icon: 'book' },
  { name: 'collection', label: 'Coleção', icon: 'book' },
  { name: 'volume', label: 'Volume', icon: 'book' },
  { name: 'description', label: 'Descrição', icon: 'book' },
  { name: 'imageURL', label: 'URL da imagem', icon: 'image' },
  { name: 'publisher', label: 'Editora', icon: 'building' },
  { name: 'publishedAt', label: 'Ano de publicação', icon: 'calendar-check' },
  { name: 'pages', label: 'Nº de páginas', icon: 'file' },
  { name: 'format', label: 'Formato', icon: 'ruler-combined' },
  { name: 'size', label: 'Dimensões', icon: 'ruler-combined' },
];

function ProductFormDialog({ product, onCancel, ...props }) {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(() => ({
    isbn13: product.isbn13 || '',
    isbn10: product.isbn10 || '',
    title: product.title || '',
    subtitle: product.subtitle || '',
    collection: product.collection || '',
    volume: product.volume || '',
    description: product.description || '',
    imageURL: product.imageURL || '',
    publisher: product.publisher || '',
    publishedAt: product.publishedAt || '',
    pages: product.pages || '',
    format: product.format || '',
    size: product.size || '',
    authors: product.authors || [],
    price: product.price || '',
    quantity: product.quantity || '',
    categories: product.categories || [],
  }));

  const title = useMemo(function() {
    return `${product.id ? 'Editar' : 'Adicionar'} produto`;
  }, [product]);

  const handleInputChange = useCallback(function(event) {
    setProductData(state => {
      const { target: { id, type, value, valueAsNumber } } = event;
      state[id] = type === 'number' ? valueAsNumber : value;
      return { ...state };
    })
  }, []);

  const handlePriceChange = useCallback(function(event) {
    setProductData(state => {
      state.price = event.target.valueAsNumber;
      return { ...state };
    })
  }, []);


  const handleSearch = useCallback(function() {
    console.log('WILL HANDLE SEARCH:', {isbn13: productData?.isbn13});
    if (productData?.isbn13?.trim().length) {
      setLoading(true);
      fetchProductInfo(productData?.isbn13).then(fetchedData => {
        console.log(fetchedData)
        const { isbn10, isbn13, imageURL, amznProductData, cblData } = fetchedData;
        setProductData(state => ({ ...state, isbn10, isbn13, imageURL, ...cblData, ...amznProductData }))
        setLoading(false);
      });
    }
  }, [productData?.isbn13]);

  const addTag = useCallback(function(event) {
    console.log('TAG')
    if (event.key === 'Enter' && event.target.value.trim().length) {
      event.stopPropagation();
      event.preventDefault();
      setProductData(state => {
        if (event.target.value.trim().length) {
          state[event.target.id] = [ ...state[event.target.id], event.target.value ]
          event.target.value = '';
        }
        return { ...state };
      })
    }
  }, []);

  const deleteTag = useCallback(function(id, value) {
    setProductData(state => {
      state[id] = state[id].filter(stateValue => stateValue !== value)
      return { ...state };
    })
  }, []);

  const handleConfirm = useCallback(function() {
    const savingProduct = new Product(product.__doc);
    savingProduct.setProps(productData);
    savingProduct.save().then(function() {
      onCancel?.();
    });
  }, [product, productData, onCancel]);

  return (
    <Dialog
      { ...props }
      title={title}
      onCancel={onCancel}
      onConfirm={handleConfirm}
      className="product-dialog"
    >
      {!Boolean(product.id) && <Info>Preencha os campos manualmente, ou busque os dados pelo ISBN!</Info>}

      <span className="isbn">
        <Input
          id="isbn13"
          type="text"
          label="ISBN-13"
          icon="barcode"
          placeholder="ISBN-13"
          maxLength={13}
          value={productData.isbn13}
          onChange={handleInputChange}
          autoFocus={true}
          required={true}
        />
        <Button
          type="button"
          theme={Button.PRIMARY}
          fill={Button.SOLID}
          onClick={handleSearch}
          leftIcon="magnifying-glass"
        />
      </span>

      {AUTO_PROPS.map(prop => (
        <Input
          { ...prop }
          key={props.name}
          id={prop.name}
          type="text"
          placeholder={prop.label}
          value={productData[prop.name]}
          onChange={handleInputChange}
        />
      ))}

      <span className="tags">
        <Input
          id="authors"
          type="text"
          label="Autores"
          icon="users"
          placeholder="Nome de autor"
          onKeyPress={addTag}
        />
        <span className="list">
          {productData?.authors.map(author => (
            <span key={author}>
              {author}<Icon name="xmark" onClick={() => deleteTag('authors', author)} />
            </span>
          ))}
        </span>
      </span>

      <Input
        id="price"
        type="number"
        icon="money-bill-1"
        text="R$"
        label="Preço de capa"
        placeholder="0,00"
        value={productData.price || ''}
        onChange={handleInputChange}
        required={true}
        step="any"
      />

      <Input
        id="quantity"
        type="number"
        icon="box-open"
        text="R$"
        label="Quantidade em estoque"
        placeholder="0"
        value={productData.quantity || ''}
        onChange={handleInputChange}
        required={true}
        step="any"
      />

      <span className="tags">
        <Input
          id="categories"
          type="text"
          label="Categorias"
          icon="tags"
          placeholder="Categoria"
          onKeyPress={addTag}
        />
        <span className="list">
          {productData?.categories.map(category => (
            <span key={category}>
              {category}<Icon name="xmark" onClick={() => deleteTag('categories', category)} />
            </span>
          ))}
        </span>
      </span>

      {loading && <Loader />}
    </Dialog>
  );
}

export default ProductFormDialog;
