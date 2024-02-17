import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function MenuItemCard({ image, name, price, ratting, id }) {
  const navigate = useNavigate();
  return (
    <div className="menuitem-paper">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <span className="price-ratting">
        <span>{price}$</span>
        <span>⭐{ratting}</span>
      </span>
      <div>
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/menuitem/edit/${id}`)}
        >
          <i className="bx bx-edit-alt"></i>
        </button>
      </div>
    </div>
  );
}

MenuItemCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  key: PropTypes.any,
  ratting: PropTypes.number,
  id: PropTypes.any,
};

export default MenuItemCard;
