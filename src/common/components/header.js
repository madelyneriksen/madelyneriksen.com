import React from 'react';
import Img from 'gatsby-image';
import { StaticQuery, graphql } from 'gatsby';


export default (props) => (
  <header className="header">
    <h1 className="header__text">{props.text}</h1>
    <Img fluid={props.image} alt="" className="header__image" />
  </header>
)
