interface BusinessSelectProps {
  businesses: { id: string; name: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

const BusinessSelect: React.FC<BusinessSelectProps> = ({ businesses, onChange, value }) => {
  return (
    <select
      className="bg-input/30 text-center border border-foreground rounded-md p-2"
      onChange={onChange}
      value={value}
    >
      {/* Solo se muestra si no hay valor seleccionado */}
      {!value && (
        <option value="" className="bg-background">
          Selecciona un negocio:
        </option>
      )}

      {businesses.length > 0 ? (
        businesses.map((business) => (
          <option key={business.id} value={business.id} className="bg-background">
            {business.name}
          </option>
        ))
      ) : (
        <option value="" className="text-sm text-custom-textGris italic pl-2 bg-background">
          No hay negocios creados
        </option>
      )}
    </select>
  );
};

export default BusinessSelect;
