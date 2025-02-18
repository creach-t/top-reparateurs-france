const GOOGLE_MAPS_API_KEY = process.env.VITE_GOOGLE_MAPS_API_KEY;

export const searchRepairShops = async (city) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=réparateur+téléphone+${city}&key=${GOOGLE_MAPS_API_KEY}`
  );
  return response.json();
};

export const getPlaceDetails = async (placeId) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,formatted_address,opening_hours,reviews,url&key=${GOOGLE_MAPS_API_KEY}`
  );
  return response.json();
};

export const getTopRepairShops = async () => {
  const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille'];
  const allShops = [];

  for (const city of cities) {
    const { results } = await searchRepairShops(city);
    const topShopsInCity = results
      .filter(shop => shop.rating >= 4.5)
      .slice(0, 2);

    for (const shop of topShopsInCity) {
      const details = await getPlaceDetails(shop.place_id);
      allShops.push({
        ...shop,
        ...details.result
      });
    }
  }

  return allShops.sort((a, b) => b.rating - a.rating).slice(0, 10);
};