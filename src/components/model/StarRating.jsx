// components/StarRating.js

import React from "react";
import StarIcon from "@mui/icons-material/Star";

const StarRating = ({ rating }) => {
  const stars = [];

  // Create an array of 5 stars
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <StarIcon
        key={i}
        className={`h-5 w-5 ${
          i <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    );
  }

  return <div className="flex items-center justify-center">{stars}</div>;
};

export default StarRating;
