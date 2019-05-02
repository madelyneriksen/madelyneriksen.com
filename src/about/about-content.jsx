/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../common/components/header';


const About = (props) => {
  const {
    title,
    image,
    post,
  } = props;
  return (
    <article className="text-block">
      <Header text={title} image={image} />
      <div className="text-block__info" />
      <div className="text-block__content typography" dangerouslySetInnerHTML={{ __html: post }} />
    </article>
  );
};

About.propTypes = {
  title: PropTypes.string.isRequired,
  post: PropTypes.string.isRequired,
  // eslint-disable-next-line
  image: PropTypes.object,
};

export default About;
