import React from 'react';
import Img from 'gatsby-image';
import { Link } from 'gatsby';


export default (props) => (
  <article class="blog-post">
    <Link to={props.slug}><Img fluid={props.image} alt="" className="blog-post__image" /></Link>
    <Link to={props.slug} className="blog-post__title"><h2>{props.title}</h2></Link>
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
