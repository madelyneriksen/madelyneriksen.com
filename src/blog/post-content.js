import React from 'react';
import Container from '../common/containers/text-container.js';
import Img from 'gatsby-image';
import 'tachyons';
import './styles/post-style.css';


export default (props) => (
  <article className="w-100 mv2 bg-white article">
    <header className="flex flex-column items-center justify-center pa4">
      <span className="silver tracked f5 sans-serif ttu">{props.category}</span>
      <h1 className="f3 mid-gray sans-serif mh2 tc">{props.title}</h1>
      <span className="silver f5 sans-serif">{props.date}</span>
    </header>
    <Img fluid={props.image} alt="" />
    <Container>
      <div dangerouslySetInnerHTML={{__html: props.post}} />
    </Container>
  </article>
)
