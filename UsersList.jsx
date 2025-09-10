// submit rating
await api.post("/ratings", { storeId, rating }); // server calculates avg
// update rating
await api.put(`/ratings/${ratingId}`, { rating });
