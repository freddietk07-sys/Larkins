export default async function handler(req, res) {
  const placeId = "ChIJyUOJbpU12UcRXeGWcneX70Y"; // Larkins Grill
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?fields=rating,userRatingCount&key=${apiKey}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Google API Error" });
    }

    const data = await response.json();

    return res.status(200).json({
      rating: data.rating,
      totalReviews: data.userRatingCount,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
