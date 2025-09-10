import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "src/components/Loading";
import StoreCard from "src/Pages/User/StoreCard";

export default function UserDashboard() {
  const [stores, setStores] = useState([]); // Always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/stores"); // Adjust endpoint if needed

        // Handle API response safely
        if (Array.isArray(res.data)) {
          setStores(res.data);
        } else if (Array.isArray(res.data.stores)) {
          setStores(res.data.stores);
        } else {
          console.warn("Unexpected API response:", res.data);
          setStores([]); // Fallback to empty array
        }
      } catch (err) {
        console.error("Error fetching stores:", err);
        setError("Failed to fetch stores. Please try again later.");
        setStores([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Show loading while fetching
  if (loading) return <Loading />;

  // Show error message if API call failed
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-dashboard">
      {stores.length === 0 ? (
        <p>No stores available.</p>
      ) : (
        stores.map((store) => (
          <StoreCard key={store.id || store.id} store={store} />
        ))
      )}
    </div>
  );
}
