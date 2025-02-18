const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const searchRepairShops = async (city) => {
  try {
    console.log(`Fetching repair shops for city: ${city}`);
    const response = await fetch(
      `/api/maps/api/place/textsearch/json?query=réparateur+téléphone+${city}&key=${GOOGLE_MAPS_API_KEY}`
    );
    console.log(`Response status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`Error fetching repair shops: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Repair shops data for ${city}:`, data);
    return data;
  } catch (error) {
    console.error(error);
    return { results: [] };
  }
};

export const getPlaceDetails = async (placeId) => {
  try {
    console.log(`Fetching place details for placeId: ${placeId}`);
    const response = await fetch(
      `/api/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,formatted_phone_number,formatted_address,opening_hours,reviews,url&key=${GOOGLE_MAPS_API_KEY}`
    );
    console.log(`Response status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`Error fetching place details: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`Place details data for ${placeId}:`, data);
    return data;
  } catch (error) {
    console.error(error);
    return { result: {} };
  }
};

export const getTopRepairShops = async () => {
  const cities = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille'];
  const allShops = [];

  for (const city of cities) {
    const { results } = await searchRepairShops(city);
    console.log(`Top shops in ${city}:`, results);
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

  console.log('All shops:', allShops);
  return allShops.sort((a, b) => b.rating - a.rating).slice(0, 10);
};