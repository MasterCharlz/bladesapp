import React, { useState } from 'react';
import { Card, Button, Flex, TextInput, Select, Collapsible, Heading } from './components';
import PlayerCharacterRepeater from './widgets/Repeaters';

export default function ProfileSelection() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [newProfile, setNewProfile] = useState({ crew_name: '', crew_type: '' });

  const handleCancelCreate = () => {
    setNewProfile({ crew_name: '', crew_type: '' });
    setShowCreateForm(false);
  };

  const handleCreateCrew = () => {
    if (!newProfile.crew_name.trim()) return;

    const createdProfile = {
      crew_name: newProfile.crew_name.trim(),
      crew_type: newProfile.crew_type,
      subprofiles: [{ subprofile_type: 'gm' }],
    };

    setProfiles((prev) => [...prev, createdProfile]);
    setNewProfile({ crew_name: '', crew_type: '' });
    setShowCreateForm(false);
  };

  const handleDeleteProfile = (indexToRemove) => {
    setProfiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <Flex direction="column" gap="lg" fullWidth alignItems="center">
      {profiles.map((profile, index) => (
        <Card key={`${profile.crew_name || 'crew'}-${index}`} padding="none" fullWidth noBorder>
          <Collapsible>
            <Collapsible.Header>
              <Heading color="highlight" size={3}>
                {profile.crew_name || 'Untitled Crew'}
              </Heading>
            </Collapsible.Header>
            <Collapsible.Body>
              <Flex marginBottom="md">
                <Button icon="dice">GM View</Button>
                <Button variant="tertiary" marginLeft="auto" onClick={() => handleDeleteProfile(index)}>
                  Delete Crew
                </Button>
              </Flex>
              <Card noBorder padding="none" backgroundColor="darker">
                <PlayerCharacterRepeater />
              </Card>
            </Collapsible.Body>
          </Collapsible>
        </Card>
      ))}

      {showCreateForm && (
        <Card borderColor="highlight" fullWidth>
          <TextInput
            placeholder="Crew Name"
            value={newProfile.crew_name}
            onChange={(value) => setNewProfile((prev) => ({ ...prev, crew_name: value }))}
            marginBottom="md"
          />
          <Select
            options={['Assassins', 'Bravos', 'Cult', 'Hawkers', 'Smugglers', 'Shadows']}
            value={newProfile.crew_type}
            onChange={(value) => setNewProfile((prev) => ({ ...prev, crew_type: value }))}
            placeholder="Select Type..."
            marginBottom="md"
          />
          <Flex>
            <Button variant="primary" icon="check" onClick={handleCreateCrew}>
              Create Crew
            </Button>
            <Button variant="tertiary" marginLeft="auto" onClick={handleCancelCreate}>
              Cancel
            </Button>
          </Flex>
        </Card>
      )}

      <Button icon="plus" variant="secondary" onClick={() => setShowCreateForm(true)}>
        Crew
      </Button>
    </Flex>
  );
}
