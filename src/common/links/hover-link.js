import React from 'react';
import { Link } from 'gatsby';


export default (props) => {
  const internal = /^\/(?!\/)/.test(props.to);
  let result;
  if (internal) {
    result = (<Link to={props.to} className="hover-link">{props.children}</Link>)
  } else {
    result = (<a href={props.to} className="hover-link">{props.children}</a>)
  }
  return result;
}
