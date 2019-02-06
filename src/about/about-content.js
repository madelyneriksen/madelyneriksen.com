import React from 'react';
import Header from '../common/components/header'


export default (props) => (
  <article className="blog-post">
    <Header text={props.title} image={props.image} />
    <div className="blog-post__info" />
    <div className="blog-post__content typography" dangerouslySetInnerHTML={{__html: props.post}} />
  </article>
)
