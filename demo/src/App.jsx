import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/Counter'
import List from './components/List'
import StyleDemo from './components/StyleDemo'
import SimpleForm from './components/SimpleForm'
import ProjectStructure from './components/ProjectStructure'
import ControlledVsUncontrolled from './components/ControlledVsUncontrolled'

function App() {
  return (
    <>
      {/* <SimpleForm /> */}
      {/* <ProjectStructure /> */}
      <ControlledVsUncontrolled />
      {/* <Counter />
      <List />
      <StyleDemo /> */}
    </>
  )
}

export default App
