import React from 'react';
import Header from '../common/components/header';
import { Link } from 'gatsby';


export default (props) => (
  <article class="text-block--preview">
    <Header text={props.title} image={props.image} />
    <div className="text-block__info">
      <p className="text-block__info__tooltip">{props.date}</p>
      <p className="text-block__info__tooltip">{props.category}</p>
    </div>
    <div
      className="text-block__content typography"
      dangerouslySetInnerHTML={{__html: props.excerpt}} />
    <Link to={props.slug} className="button--red">READ MORE</Link>
  </article>
)
