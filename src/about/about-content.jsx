import React from 'react';
import Header from '../common/components/header';


export default props => (
  <article className="text-block">
    <Header text={props.title} image={props.image} />
    <div className="text-block__info" />
    <div className="text-block__content typography" dangerouslySetInnerHTML={{ __html: props.post }} />
  </article>
);
