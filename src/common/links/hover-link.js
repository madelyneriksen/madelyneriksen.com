import React from 'react';
import { Link } from 'gatsby';


export default (props) => {
  const internal = /^\/(?!\/)/.test(props.to);
  const classNames = "dib mh1 sans-serif no-underline mid-gray hover-line"
  let result;
  if (internal) {
    result = (<Link to={props.to} className={classNames}>{props.children}</Link>)
  } else {
    result = (<a href={props.to} className={classNames}>{props.children}</a>)
  }
  return result;
}
