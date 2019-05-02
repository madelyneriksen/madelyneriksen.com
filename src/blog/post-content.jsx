/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/components/header';


const PostContent = (props) => {
  const {
    title,
    image,
    date,
    category,
    post,
  } = props;
  return (
    <article className="text-block">
      <Header text={title} image={image} />
      <div className="text-block__info">
        <p className="text-block__info__tooltip">{date}</p>
        <p className="text-block__info__tooltip">{category}</p>
      </div>
      <div className="text-block__content typography" dangerouslySetInnerHTML={{ __html: post }} />
    </article>
  );
};

PostContent.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  // eslint-disable-next-line
  image: PropTypes.object.isRequired,
};

export default PostContent;
