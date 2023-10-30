import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number,
});
