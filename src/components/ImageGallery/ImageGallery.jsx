import { nanoid } from 'nanoid';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ items }) {
  return (
    <ul className={css.imageGallery} >
        {items.map(item => <ImageGalleryItem key={nanoid()} image={item} />)}
    </ul>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,).isRequired, 
};
