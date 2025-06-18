import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar         from './components/Navbar';
import Footer         from './components/Footer';
import VoiceAssistant from './components/VoiceAssistant';

import Home      from './pages/Home';
import Products  from './pages/Products';
import About     from './pages/About';
import Contact   from './pages/Contact';
import Login     from './pages/Login';
import Cart      from './pages/Cart';
import NotFound  from './pages/NotFound';

import { FilterProvider } from './context/FilterContext';

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-1">
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/products"  element={<Products />} />
              <Route path="/about"     element={<About />} />
              <Route path="/contact"   element={<Contact />} />
              <Route path="/login"     element={<Login />} />
              <Route path="/cart"      element={<Cart />} />
              <Route path="*"          element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
          <VoiceAssistant />
        </div>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;
