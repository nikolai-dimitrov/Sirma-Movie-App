import { Routes, Route } from 'react-router'

import { Home } from './components/Home/Home'
import { Movies } from './components/Movies/Movies'
import { Actors } from './components/Actors/Actors'
import { Navigation } from './components/Navigation/Navigation'

function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
        </Routes>
      </main>
      <footer></footer>

    </>
  )
}

export default App
