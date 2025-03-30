import React, { useRef } from "react";

interface IBusiness {
  id: string;
  name: string;
}

interface BusinessSelectProps {
  businesses: IBusiness[];
  onChange: (businessId: string) => void; 
  value: string;
  onViewBusiness: (businessId: string) => void; 
}

const BusinessSelect: React.FC<BusinessSelectProps> = ({
  businesses,
  onChange,
  value,
  onViewBusiness,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  let timeoutId: NodeJS.Timeout | null = null;

  const handleSelectClick = () => {
    timeoutId = setTimeout(() => {
      if (selectRef.current && selectRef.current.value === value) {
        onViewBusiness(value);
      }
    }, 200); 
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (timeoutId) {
      clearTimeout(timeoutId); 
    }

    if (selectedValue !== value) {
      onChange(selectedValue);
    }
  };

  return (
    <select
      ref={selectRef}
      className="bg-background text-center border border-black rounded-md p-2"
      onChange={handleChange}
      onClick={handleSelectClick} 
      value={value}
    >
      <option value="">Selecciona un negocio</option>
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
  );
};

export default BusinessSelect;