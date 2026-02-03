import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OpenSource from './sections/OpenSource'
import Writing from './sections/Writing'
import CPAchievements from './sections/CPAchievements'
import Projects from './sections/Projects'
import Footer from './components/Footer'

function App() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Hero />
            <OpenSource />
            <Writing />
            <CPAchievements />
            <Projects />
            <Footer />
        </div>
    )
}

export default App
