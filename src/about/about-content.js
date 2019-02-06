import React from 'react';
import Container from '../common/containers/text-container.js';
import Header from '../common/components/header'
import Img from 'gatsby-image';


export default (props) => (
  <article className="blog-post">
    <Header text={props.title} image={props.image} />
    <div className="blog-post__info" />
    <div className="blog-post__content typography" dangerouslySetInnerHTML={{__html: props.post}} />
  </article>
)
