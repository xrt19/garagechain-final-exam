import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Welcome from './pages/Welcome';
import CreateNewListing from './pages/CreateNewListing';
import ManageListings from './pages/ManageListings';
import NewlyAddedCars from './pages/NewlyAddedCars';
import Footer from './components/Footer'; // Import Footer component
import Logo from './components/Logo';
import Header from './components/Header'; // Import Header component


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
            <Footer /> {/* Add Footer here */}
        </Router>
    );
}

export default App;
