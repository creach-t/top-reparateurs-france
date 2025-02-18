import React, { useState, useEffect } from 'react';
import { Star, MapPin, Phone, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { getTopRepairShops } from '../services/placesService';

const RepairShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const data = await getTopRepairShops();
        setShops(data);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Top 10 Réparateurs en France
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shops.map((shop) => (
          <Card key={shop.place_id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{shop.name}</CardTitle>
                <a 
                  href={shop.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-100"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
              {renderStars(shop.rating)}
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <span>{shop.formatted_address}</span>
              </div>
              {shop.formatted_phone_number && (
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span>{shop.formatted_phone_number}</span>
                </div>
              )}
              {shop.opening_hours && (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span>{shop.opening_hours.weekday_text[new Date().getDay()]}</span>
                </div>
              )}
              {shop.reviews && shop.reviews.length > 0 && (
                <div className="mt-4 space-y-4">
                  {shop.reviews.slice(0, 2).map((review, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={review.profile_photo_url} 
                          alt={review.author_name}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{review.author_name}</span>
                        {renderStars(review.rating)}
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {new Date(review.time * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RepairShops;