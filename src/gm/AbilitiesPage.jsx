import React, { useState } from "react";
import {
	Flex,
	Card,
	Body,
	Banner,
	Button,
	IconButton,
	Select,
	TextInput,
	Icon,
	Repeater,
	Heading,
	Pip,
} from "../components";
import crewAbilitiesData from "./CrewAbilities.json";
import crewSpecialtiesData from "./CrewSpecialties.json";
import crewUpgradesData from "./CrewUpgrades.json";
import {
	renderBoldText,
	useAbilitiesRepeater,
	useHuntingGroundsRepeater,
	useUpgradesRepeater,
} from "../widgets/Repeaters";

function renderDescription(text) {
	return renderBoldText(text);
}

function UpgradeItem({ value, upgradeLookup, onDelete, onUpdate }) {
	const selectedUpgrade = upgradeLookup[value.upgrade];
	const [activePips, setActivePips] = useState(value.pipStates || {});

	const togglePip = (index) => {
		const newPipStates = {
			...activePips,
			[index]: !activePips[index],
		};
		setActivePips(newPipStates);
		onUpdate({ ...value, pipStates: newPipStates });
	};

	return (
		<Flex
			gap="md"
			alignItems="flex-start"
			padding="md"
			className="repeater__row"
		>
			<Flex gap="sm" alignItems="center">
				{Array.from({ length: selectedUpgrade?.pips || 0 }).map((_, i) => (
					<Pip
						key={i}
						active={activePips[i] || false}
						onChange={() => togglePip(i)}
					/>
				))}
				<Body>{selectedUpgrade?.description || value.upgrade}</Body>
			</Flex>
			<IconButton
				icon="trash-alt"
				variant="tertiary"
				onClick={onDelete}
				marginLeft="auto"
			/>
		</Flex>
	);
}

