import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'components/Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import Loader from 'components/Loader/Loader';
import css from './App.module.css';

export function App() {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const [error, setError] = useState(false)

  const moreImages = Math.ceil(totalImages / 12) > page;

  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34438281-0af2d234ee7e315fc0f0d81e0';

  async function getPictures(value, page) {
    try {
      return await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (search === '') {
      return;
    }
    setLoading(true);
    getPictures(search, page)
      .then(response => {
        if (page !== 1) {
          setImages(prev => [...prev, ...response.data.hits]);
          setTotalImages(response.data.totalHits);
        } else {
          if (response.data.hits.length === 0) {
            setImages(null);
            setError(true)
            return;
          }
          setImages(response.data.hits);
          setTotalImages(response.data.totalHits);
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, [page, search]);

  const incrementPage = () => {
    setPage(prev => prev + 1);
  };

  const onChangeSearch = query => {
    setSearch(query);
    setPage(1);
    setError(false)
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onChangeSearch} />
      {loading && <Loader />}
      {error && <p>There are no images matching your search.</p>}
      {images && images.length > 0 && <ImageGallery items={images} />}
      {images && images.length > 0 && moreImages && (
        <Button onClick={incrementPage} />
      )}
    </div>
  );
}