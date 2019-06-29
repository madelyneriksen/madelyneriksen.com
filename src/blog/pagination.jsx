import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Pagination = ({
  pageNumber, nextPage, hasNextPage,
}) => (
  <div className="pagination">
    <p>
      {`Page ${pageNumber}`}
    </p>
    {hasNextPage
    && <Link className="pagination__link" to={nextPage}>Next Page &rarr;</Link>
    }
  </div>
);

Pagination.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  nextPage: PropTypes.string.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
};

export default Pagination;
