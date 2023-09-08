import React, { useState, useEffect, useContext } from "react";
import { BsSearch, BsArrowRight } from "react-icons/bs";
// INTERNAL IMPORT
import Style from "./SearchBar.module.css";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import toast from "react-hot-toast";

const searchBar = ({ onHandleSearch, onClearSearch }) => {
  const { searchNft, filteredArr, nfts } = useContext(NFTMarketplaceContext);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);
  const [items, setItems] = useState();
  const [suggestions, setSuggestions] = useState(false);
  const changeSuggestion = () => setSuggestions((k) => !k);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchItem), 1000);
    return () => clearTimeout(timer);
  }, [searchItem]);

  useEffect(() => {
    if (search) {
      onHandleSearch(search);
    } else {
      onClearSearch();
    }
  }, [search]);

  const handleSearch = (item) => {
    if (!item.name) {
      toast.error("cannot search for empty word");
      return;
    }
    searchNft(item.name);
    setSearchItem("")
    setItems(null)
  };

  const handleSuggestions = (word) => {
    if(!word) {
      setItems([]);
      return;
    }
    const filteredArray = nfts.filter((item) => item.name.includes(word));
    setItems(filteredArray);
  };

  return (
    <div className={Style.SearchBar}>
      <div className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input
          type="text"
          placeholder="Input Keyword"
          onChange={(e) => {
            // if (!e.target.value) return;
            setSearchItem(e.target.value);
            handleSuggestions(e.target.value);
          }}
          value={searchItem}
          onMouseEnter={changeSuggestion}
          onMouseLeave={changeSuggestion}
        />
        <BsArrowRight
          onClick={() => {
            if (!searchItem) {
              toast.error("cannot search for empty word");
              return;
            }
            searchNft(searchItem);
          }}
          className={Style.SearchBar_box_icon}
        />
      </div>
      {suggestions && (
        <div className={Style.suggestionBox}>
          {items && items.length > 0 ? (
            <>
              {items.map((item, i) => (
                <h3 key={i} onClick={() => handleSearch(item)}>
                  {item.name}
                </h3>
              ))}
            </>
          ) : (
            <h3>No search results</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default searchBar;
