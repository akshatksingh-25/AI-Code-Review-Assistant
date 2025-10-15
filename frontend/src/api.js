export async function fetchReview(code, language) {
  const response = await fetch('http://localhost:5000/api/review', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, language }),
  });
  const data = await response.json();
  return data.review;
}

export async function fetchAllReviews() {
  const response = await fetch('http://localhost:5000/api/review');
  const data = await response.json();
  return data;
}
