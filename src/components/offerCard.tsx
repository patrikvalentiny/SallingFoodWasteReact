import React from 'react';
import { Clearance } from '../models/clearance';

interface OfferCardComponentProps {
  clearance: Clearance;
}

const OfferCardComponent: React.FC<OfferCardComponentProps> = ({ clearance }) => {
  let categoryEn: string | null;

  try {
    categoryEn = clearance.product.categories.en?.split('>').pop() || '';
  } catch {
    categoryEn = '';
  }

  return (
    <div className="card card-side items-center bg-base-300 shadow-xl basis-80 flex-1">
      <figure className="min-w-28 max-w-28 h-full max-h-60 object-contain p-3">
        <img
          src={clearance.product.image}
          alt="Product"
          className="object-contain h-full"
        />
      </figure>
      <div className="card-body items-end text-center ">
        {/* <div className="badge badge-lg badge-secondary self-end">
        {clearance.offer.percentDiscount.toFixed(0)}% Off
      </div> */}
        <h2 className="card-title w-full text-right justify-end text-pretty max-w-40 break-words">{clearance.product.description}</h2>
        <p className='text-right w-full'>{categoryEn}</p>
        <div className="flex flex-col w-full items-right">
          <p className="text-accent font-light text-right">End Date</p>
          <p className="text-accent font-bold text-right">
            {new Date(clearance.offer.endTime).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-row justify-end w-full">

          <div className="flex flex-row justify-end items-center gap-4 w-fit self-end">
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