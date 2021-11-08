import PropTypes from 'prop-types';
import React from 'react';

function renderRatingStars(value, color) {
  const html = [];
  for (let i = 0; i < value; i++) {
    html.push(
      <span className="rating" key={i}>
        <i style={{ color }} className={value >= i + 1 ? 'fas fa-star' : value >= i + 0.5 ? 'fas fa-star-half-alt' : "far fa-star"}></i>
      </span>
    )
  }
  return html;
}

function Rating({ value, numReviews, color }) {
  return (
    <div className="my-3">
      {renderRatingStars(value, color)}&nbsp;
      <span>{numReviews && `${numReviews} reviews`}</span>
    </div>
  )
}

Rating.defaultProps = {
  value: 0,
  numReviews: 0,
  color: '#f8e825',
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
}

export default Rating;
