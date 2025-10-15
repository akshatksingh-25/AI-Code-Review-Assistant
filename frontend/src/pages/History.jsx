import React, { useEffect, useState } from "react";
import { fetchAllReviews } from "../api";
import Markdown from "react-markdown";

const History = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await fetchAllReviews();
      setReviews(data);
    }
    getData();
  }, []);

  return (
    <div className="p-10 text-white h-[90vh] overflow-auto bg-zinc-900">
      <h2 className="text-3xl font-bold mb-6">Review History</h2>

      <table className="w-full border border-zinc-700 text-left">
        <thead className="bg-zinc-800">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">Language</th>
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((r, idx) => (
            <tr key={r._id} className="border-t border-zinc-700">
              <td className="p-3">{idx + 1}</td>
              <td className="p-3 capitalize">{r.language}</td>
              <td className="p-3">
                {new Date(r.createdAt).toLocaleString()}
              </td>
              <td className="p-3">
                <button
                  onClick={() => setSelectedReview(r)}
                  className="btnNormal bg-purple-600 hover:bg-purple-700 px-4"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedReview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-6 rounded-lg w-[80%] max-h-[80vh] overflow-auto border border-zinc-700">
            <h3 className="text-2xl mb-3 font-semibold text-purple-400">
              {selectedReview.language.toUpperCase()} Review
            </h3>
            <Markdown>{selectedReview.review}</Markdown>
            <button
              onClick={() => setSelectedReview(null)}
              className="btnNormal bg-red-600 hover:bg-red-700 mt-5 px-6"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
