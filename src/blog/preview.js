import React from 'react';
import Container from '../common/containers/text-container.js';
import buttonClasses from '../common/buttons/button-classes.js';
import Img from 'gatsby-image';
import { Link } from 'gatsby';


export default (props) => (
  <article className="w-100 mv2 bg-white">
    <header className="flex flex-column items-center justify-center pa4">
      <span className="silver tracked f5 sans-serif ttu">{props.category}</span>
      <Link to={props.slug} className="no-underline"><h2 className="f3 mid-gray sans-serif mh2 tc">{props.title}</h2></Link>
      <span className="silver f5 sans-serif">{props.date}</span>
    </header>
    <Link to={props.slug}><Img fluid={props.image} alt="" /></Link>
    <Container>
      <div dangerouslySetInnerHTML={{__html: props.excerpt}} />
    </Container>
    <div className="w-100 pb5 tc">
      <Link to={props.slug} className={buttonClasses}>READ MORE</Link>
    </div>
  </article>
)
