import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './component/Home';
import BasicCalculator from './component/BasicCalculator';
import BasicCalculator2 from './component/BasicCalculator2';
import ScientificCalculator from './component/ScientificCalculator';
import TrianglePythagoras from './component/TrianglePythagoras';
import TriangleAngle from './component/TriangleAngle';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/BasicCalculator" element={<BasicCalculator />} />
      <Route path="/BasicCalculator2" element={<BasicCalculator2 />} />
      <Route path="/ScientificCalculator" element={<ScientificCalculator />} />
      <Route path="/TrianglePythagoras" element={<TrianglePythagoras />} />
      <Route path="/TriangleAngle" element={<TriangleAngle />} />
    </Routes>
  </Router>
);

