import React from 'react';
import { Clearance } from '../models/clearance';

interface OfferCardComponentProps {
  clearance: Clearance;
}

const OfferCardComponent: React.FC<OfferCardComponentProps> = ({ clearance }) => {
  let categoryEn : string | null;

  try {
    categoryEn = clearance.product.categories.en || '';
  } catch {
    categoryEn = '';
  }

  return (
    <div className="card bg-base-300 min-w-96 shadow-xl h-full p-4">
      <div className="badge badge-lg badge-secondary self-end">
        {clearance.offer.percentDiscount.toFixed(0)}% Off
      </div>
      <figure className="px-10 pt-10">
        {clearance.product.image && (
          <img
            src={clearance.product.image}
            alt="Product"
            className="rounded-xl"
          />
        )}
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{clearance.product.description}</h2>
        <p>{categoryEn}</p>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-center items-start">
            <p className="text-accent font-light">Offer End Date</p>
            <p className="text-accent font-bold">
              {new Date(clearance.offer.endTime).toLocaleDateString('en-GB')}
            </p>
          </div>
          <div className="flex flex-row justify-end gap-4 w-fit self-end">
            <p className="text-xl text-primary font-bold">
              {clearance.offer.newPrice} {clearance.offer.currency}
            </p>
            <p className="text-l font-light line-through">
              {clearance.offer.originalPrice} {clearance.offer.currency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCardComponent;