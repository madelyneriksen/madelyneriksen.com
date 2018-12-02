import React from 'react';
import Container from '../common/containers/text-container.js';
import buttonClasses from '../common/buttons/button-classes.js';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import 'tachyons';


export default (props) => (
  <article className="w-100 mv2 bg-white">
    <header className="flex flex-column items-center justify-center pa4">
      <span className="silver tracked f5 sans-serif ttu">{props.category}</span>
      <h2 className="mid-gray sans-serif mh2 tc">{props.title}</h2>
      <span className="silver f5 sans-serif">{props.date}</span>
    </header>
    <Img fluid={props.image} alt="" />
    <Container>
      <div dangerouslySetInnerHTML={{__html: props.excerpt}} />
    </Container>
    <div className="w-100 pb5 tc">
      <Link to={props.slug} className={buttonClasses}>READ MORE</Link>
    </div>
  </article>
)
