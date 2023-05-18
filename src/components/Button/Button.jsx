import css from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({onClick}) {
  const handleClick = e => {
    onClick();
  };
  
  return (
    <button className={css.button} type="button" onClick={handleClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