export default function AbilitiesPage({ profile }) {
	const {
		items: abilityItems,
		handleChange: handleAbilityChange,
		abilityOptions,
		abilityLookup,
	} = useAbilitiesRepeater(profile, crewAbilitiesData);

	const {
		items: upgradeItems,
		handleChange: handleUpgradeChange,
		upgradeOptions,
		upgradeLookup,
	} = useUpgradesRepeater(profile, crewUpgradesData);

	const {
		items: huntingGroundItems,
		handleChange: handleHuntingGroundChange,
		specialtyOptions,
	} = useHuntingGroundsRepeater(profile, crewSpecialtiesData);

	return (
		<>
			{/* --- ABILITIES --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="user-secret" /> Abilities
					</Body>
					<Card backgroundColor="darker" noBorder padding="none">
						<Repeater
							controlledItems={abilityItems}
							onChange={handleAbilityChange}
							initialItems={profile?.abilities || []}
							initialFormValue={{ ability: "" }}
							addButtonText="Ability"
							addIcon="plus"
							formRenderer={({ value, setValue, onSave, onCancel }) => (
								<Flex
									direction="column"
									gap="sm"
									padding="md"
									className="repeater__row"
								>
									<Body color="highlight" bold>
										New Crew Ability
									</Body>
									<Select
										value={value.ability}
										onChange={(ability) => setValue({ ability })}
										options={abilityOptions}
										placeholder="Select an ability..."
									/>
									<Flex gap="sm" justifyContent="space-between" paddingTop="md">
										<Button
											icon="check"
											onClick={() =>
												value.ability && onSave({ ability: value.ability })
											}
										>
											Save
										</Button>
										<Button variant="tertiary" onClick={onCancel}>
											Cancel
										</Button>
									</Flex>
								</Flex>
							)}
							itemRenderer={({ key, value, onDelete }) => {
								const selectedAbility = abilityLookup[value.ability];

								return (
									<Flex
										key={key}
										gap="sm"
										alignItems="flex-start"
										padding="md"
										className="repeater__row"
									>
										<div>
											<Heading size={4} color="highlight">
												{selectedAbility?.title || value.ability}
											</Heading>
											<Body className={"ability-description"}>
												{renderDescription(selectedAbility?.Description || "")}
											</Body>
										</div>
										<IconButton
											icon="trash-alt"
											variant="tertiary"
											onClick={onDelete}
											marginLeft="auto"
										/>
									</Flex>
								);
							}}
						/>
					</Card>
				</Flex>
			</Banner>

			{/* --- UPGRADES --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="gears" /> Upgrades
					</Body>
					<Card backgroundColor="darker" noBorder padding="none">
						<Repeater
							controlledItems={upgradeItems}
							onChange={handleUpgradeChange}
							initialItems={profile?.upgrades || []}
							initialFormValue={{ upgrade: "" }}
							addButtonText="Upgrade"
							addIcon="plus"
							formRenderer={({ value, setValue, onSave, onCancel }) => (
								<Flex
									direction="column"
									gap="sm"
									padding="md"
									className="repeater__row"
								>
									<Body color="highlight" bold>
										New Crew Upgrade
									</Body>
									<Select
										value={value.upgrade}
										onChange={(upgrade) => setValue({ upgrade })}
										options={upgradeOptions}
										placeholder="Select an upgrade..."
									/>
									<Flex gap="sm" justifyContent="space-between" paddingTop="md">
										<Button
											icon="check"
											onClick={() =>
												value.upgrade && onSave({ upgrade: value.upgrade })
											}
										>
											Save
										</Button>
										<Button variant="tertiary" onClick={onCancel}>
											Cancel
										</Button>
									</Flex>
								</Flex>
							)}
							itemRenderer={({ key, value, onDelete, onUpdate }) => (
								<UpgradeItem
									key={key}
									value={value}
									upgradeLookup={upgradeLookup}
									onDelete={onDelete}
									onUpdate={onUpdate}
								/>
							)}
						/>
					</Card>
				</Flex>
			</Banner>

			{/* --- HUNTING GROUNDS --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="map-location-dot" /> Hunting Grounds
					</Body>
					<Card backgroundColor="darker" noBorder padding="none">
						<Repeater
							controlledItems={huntingGroundItems}
							onChange={handleHuntingGroundChange}
							initialItems={profile?.huntingGrounds || []}
							initialFormValue={{ name: "", specialty: "" }}
							addButtonText="Hunting Ground"
							addIcon="plus"
							formRenderer={({ value, setValue, onSave, onCancel }) => (
								<Flex
									direction="column"
									gap="sm"
									padding="md"
									className="repeater__row"
								>
									<Body color="highlight" bold>
										New Hunting Ground
									</Body>
									<TextInput
										value={value.name}
										onChange={(name) => setValue({ ...value, name })}
										placeholder="Enter Name"
									/>
									<Select
										value={value.specialty}
										onChange={(specialty) => setValue({ ...value, specialty })}
										options={specialtyOptions}
										placeholder="Select a specialty..."
									/>
									<Flex gap="sm" justifyContent="space-between" paddingTop="md">
										<Button
											icon="check"
											onClick={() =>
												value.name?.trim() &&
												value.specialty &&
												onSave({
													name: value.name.trim(),
													specialty: value.specialty,
												})
											}
										>
											Save
										</Button>
										<Button variant="tertiary" onClick={onCancel}>
											Cancel
										</Button>
									</Flex>
								</Flex>
							)}
							itemRenderer={({ key, value, onDelete }) => (
								<Flex
									key={key}
									gap="sm"
									alignItems="flex-start"
									padding="md"
									className="repeater__row"
								>
									<Flex direction="column" gap="xs">
										<Body color="highlight" bold>
											{value.name}
										</Body>
										<Body>{value.specialty}</Body>
									</Flex>
									<IconButton
										icon="trash-alt"
										variant="tertiary"
										onClick={onDelete}
										marginLeft="auto"
									/>
								</Flex>
							)}
						/>
					</Card>
				</Flex>
			</Banner>

			{/* --- LAIR --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="chess-rook" /> Lair Bonuses
					</Body>
					<Card backgroundColor="darker" noBorder padding="none">
						<Button icon="magnifying-glass" variant="tertiary" fullWidth>
							View Map
						</Button>
					</Card>
				</Flex>
			</Banner>
		</>
	);
}
