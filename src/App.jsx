import React, { useState, useEffect } from 'react';
import profilesData from './profiles.json';
import { Flex } from './components';
import ProfileSelection from './ProfileSelection';

export default function App() {
  // const [profiles, setProfiles] = useState([]);

  // useEffect(() => {
  //   setProfiles(profilesData.profiles || []);
  // }, []);

  return (
    <div className="app-shell">
      <Flex justifyContent="center" alignItems="center" fullHeight direction="column" gap="lg">
        <img src="../src/images/bitd-logo.svg"/>
        <ProfileSelection/>
      </Flex>
    </div>
  );
}
