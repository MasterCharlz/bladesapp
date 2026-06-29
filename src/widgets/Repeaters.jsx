import React from 'react';
import { Repeater, Flex, Body, Caption, TextInput, Select, Button, IconButton } from '../components';

export default function PlayerCharacterRepeater() {
  return (
    <Repeater
      addButtonText="Character"
      addIcon="plus"
      initialFormValue={{ name: '', playbook: '' }}


      formRenderer={({ value, setValue, onSave, onCancel }) => (

// --- FORM ROW ---
        <Flex direction="column" gap="sm" padding="md" className="repeater__row">
          <Body color="highlight" bold>New Character</Body>
          <TextInput
            placeholder="Enter Name"
            value={value.name}
            onChange={(name) => setValue({ ...value, name })}
          />
          <Select
            value={value.playbook}
            onChange={(playbook) => setValue({ ...value, playbook })}
            options={['Cutter', 'Hound', 'Leech', 'Lurk', 'Slide', 'Spider', 'Whisper']}
            placeholder="Select Scoundrel..."
          />
          <Flex gap="sm" justifyContent="space-between" paddingTop="md">
            <Button icon="check" onClick={() => onSave(value)}>
              Create Character
            </Button>
            <Button variant="tertiary" onClick={onCancel}>
              Cancel
            </Button>
          </Flex>
        </Flex>
      )}
      itemRenderer={({ value, onDelete }) => (

// --- ITEM ROW ---
        <Flex gap="sm" alignItems="center" padding="md" className="repeater__row">
          <Body color="highlight" bold>{value.name}</Body>
          <Caption color="light">{value.playbook}</Caption>
          <IconButton icon="trash-alt" variant="tertiary" onClick={onDelete} marginLeft="auto"/>
        </Flex>
      )}
    />
  );
}
