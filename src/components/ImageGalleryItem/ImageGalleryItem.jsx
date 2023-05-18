import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);
  const { webformatURL, tags, largeImageURL } = image;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal url={largeImageURL} title={tags} onClose={toggleModal} />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired,
};
