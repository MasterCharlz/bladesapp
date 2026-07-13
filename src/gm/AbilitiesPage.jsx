import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Flex,
	Card,
	Body,
	Caption,
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
import lairNodesData from "./LairNodes.json";
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
		<Flex gap="md" alignItems="center" padding="md" className="repeater__row">
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
	const navigate = useNavigate();
	let savedLairStates = {};
	try {
		const saved = JSON.parse(
			localStorage.getItem(`lair-map-${profile?.id}`) || "{}",
		);
		if (saved && typeof saved === "object" && !Array.isArray(saved)) {
			savedLairStates = saved;
		}
	} catch (e) {
		// ignore storage failures
	}

	const activeLairNodes = (
		lairNodesData.crew_type?.[profile?.crew_type] || []
	).filter(
		(node) =>
			savedLairStates[node.id] === true &&
			node.title !== "Lair" &&
			node.title !== "Turf",
	);
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
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="user-secret" color="highlight" />
						<Body color="highlight" bold>
							Abilities
						</Body>
					</Flex>
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
									gap="xs"
									padding="md"
									className="repeater__row"
								>
									<Caption color="highlight">New Crew Ability</Caption>
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
										<Flex direction="column" gap="xs">
											<Heading size={4} color="highlight">
												{selectedAbility?.title || value.ability}
											</Heading>
											<Body className={"ability-description"}>
												{renderDescription(selectedAbility?.Description || "")}
											</Body>
										</Flex>
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
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="gears" color="highlight" />
						<Body color="highlight" bold>
							Upgrades
						</Body>
					</Flex>
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
									gap="xs"
									padding="md"
									className="repeater__row"
								>
									<Caption color="highlight">New Crew Upgrade</Caption>
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
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="map-location-dot" color="highlight" />
						<Body color="highlight" bold>
							Hunting Grounds
						</Body>
					</Flex>
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
									gap="xs"
									padding="md"
									className="repeater__row"
								>
									<Caption color="highlight">New Hunting Ground</Caption>
									<Flex direction="column" gap="sm">
										<TextInput
											value={value.name}
											onChange={(name) => setValue({ ...value, name })}
											placeholder="Enter Name"
										/>
										<Select
											value={value.specialty}
											onChange={(specialty) =>
												setValue({ ...value, specialty })
											}
											options={specialtyOptions}
											placeholder="Select a specialty..."
										/>
									</Flex>
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
										<Heading size={4} color="highlight">
											{value.name}
										</Heading>
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
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="chess-rook" color="highlight" />
						<Body color="highlight" bold>
							Lair Bonuses
						</Body>
					</Flex>
					<Card backgroundColor="darker" noBorder padding="none">
						{activeLairNodes.map((node) => (
							<Flex
								key={node.id}
								className="repeater__row"
								padding="md"
								direction="column"
							>
								<Heading size={4} color="highlight">
									{node.title}
								</Heading>
								<Body>{node.description}</Body>
							</Flex>
						))}
						<Button
							icon="magnifying-glass"
							variant="tertiary"
							fullWidth
							onClick={() => navigate(`/gm/${profile?.id}/lair-map`)}
							padding="md"
						>
							View Map
						</Button>
					</Card>
				</Flex>
			</Banner>
		</>
	);
}
