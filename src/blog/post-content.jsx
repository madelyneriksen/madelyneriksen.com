import React from 'react';
import Header from '../common/components/header';


export default props => (
  <article className="text-block">
    <Header text={props.title} image={props.image} />
    <div className="text-block__info">
      <p className="text-block__info__tooltip">{props.date}</p>
      <p className="text-block__info__tooltip">{props.category}</p>
    </div>
    <div className="text-block__content typography" dangerouslySetInnerHTML={{ __html: props.post }} />
  </article>
);
