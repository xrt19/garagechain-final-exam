import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import CreateNewListing from './pages/CreateNewListing';
import ManageListings from './pages/ManageListings';
import NewlyAddedCars from './pages/NewlyAddedCars';
import './index.css'; // Global styles

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/new-listing" element={<CreateNewListing />} />
          <Route path="/manage-listings" element={<ManageListings />} />
          <Route path="/newly-added-cars" element={<NewlyAddedCars />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
