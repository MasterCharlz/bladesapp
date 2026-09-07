import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Card, Body, Banner, Button, Icon, Heading } from "../components";
import lairNodesData from "../data/LairNodes.json";
import { getStoreValue } from "../apiStore";

export default function AbilitiesPage({ profile }) {
	const router = useRouter();
	const [savedLairStates, setSavedLairStates] = useState({});

	useEffect(() => {
		if (!profile?.id) {
			setSavedLairStates({});
			return;
		}
		let mounted = true;
		getStoreValue(`lair-map-${profile.id}`, {}).then((saved) => {
			if (!mounted) return;
			setSavedLairStates(
				saved && typeof saved === "object" && !Array.isArray(saved)
					? saved
					: {},
			);
		});
		return () => {
			mounted = false;
		};
	}, [profile?.id]);

	const activeLairNodes = (
		lairNodesData.crew_type?.[profile?.crew_type] || []
	).filter(
		(node) =>
			savedLairStates[node.id] === true &&
			node.title !== "Lair" &&
			node.title !== "Turf",
	);

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
					<Card backgroundColor="darker" noBorder padding="none" />
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
					<Card backgroundColor="darker" noBorder padding="none" />
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
					<Card backgroundColor="darker" noBorder padding="none" />
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
							<Flex key={node.id} padding="md" direction="column">
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
							onClick={() => router.push(`/gm/${profile?.id}/lair-map`)}
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
