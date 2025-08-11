import { Routes, Route } from 'react-router'

import { MovieProvider } from './contexts/MovieContext'
import { Home } from './components/Home/Home'
import { Movies } from './components/Movies/Movies'
import { Actors } from './components/Actors/Actors'
import { Navigation } from './components/Navigation/Navigation'
import { Footer } from './components/Footer/Footer'

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <MovieProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
          </Routes>
        </MovieProvider>
      </main>
      <footer>
        <Footer />
      </footer>

    </>
  )
}

export default App
