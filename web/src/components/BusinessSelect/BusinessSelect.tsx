"use client"
import React from "react";

interface BusinessSelectProps {
  businesses: { id: string; name: string }[];
}

const BusinessSelect: React.FC<BusinessSelectProps> = ({ businesses }) => {

  return (
    <div className="flex items-center justify-center m-5 h-6">
      <select
        className="bg-background text-center border border-black rounded-md p-2"
        // onChange={handleChange}
      >
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <option key={business.id} value={business.id}>
              {business.name}
            </option>
          ))
        ) : (
          <option value="">Cargando negocios...</option>
        )}
      </select>
    </div>
  );
};

export default BusinessSelect;
