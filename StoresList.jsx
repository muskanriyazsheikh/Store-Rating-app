import { Rating, Button } from "@mui/material";

function StoreCard({ store }) {
  const [value, setValue] = useState(store.userRating || 0);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (store.userRatingId) {
        await api.put(`/ratings/${store.userRatingId}`, { rating: value });
      } else {
        await api.post("/ratings", { storeId: store.id, rating: value });
      }
      // Optionally refetch stores list
    } catch (e) {
      console.error(e);
    } finally { setSaving(false) }
  };

  return (
    <div>
      <h3>{store.name}</h3>
      <p>{store.address}</p>
      <div>Avg: {store.avgRating || "—"}</div>
      <div>Your rating: <Rating value={value} onChange={(e,val)=>setValue(val)} /></div>
      <Button onClick={handleSave} disabled={saving}>Save</Button>
    </div>
  );
}
