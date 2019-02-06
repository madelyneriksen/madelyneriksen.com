import React from 'react';
import Header from '../common/components/header';
import { Link } from 'gatsby';


export default (props) => (
  <article class="blog-post--preview">
    <Header text={props.title} image={props.image} />
    <div className="blog-post__info">
      <p className="blog-post__info__tooltip">{props.date}</p>
      <p className="blog-post__info__tooltip">{props.category}</p>
    </div>
    <div
      className="blog-post__content typography"
      dangerouslySetInnerHTML={{__html: props.excerpt}} />
    <Link to={props.slug} className="button--red">READ MORE</Link>
  </article>
)
