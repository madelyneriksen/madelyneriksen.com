import React from 'react';
import Container from '../common/containers/text-container.js';
import Img from 'gatsby-image';
import 'tachyons';


export default (props) => (
  <article className="w-100 mv2 bg-white article">
    <header className="flex flex-column items-center justify-center pa4">
      <h2 className="mid-gray sans-serif mh2 tc">{props.title}</h2>
    </header>
    <Img fluid={props.image} alt="" />
    <Container>
      <div dangerouslySetInnerHTML={{__html: props.post}} />
    </Container>
  </article>
)
