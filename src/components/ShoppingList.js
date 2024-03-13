import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState('')

  function onSearchChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onItemFormSubmit(newItem) {
    setItems([
      ...items,
      newItem      
        ])
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  }).filter(item => {
    if (search === "") {
      return item
    } else {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return item 
      }
    }
  })

  return (
    <div className="ShoppingList">
      <ItemForm
      onItemFormSubmit ={onItemFormSubmit}
      />
      <Filter 
      onCategoryChange={handleCategoryChange}
      search={search}
      setSearch={setSearch}
      onSearchChange={onSearchChange}  
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
