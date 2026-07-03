import React from "react";
import {
	Flex,
	Heading,
	Card,
	Body,
	Banner,
	Caption,
	Button,
	IconButton,
	Select,
	Icon,
} from "../components";

export default function AbilitiesPage() {
	return (
		<>
			{/* --- ABILITIES --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="user-secret" /> Abilities
					</Body>
					<Card backgroundColor="darker" noBorder></Card>
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
