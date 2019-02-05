import React from 'react';
import Img from 'gatsby-image';


export default (props) => (
  <article>
    <Img fluid={props.image} alt="" />
    <h1>{props.title}</h1>
    <div className="typography" dangerouslySetInnerHTML={{__html: props.post}} />
  </article>
)
