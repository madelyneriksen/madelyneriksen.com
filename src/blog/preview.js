import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';


export default (props) => (
  <article class="post-preview">
    <Link to={props.slug}><Img fluid={props.image} alt="" className="post-preview__image" /></Link>
    <Link to={props.slug} className="post-preview__title"><h2>{props.title}</h2></Link>
    <div className="post-preview__info">
      <p>{props.date}</p>
      <p>{props.category}</p>
    </div>
    <div
      className="post-preview__content typography"
      dangerouslySetInnerHTML={{__html: props.excerpt}} />
    <Link to={props.slug} className="button--red">READ MORE</Link>
  </article>
)
