import { useState } from "react";

interface SearchInputProps {
    onSearch: (searchText: string) => void; // Función que se ejecuta al buscar
}

export const SearchInput = ({ onSearch }: SearchInputProps) => {
    const [searchText, setSearchText] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setSearchText(text);

        // Si el texto tiene al menos 3 caracteres, ejecuta la búsqueda
        if (text.length >= 3) {
            onSearch(text);
        } else {
            onSearch(""); // Si hay menos de 3 caracteres, limpia la búsqueda
        }
    };

    return (
        <div className="search-input">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o apellido..."
                value={searchText}
                onChange={handleInputChange}
            />
        </div>
    );
};