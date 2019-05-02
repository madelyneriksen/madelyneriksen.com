/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Header from '../common/components/header';


const Preview = (props) => {
  const {
    image,
    title,
    date,
    category,
    excerpt,
    slug,
  } = props;
  return (
    <article className="text-block--preview">
      <Header text={title} image={image} />
      <div className="text-block__info">
        <p className="text-block__info__tooltip">{date}</p>
        <p className="text-block__info__tooltip">{category}</p>
      </div>
      <div
        className="text-block__content typography"
        dangerouslySetInnerHTML={{ __html: excerpt }}
      />
      <Link to={slug} className="button--rose">READ MORE</Link>
    </article>
  );
};

Preview.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  // eslint-disable-next-line
  image: PropTypes.object,
};

export default Preview;
