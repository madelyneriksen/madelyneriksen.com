import React from 'react';
import { Link } from 'gatsby';


export default (props) => {
  const internal = /^\/(?!\/)/.test(props.to);
  let result;
  let classNames = props.className ? "hover-link " + props.className : "hover-link";
  if (internal) {
    result = (<Link to={props.to} className={classNames}>{props.children}</Link>)
  } else {
    result = (<a href={props.to} className={classNames}>{props.children}</a>)
  }
  return result;
}
