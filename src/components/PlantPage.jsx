
import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  function addPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function toggleStock(id) {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === id) {
        return {
  ...plant,
  isInStock: plant.isInStock === undefined ? false : !plant.isInStock,
};
      }
      return plant;
    });

    setPlants(updatedPlants);
  }

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={addPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={filteredPlants} onToggleStock={toggleStock} />
    </main>
  );
}

export default PlantPage;
