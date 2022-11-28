const CORS_PROXY = 'https://justcors.com';
const CBL_SEARCH = 'https://isbn-search-br.search.windows.net/indexes/isbn-index/docs/search?api-version=2016-09-01';
const AMZN_SEARCH = 'https://www.amazon.com.br/s?k=';

//9788578675196 Tex
//9786555941197 What a Wonderful World
//9786586660142 FunRetrospectives
//9786559512973 Conan Omnibus 4
//9788535931747 Minha coisa favorita é monstro
//9788555340215 Ninguém vira adulto de verdade
//9788545713678 Hokuto no Ken

export async function fetchAmznSearchData(isbn) {
  console.log('FETCHING AMZN SEARCH DATA...');
  const resultContainer = document.createElement('div');
  resultContainer.classList.add('search-result-container');
  document.body.appendChild(resultContainer);

  const data = {};

  try {
    const corsToken = window.localStorage.getItem('JUST_CORS_TEMP_KEY');
    const response = await fetch(`${CORS_PROXY}/${corsToken}/${AMZN_SEARCH}${isbn}`);
    resultContainer.innerHTML = await response.text();
    const img = resultContainer.querySelector('.s-main-slot img');
    data.isbn10 = resultContainer.querySelector('.s-main-slot >div[data-uuid]')?.dataset?.asin;
    console.log('isbn10:', data.isbn10);
    data.imageURL = img?.attributes?.srcset?.value?.split(',').pop().trim().split(' ')[0];
    console.log('imageURL:', data.imageURL);
    data.amznURL = data.isbn10 && `https://www.amazon.com.br/dp/${data.isbn10}`;
    console.log('amznURL:', data.amznURL);
  } catch (error) {
    console.log('NO AMZN SEARCH DATA FOUND', error);
  } finally {
    resultContainer.remove();
    return data;
  }
}

export async function fetchAmznProductData(url) {
  if (!url?.length) return;

  console.log('FETCHING AMZN PRODUCT DATA...');
  const resultContainer = document.createElement('div');
  resultContainer.classList.add('search-result-container');
  document.body.appendChild(resultContainer);

  const data = {};

  try {
    const corsToken = window.localStorage.getItem('JUST_CORS_TEMP_KEY');
    const response = await fetch(`${CORS_PROXY}/${corsToken}/${url}`);
    resultContainer.innerHTML = await response.text();
    data.title = resultContainer.querySelector('#titleblock_feature_div h1 span:nth-child(1)').innerText;
    console.log('title:', data.title);
    const formatAndPublishing = resultContainer.querySelector('#titleblock_feature_div h1 span:nth-child(2)').innerText;
    const [format, publishing] = formatAndPublishing.split('–');
    data.format = format;
    data.publishedAt = publishing.split(' ').pop();
    console.log('format:', data.format);
    console.log('publishedAt:', data.publishedAt);
    data.authors = Array.from(resultContainer.querySelectorAll('#bylineInfo_feature_div #bylineInfo .author >span .a-link-normal, #bylineInfo_feature_div #bylineInfo .author > a.a-link-normal')).map(element => element.innerText);
    console.log('authors:', data.authors);
    data.description = resultContainer.querySelector('#bookDescription_feature_div [aria-expanded]').innerText;
    console.log('description:', data.description);
    Array.from(resultContainer.querySelectorAll('#richProductInformation_feature_div ol li')).forEach(function(element) {
      const label = element.querySelector('.rpi-attribute-label')?.innerText;
      if (label) {
        const value = element.querySelector('.rpi-attribute-value')?.innerText;
        if (label === 'Número de páginas') {
          data.pages = value.split(' ')[0];
          console.log('pages:', data.pages);
        } else if (label === 'Editora') {
          data.publisher = value;
          console.log('publisher:', data.publisher);
        } else if (label === 'Dimensões') {
          const dimensions = value;
          const [height, width] = dimensions.replace('cm', '').split(' x ');
          data.size = `${Math.round(height)}x${Math.round(width)}`;
          console.log('size:', data.size);
        }
      }
    });
  } catch (error) {
    console.log('NO AMZN PRODUCT DATA FOUND', error);
  } finally {
    resultContainer.remove();
    return data;
  }
}

export async function fetchCBLData(isbn) {
  console.log('FETCHING CBL DATA...');
  try {
    const corsToken = window.localStorage.getItem('JUST_CORS_TEMP_KEY');
    const response = await fetch(`${CORS_PROXY}/${corsToken}/${CBL_SEARCH}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'api-key': '100216A23C5AEE390338BBD19EA86D29'
      }),
      body: JSON.stringify({
        "searchMode": "any",
        "searchFields": "FormattedKey,RowKey",
        "queryType": "full",
        "search": isbn,
        "top": 1,
        "select": "*"
      })
    })
    const data = await response.json();
    const result = data.value[0];
    return {
      title: result.Title,
      subtitle: result.Subtitle,
      collection: result.Colection,
      volume: result.Edicao,
      format: result.Subformato,
      size: result.Dimensao,
      pages: result.Paginas,
      publisher: result.Imprint,
      registeredAt: result.Date,
      publishedAt: result.Ano,
      description: result.Sinopse,
      authors: result.Authors
    }
  } catch (error) {
    console.log('NO CBL DATA FOUND', error);
  }
}

export async function fetchProductInfo(isbn) {
  const cblData = await fetchCBLData(isbn);
  const amznSearchData = await fetchAmznSearchData(isbn);
  const amznProductData = await fetchAmznProductData(amznSearchData?.amznURL);

  return { isbn13: isbn, ...amznSearchData, cblData, amznProductData };
}