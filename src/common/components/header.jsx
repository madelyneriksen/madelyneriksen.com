import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';


const Header = (props) => {
  const {
    image,
    text,
    subtitle,
    ctaTo,
    ctaText,
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
      {ctaTo
          && <Link class="button--cta" to={ctaTo}>{ctaText}</Link>
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
  ctaTo: PropTypes.string,
  ctaText: PropTypes.string,
};

Header.defaultProps = {
  subtitle: false,
  ctaTo: false,
  ctaText: false,
};

export default Header;
