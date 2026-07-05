import React, { useEffect, useMemo, useState } from "react";
import {
	Flex,
	Card,
	Body,
	Banner,
	Button,
	IconButton,
	Select,
	Icon,
	Repeater,
	Heading,
} from "../components";
import crewAbilitiesData from "./CrewAbilities.json";

function renderDescription(text) {
	if (!text) return null;

	const parts = [];
	const segments = String(text).split(/(<\/b>|<b>)/g);
	let isBold = false;

	segments.forEach((segment, index) => {
		if (segment === "<b>") {
			isBold = true;
			return;
		}

		if (segment === "</b>") {
			isBold = false;
			return;
		}

		if (segment) {
			parts.push(
				isBold ? (
					<b key={`${segment}-${index}`}>{segment}</b>
				) : (
					<span key={`${segment}-${index}`}>{segment}</span>
				),
			);
		}
	});

	return <>{parts}</>;
}

export default function AbilitiesPage({ profile }) {
	const [abilityItems, setAbilityItems] = useState(profile?.abilities || []);
	const activeCrewType = useMemo(
		() => profile?.crew_type || "",
		[profile?.crew_type],
	);

	const abilityOptions = useMemo(() => {
		const abilities = crewAbilitiesData.crew_type?.[activeCrewType] || [];
		return abilities.map(({ value, title }) => ({ value, label: title }));
	}, [activeCrewType]);

	const abilityLookup = useMemo(() => {
		const abilities = crewAbilitiesData.crew_type?.[activeCrewType] || [];
		return abilities.reduce((acc, ability) => {
			acc[ability.value] = ability;
			return acc;
		}, {});
	}, [activeCrewType]);

	useEffect(() => {
		setAbilityItems(profile?.abilities || []);
	}, [profile?.id, profile?.abilities]);

	function persistAbilityItems(nextItems) {
		if (!profile?.id) return;

		try {
			const raw = localStorage.getItem("profiles");
			if (!raw) return;

			const profiles = JSON.parse(raw);
			const index = profiles.findIndex(
				(item) => String(item.id) === String(profile.id),
			);

			if (index > -1) {
				profiles[index] = { ...profiles[index], abilities: nextItems };
				localStorage.setItem("profiles", JSON.stringify(profiles));
			}
		} catch (e) {
			// ignore storage errors
		}
	}

	function handleAbilityChange(nextItems) {
		setAbilityItems(nextItems);
		persistAbilityItems(nextItems);
	}

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
					<Card backgroundColor="darker" noBorder></Card>
				</Flex>
			</Banner>

			{/* --- HUNTING GROUNDS --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="map-location-dot" /> Hunting Grounds
					</Body>
					<Card backgroundColor="darker" noBorder></Card>
				</Flex>
			</Banner>

			{/* --- LAIR --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="chess-rook" /> Lair Bonuses
					</Body>
					<Card backgroundColor="darker" noBorder></Card>
				</Flex>
			</Banner>
		</>
	);
}
