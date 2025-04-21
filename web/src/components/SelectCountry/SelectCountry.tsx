import axios from "axios";
import React, { useEffect, useState } from "react";
import countriesJson from "@/helpers/countries.json";

interface SelectCountryProps {
  setFieldValue: (field: string, value: string) => void;
  value?: string;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
  setFieldValue,
  value,
}) => {
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(
    value || null
  );
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name", {
            timeout: 5000,
          }
        );
        const countryList = res.data.map(
          (c: { name: { common: string } }) => c.name.common
        );
        countryList.sort((a: string, b: string): number => a.localeCompare(b));
        setCountries(countryList);
        setFilteredCountries(countryList);
      } catch (error) {
        console.warn("Error al cargar los países:", error);
        const countryList = countriesJson.map(
          (c: { name: { common: string } }) => c.name.common
        );
        countryList.sort((a: string, b: string): number => a.localeCompare(b));
        setCountries(countryList);
        setFilteredCountries(countryList);
      } finally {
        setLoading(false); 
      }
    };
    fetchCountries();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = countries.filter((c) => c.toLowerCase().includes(value));
    setFilteredCountries(filtered);
  };

  const handleSelect = (country: string) => {
    setSelectedCountry(country); // Actualiza el estado local
    setSearch(""); // Limpia la búsqueda
    setIsOpen(false); // Cierra el menú desplegable
    setFieldValue("country", country); // Actualiza el valor del campo en Formik
  };

  return (
    <div>
      <label htmlFor="country" className="font-semibold text-xl">
        País
      </label>
      <div className="relative w-[350px] mb-4">
        <div
          className="border border-foreground rounded-md p-3 bg-custom-grisClarito cursor-pointer flex justify-between items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {loading ? "cargando países..." : selectedCountry || "Selecciona un país"}
          <span className="text-custom-GrisOscuro">▼</span>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-background border rounded-md mt-1 shadow-md z-10">
            <input
              id="country"
              type="text"
              placeholder="Buscar país..."
              value={search}
              onChange={handleSearch}
              className="w-full p-3 border-b outline-none"
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.map((country) => (
                <div
                  key={country}
                  className="p-3 hover:bg-blue-100 cursor-pointer dark:hover:text-background"
                  onClick={() => handleSelect(country)}
                >
                  {country}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCountry;
