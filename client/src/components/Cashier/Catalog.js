import React, { useEffect, useState } from 'react';
import categoryService from '../../services/categoryService';
import productService from '../../services/productService'; // Importer le service de recherche des produits
import "./catalog.css";
import toastr from 'toastr';
import { FaSearch } from "react-icons/fa";

const Catalog = () => {
    const [catList, setCatList] = useState([{ name: "All categories" }]);
    const [searchQuery, setSearchQuery] = useState("");
    const [productResults, setProductResults] = useState([]); // Stocker les résultats de recherche
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    // Fonction pour récupérer toutes les catégories
    const getAllCategories = async () => {
        try {
            const categories = await categoryService.getAllCategories();
            setCatList([...catList, ...categories]);
        } catch (error) {
            toastr.error("Error fetching categories");
        }
    };

    // Fonction pour rechercher les produits
    const searchProducts = async (query) => {
        try {
            if (query.length >= 3) { // Recherche uniquement si la longueur du texte est >= 3 caractères
                const results = await productService.searchProductsByName(query);
                setProductResults(results);
            } else {
                setProductResults([]); // Réinitialiser les résultats si moins de 3 caractères
            }
        } catch (error) {
            toastr.error("Error searching products");
        }
    };

    // Gestion de la recherche avec debounce
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Supprimer le délai précédent s'il existe
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // Créer un nouveau délai
        const timeout = setTimeout(() => {
            searchProducts(query); // Appeler l'API après 500 ms
        }, 500);

        setDebounceTimeout(timeout);
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className='catalog'>
            <div className="pr-header">
                <select className="category-dropdown">
                    {catList.map((category) => (
                        <option key={category.name} value={category.name}>{category.name}</option>
                    ))}
                </select>

                <div className="searchBar">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery} 
                        onChange={handleSearch} // Déclenche une recherche dynamique
                    />
                    <FaSearch className='search-icon' />
                </div>
            </div>

            <div className="search-results">
                {productResults.length > 0 ? (
                    <ul>
                        {productResults.map((product) => (
                            <li key={product._id}>{product.name}</li>
                        ))}
                    </ul>
                ) : (
                    searchQuery.length >= 3 && <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default Catalog;
