import React from 'react';
import { Star, MapPin, Phone, Clock } from 'lucide-react';

const RepairShops = () => {
  const shops = [
    {
      name: "SAVE Réparation Paris",
      address: "15 Rue de Rivoli, 75004 Paris",
      rating: 4.9,
      phone: "01 42 33 44 55",
      review: "Service exceptionnel ! Ils ont réparé mon iPhone en moins d'une heure. L'équipe est très professionnelle et transparente sur les prix. Je recommande vivement !",
      reviewer: "Marie L.",
      hours: "Lun-Sam: 9h30-19h"
    },
    {
      name: "SmartFix Lyon",
      address: "25 Rue de la République, 69002 Lyon",
      rating: 4.8,
      phone: "04 72 12 34 56",
      review: "Très satisfait de la réparation de mon Samsung. Prix raisonnable et travail soigné. Le technicien a pris le temps de m'expliquer chaque étape.",
      reviewer: "Thomas B.",
      hours: "Lun-Ven: 10h-19h, Sam: 10h-18h"
    },
    {
      name: "Tech Care Marseille",
      address: "45 La Canebière, 13001 Marseille",
      rating: 4.9,
      phone: "04 91 23 45 67",
      review: "Équipe au top ! Réparation rapide et efficace de mon iPad. Le meilleur rapport qualité-prix sur Marseille.",
      reviewer: "Sophie M.",
      hours: "Lun-Sam: 9h-19h30"
    }
  ];

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
        <span className="ml-2 text-sm font-medium">{rating}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Top 10 Réparateurs en France
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shops.map((shop, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <h2 className="text-xl font-semibold mb-2">{shop.name}</h2>
              {renderStars(shop.rating)}
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
                <span>{shop.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{shop.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span>{shop.hours}</span>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 italic">"{shop.review}"</p>
                <p className="text-gray-500 mt-2 text-sm">- {shop.reviewer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairShops;