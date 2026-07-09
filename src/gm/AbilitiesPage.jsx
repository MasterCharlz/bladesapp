import React from "react";
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
import { renderBoldText, useAbilitiesRepeater } from "../widgets/Repeaters";

function renderDescription(text) {
	return renderBoldText(text);
}

export default function AbilitiesPage({ profile }) {
	const {
		items: abilityItems,
		handleChange: handleAbilityChange,
		abilityOptions,
		abilityLookup,
	} = useAbilitiesRepeater(profile, crewAbilitiesData);

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
