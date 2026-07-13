import React, { useEffect, useState } from "react";
import {
	Flex,
	Heading,
	Card,
	Body,
	Caption,
	Banner,
	Icon,
	Stepper,
	IconButton,
	Button,
} from "../components";
import { useProfileDataPersist } from "../widgets/Repeaters";
import lairNodesData from "../data/gm/LairNodes.json";

const DEFAULT_HEAT_DATA = {
	crewXp: 0,
	tier: 0,
	strongHold: false,
	rep: 0,
	heat: 0,
	wanted: 0,
	coin: 0,
};

export default function HeatPage({ profile }) {
	const [heatData, setHeatData] = useState(() => ({
		...DEFAULT_HEAT_DATA,
		...(profile?.heatData || {}),
	}));
	const [activeTurfCount, setActiveTurfCount] = useState(0);
	const persistHeatData = useProfileDataPersist(profile?.id, "heatData");

	useEffect(() => {
		try {
			const savedStates = JSON.parse(
				localStorage.getItem(`lair-map-${profile?.id}`) || "{}",
			);
			const lairNodes = lairNodesData.crew_type?.[profile?.crew_type] || [];
			const turfCount = lairNodes.filter(
				(node) => node.title === "Turf" && savedStates[node.id] === true,
			).length;

			setActiveTurfCount(Math.min(turfCount, 12));
		} catch (error) {
			setActiveTurfCount(0);
		}
	}, [profile?.id, profile?.crew_type]);

	useEffect(() => {
		persistHeatData(heatData);
	}, [heatData, persistHeatData]);

	function updateValue(key, value) {
		setHeatData((previous) => ({ ...previous, [key]: value }));
	}

	function changeValue(key, delta, maximum) {
		setHeatData((previous) => ({
			...previous,
			[key]: Math.max(0, Math.min(maximum, previous[key] + delta)),
		}));
	}

	function getRepSegmentClass(index) {
		return index >= 12 - activeTurfCount ? "turf--active" : "";
	}

	return (
		<>
			{/* --- CREW XP --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="angles-up" color="highlight" />
						<Body color="highlight" bold>
							Crew XP
						</Body>
					</Flex>
					<Stepper amount={10} activeCount={heatData.crewXp} />
					<Flex gap="sm">
						<IconButton
							color="highlight"
							icon="minus"
							onClick={() => changeValue("crewXp", -1, 10)}
						/>
						<IconButton
							color="highlight"
							icon="plus"
							onClick={() => changeValue("crewXp", 1, 10)}
						/>
					</Flex>
				</Flex>
			</Banner>

			{/* --- TIER --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex gap="md" justifyContent="space-between" alignItems="baseline">
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="crown" color="highlight" />
							<Body color="highlight" bold>
								Tier
							</Body>
						</Flex>
						<Caption>
							{heatData.strongHold ? "Strong Hold" : "Weak Hold"}
						</Caption>
					</Flex>
					<Stepper amount={4} activeCount={heatData.tier} />
					<Flex gap="md" justifyContent="space-between" alignItems="center">
						<Flex gap="sm">
							<IconButton
								color="highlight"
								icon="minus"
								onClick={() => changeValue("tier", -1, 4)}
							/>
							<IconButton
								color="highlight"
								icon="plus"
								onClick={() => changeValue("tier", 1, 4)}
							/>
						</Flex>
						<IconButton
							icon="refresh"
							variant="secondary"
							className={heatData.strongHold ? "icon-btn--rotated" : ""}
							onClick={() => updateValue("strongHold", !heatData.strongHold)}
						/>
					</Flex>
				</Flex>
			</Banner>

			{/* --- REP --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex gap="md" justifyContent="space-between" alignItems="baseline">
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="hand-fist" color="highlight" />
							<Body color="highlight" bold>
								Rep
							</Body>
						</Flex>
						<Caption color="hero">Turf</Caption>
					</Flex>
					<Stepper
						amount={12}
						activeCount={heatData.rep}
						getSegmentClass={getRepSegmentClass}
					/>
					<Flex gap="sm">
						<IconButton
							color="highlight"
							icon="minus"
							onClick={() => changeValue("rep", -1, 12)}
						/>
						<IconButton
							color="highlight"
							icon="plus"
							onClick={() => changeValue("rep", 1, 12)}
						/>
					</Flex>
				</Flex>
			</Banner>

			{/* --- HEAT --- */}
			<Banner>
				<Flex gap="lg" alignItems="flex-end">
					<Flex direction="column" gap="sm" flexGrow={10}>
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="fire" color="highlight" />
							<Body color="highlight" bold>
								Heat
							</Body>
						</Flex>
						<Stepper amount={9} activeCount={heatData.heat} />
						<Flex gap="sm">
							<IconButton
								color="highlight"
								icon="minus"
								onClick={() => changeValue("heat", -1, 9)}
							/>
							<IconButton
								color="highlight"
								icon="plus"
								onClick={() => changeValue("heat", 1, 9)}
							/>
						</Flex>
					</Flex>
					<Flex direction="column" gap="sm" alignItems="flex-end" flexGrow={1}>
						<Caption color="heat">Wanted</Caption>
						<Stepper
							amount={4}
							activeCount={heatData.wanted}
							className={"stepper--heat"}
						/>
						<Flex gap="sm" alignItems="flex-end">
							<IconButton
								color="heat"
								icon="minus"
								onClick={() => changeValue("wanted", -1, 4)}
							/>
							<IconButton
								color="heat"
								icon="plus"
								onClick={() => changeValue("wanted", 1, 4)}
							/>
						</Flex>
					</Flex>
				</Flex>
			</Banner>

			{/* --- COIN --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="ring" color="highlight" />
						<Body color="highlight" bold>
							Coin
						</Body>
					</Flex>
					<Stepper
						amount={16}
						activeCount={heatData.coin}
						className={
							heatData.coin >= 8
								? "stepper--coin vault-1 vault-2"
								: heatData.coin >= 4
									? "stepper--coin vault-1"
									: "stepper--coin"
						}
					/>
					<Flex gap="sm">
						<IconButton
							color="highlight"
							icon="minus"
							onClick={() => changeValue("coin", -1, 16)}
						/>
						<IconButton
							color="highlight"
							icon="plus"
							onClick={() => changeValue("coin", 1, 16)}
						/>
					</Flex>
				</Flex>
			</Banner>
		</>
	);
}
