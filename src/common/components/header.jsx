import React from 'react';
import Img from 'gatsby-image';


export default (props) => {
  const textClass = props.image ? 'header__text' : 'header__text--dark';
  return (
    <header
      className={props.image ? 'header' : 'header--dark'}
    >
      <h1
        className={`${textClass} header__title`}
      >
        {props.text}
      </h1>
      {props.subtitle
      && (
      <p
        className={textClass}
      >
        {props.subtitle}
      </p>
      )
    }
      {props.image
      && (
      <Img
        fluid={props.image}
        alt=""
        className="header__image"
      />
      )
    }
    </header>
  );
};
