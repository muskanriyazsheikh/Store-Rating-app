import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get("/owner/ratings"); // backend route
        setRatings(res.data.ratings);
        setAvgRating(res.data.avgRating);
      }catch(err){
        console.error("Error fetching owner data:",err);
      }
    };
    fetchData();
  },[]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Owner Dashboard</h2>
      <p className="mb-4"><strong>Average Rating:</strong> {avgRating}</p>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">User ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map(r => (
            <tr key={r.id}>
              <td className="border p-2">{r.userId}</td>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.email}</td>
              <td className="border p-2">{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
