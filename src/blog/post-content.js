import React from 'react';
import Img from 'gatsby-image';


export default (props) => (
  <article className="blog-post">
    <Img className="blog-post__image" fluid={props.image} alt="" />
    <h1 className="blog-post__title">{props.title}</h1>
    <div className="blog-post__content typography" dangerouslySetInnerHTML={{__html: props.post}} />
  </article>
)
