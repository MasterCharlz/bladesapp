import React, { useState, useEffect } from 'react';
import { Flex, Body, Caption, TextInput, Select, Button, IconButton } from '../components';

export default function PlayerCharacterRepeater({ initialItems = [], onPersist, profileName }) {
  const [items, setItems] = useState(initialItems || []);
  const [isCreating, setIsCreating] = useState(false);
  const [formValue, setFormValue] = useState({ name: '', playbook: '' });

  useEffect(() => {
    setItems(initialItems || []);
  }, [initialItems]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('profiles');
      if (raw) {
        const arr = JSON.parse(raw);
        const idx = arr.findIndex((p) => p.crew_name === profileName);
        if (idx > -1) {
          arr[idx].characters = items;
          localStorage.setItem('profiles', JSON.stringify(arr));
        }
      }
    } catch (e) {
      // ignore
    }
    onPersist?.(items);
  }, [items]);

  function handleSave() {
    if (!formValue.name.trim()) return;
    const next = [...items, { id: crypto.randomUUID(), value: { name: formValue.name.trim(), playbook: formValue.playbook } }];
    setItems(next);
    setFormValue({ name: '', playbook: '' });
    setIsCreating(false);
  }

  function handleDelete(id) {
    setItems(items.filter((it) => it.id !== id));
  }

  return (
    <div>
      {items.map((item) => (
        <Flex key={item.id} gap="sm" alignItems="center" padding="md" className="repeater__row">
          <Body color="highlight" bold>{item.value.name}</Body>
          <Caption color="light">{item.value.playbook}</Caption>
          <IconButton icon="trash-alt" variant="tertiary" onClick={() => handleDelete(item.id)} marginLeft="auto" />
        </Flex>
      ))}

      {isCreating && (
        <Flex direction="column" gap="sm" padding="md" className="repeater__row">
          <Body color="highlight" bold>New Character</Body>
          <TextInput placeholder="Enter Name" value={formValue.name} onChange={(name) => setFormValue({ ...formValue, name })} />
          <Select
            value={formValue.playbook}
            onChange={(playbook) => setFormValue({ ...formValue, playbook })}
            options={["Cutter", "Hound", "Leech", "Lurk", "Slide", "Spider", "Whisper"]}
            placeholder="Select Scoundrel..."
          />
          <Flex gap="sm" justifyContent="space-between" paddingTop="md">
            <Button icon="check" onClick={handleSave}>Create Character</Button>
            <Button variant="tertiary" onClick={() => { setIsCreating(false); setFormValue({ name: '', playbook: '' }); }}>Cancel</Button>
          </Flex>
        </Flex>
      )}

      {!isCreating && (
        <Button variant="tertiary" icon="plus" onClick={() => setIsCreating(true)} fullWidth padding="md">Character</Button>
      )}
    </div>
  );
}
