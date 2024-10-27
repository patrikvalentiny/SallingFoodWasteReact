import { Clearance } from '../models/clearance';
import OfferCardComponent from './offerCard';

export default function StoreClearancesComponent({ clearances, } : { clearances: Clearance[]}) {



  return (
    <div className="flex flex-col gap-4 p-2">
      <div className="flex flex-row flex-wrap gap-4 pt-16 ">
        {clearances.map((clearance) => (
          <OfferCardComponent key={clearance.offer.ean} clearance={clearance} />
        ))}
      </div>
    </div>
  );
};
