import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';


const Header = (props) => {
  const {
    image,
    text,
    subtitle,
  } = props;
  const textClass = image ? 'header__text' : 'header__text--dark';
  return (
    <header
      className={image ? 'header' : 'header--dark'}
    >
      <h1
        className={`${textClass} header__title`}
      >
        {text}
      </h1>
      {subtitle
          && (<p className={textClass}>{subtitle}</p>)
      }
      {image
          && (
            <Img
              fluid={image}
              alt=""
              className="header__image"
            />
          )
      }
    </header>
  );
};

Header.propTypes = {
  // eslint-disable-next-line
  image: PropTypes.object,
  text: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

Header.defaultProps = {
  subtitle: false,
};

export default Header;
