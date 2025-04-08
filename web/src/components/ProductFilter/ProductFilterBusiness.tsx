"use client";
import { CiFilter, CiSearch, CiTrash } from "react-icons/ci";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

interface BusinessFilterProps {
  onFilterChange: (filters: { search?: string; categoryIds?: string[] }) => void;
  categories: Array<{ id: string; name: string }>;
}

const ProductBusinessFilter = ({ onFilterChange, categories }: BusinessFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Filtrar categorías según el término de búsqueda del dropdown
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  // Actualizar filtros cuando cambie el término de búsqueda o las categorías seleccionadas
  useEffect(() => {
    onFilterChange({
      search: debouncedSearchTerm,
      categoryIds: selectedCategories.length > 0 ? selectedCategories : undefined,
    });
  }, [debouncedSearchTerm, selectedCategories, onFilterChange]);

  // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".dropdown");
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Alternar selección de categoría
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Limpiar todos los filtros
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setCategorySearchTerm("");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center p-4 bg-gray-50 rounded-lg">
      {/* Input de búsqueda */}
      <div className="relative flex-1 w-full">
        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          id="search"
          type="text"
          placeholder="Buscar productos por nombre o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Dropdown de categorías */}
      <div className="w-full md:w-auto relative">
        <div className="flex items-center gap-2">
          <CiFilter className="text-gray-600" />
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100 min-w-[200px] justify-between"
          >
            <span>
              {selectedCategories.length > 0
                ? `${selectedCategories.length} seleccionadas`
                : "Todas las categorías"}
            </span>
            {selectedCategories.length > 0 && (
              <CiTrash
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCategories([]);
                }}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              />
            )}
          </button>
        </div>

        {isDropdownOpen && (
          <div className="dropdown absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div className="p-2 border-b">
              <input
                id="category-search"
                type="text"
                placeholder="Buscar categoría..."
                value={categorySearchTerm}
                onChange={(e) => setCategorySearchTerm(e.target.value)}
                className="w-full p-1 border rounded"
              />
            </div>

            <div>
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`p-2 hover:bg-blue-50 cursor-pointer ${
                    selectedCategories.includes(category.id) ? "bg-blue-100" : ""
                  }`}
                >
                  {category.name}
                </div>
              ))}
              {filteredCategories.length === 0 && (
                <div className="p-2 text-gray-500">No se encontraron categorías</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Botón para limpiar filtros */}
      {(searchTerm || selectedCategories.length > 0) && (
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
};

export default ProductBusinessFilter;