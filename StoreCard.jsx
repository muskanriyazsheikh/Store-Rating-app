import React, { useState } from "react";
import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import axios from "axios";

export default function StoreCard({ store }) {
  const [rating, setRating] = useState(store.userRating || "");
  const [comment, setComment] = useState("");

  const handleRatingSubmit = async () => {
  if (!store.id) {
    alert("Store ID is missing!");
    console.error("Store object:", store);
    return;
  }

  try {
    await axios.post(`http://localhost:5000/api/stores/${store.id}/rate`, { rating, comment });
    alert("Rating submitted!");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{store.name}</Typography>
        <Typography variant="body2">{store.address}</Typography>
        <Typography variant="body2">
          Overall Rating: {store.avgRating || "Not Rated"}
        </Typography>

        <TextField
          label="Your Rating (1-5)"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          inputProps={{ min: 1, max: 5 }}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{ mt: 2, ml: 2 }}
        />
        <Button
          variant="contained"
          sx={{ mt: 2, ml: 2 }}
          onClick={handleRatingSubmit}
        >
          Submit Rating
        </Button>
      </CardContent>
    </Card>
  );
  
}
