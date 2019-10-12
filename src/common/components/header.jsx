import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';


const Header = ({
  image,
  text,
  subtitle,
  ctaTo,
  ctaText,
  gradient,
}) => {
  // Calculate the desired classnames for the header.
  let textClass = 'header__text--dark';
  let headerClass = 'header--dark';

  if (image) {
    headerClass = 'header';
    textClass = 'header__text';
  } else if (gradient) {
    headerClass = 'header--gradient';
    textClass = 'header__text';
  }

  return (
    <header
      className={headerClass}
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
              fluid={image.childImageSharp.fluid}
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
  gradient: PropTypes.bool,
};

Header.defaultProps = {
  subtitle: false,
  ctaTo: false,
  ctaText: false,
  gradient: false,
};

export default Header;
