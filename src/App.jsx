import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Flex } from './components';
import ProfileSelection from './ProfileSelection';
import GMView from './GMView';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Flex justifyContent="center" alignItems="center" fullHeight direction="column" gap="lg">
          <img src="../src/images/bitd-logo.svg"/>
          <Routes>
            <Route path="/" element={<ProfileSelection />} />
            <Route path="/gm/:id" element={<GMView />} />
          </Routes>
        </Flex>
      </div>
    </BrowserRouter>
  );
}
