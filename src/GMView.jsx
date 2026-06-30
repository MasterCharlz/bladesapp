import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flex, Heading, Card, Button, Body, Caption } from './components';

export default function GMView() {
  const { index } = useParams();
  const navigate = useNavigate();
  const idx = parseInt(index, 10);

  const profilesRaw = (() => {
    try {
      return JSON.parse(localStorage.getItem('profiles') || '[]');
    } catch (e) {
      return [];
    }
  })();

  const profile = profilesRaw[idx];

  if (!profile) {
    return (
      <Flex direction="column" gap="md" fullWidth alignItems="center">
        <Heading size={2} color="highlight">GM View</Heading>
        <Body>No crew found for this GM view.</Body>
        <Button onClick={() => navigate('/')}>Back</Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="md" fullWidth alignItems="center">
      <Heading size={2} color="highlight">GM View — {profile.crew_name}</Heading>
      <Card fullWidth>
        <Heading size={3}>{profile.crew_name}</Heading>
        <Caption color="light">Type: {profile.crew_type}</Caption>
        <div style={{ marginTop: 12 }}>
          <Heading size={4}>Characters</Heading>
          {profile.characters && profile.characters.length ? (
            profile.characters.map((c) => (
              <Card key={c.id} padding="md" style={{ marginTop: 8 }}>
                <Flex alignItems="center" gap="md">
                  <Body bold>{c.value.name}</Body>
                  <Caption color="light">{c.value.playbook}</Caption>
                </Flex>
              </Card>
            ))
          ) : (
            <Body>No characters yet.</Body>
          )}
        </div>
      </Card>
      <Flex>
        <Button onClick={() => navigate('/')}>Back</Button>
      </Flex>
    </Flex>
  );
}
