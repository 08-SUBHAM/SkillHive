import React from 'react'
import Hero from './Components/Hero'
import Header from './Components/Header'
import SkillSlider from './Components/SkillSlider'

function App() {
  return (
    <div className="relative">
      <div className="wrapper" id="wrapper">
        <Header />
        <Hero />
        <SkillSlider />
      </div>
    </div>
  )
}

export default App