import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';


// This is a regular Gatsby link, except that it also allows
// <a> tags. for external links.
const FlexLink = (props) => {
  const {
    to,
    children,
    ...rest
  } = props;
  const internal = /^\/(?!\/)/.test(to);
  if (internal) {
    return <Link {...rest} to={to}>{children}</Link>;
  }
  return <a {...rest} href={to}>{children}</a>;
};

FlexLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default FlexLink;
