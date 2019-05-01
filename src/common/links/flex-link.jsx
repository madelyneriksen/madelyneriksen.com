import React from 'react';
import { Link } from 'gatsby';


// This is a regular Gatsby link, except that it also allows
// <a> tags. for external links.
export default (props) => {
  const internal = /^\/(?!\/)/.test(props.to);
  if (internal) {
    return <Link {...props}>{props.children}</Link>;
  }
  return <a {...props} href={props.to}>{props.children}</a>;
};
