interface BusinessSelectProps {
  businesses: { id: string; name: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string; 
}

const BusinessSelect: React.FC<BusinessSelectProps> = ({ businesses, onChange, value }) => {
  return (
    <select
      className="bg-background text-center border border-black rounded-md p-2"
      onChange={onChange}
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