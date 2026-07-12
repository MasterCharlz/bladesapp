import React, { useState } from "react";
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

export default function HeatPage() {
	const [strongHold, setStrongHold] = useState(false);
	const toggleHold = () => {
		setStrongHold(!strongHold);
	};
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
					<Stepper amount={10} />
					<Flex gap="sm">
						<IconButton color="highlight" icon="minus" />
						<IconButton color="highlight" icon="plus" />
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
						<Caption>{strongHold ? "Strong Hold" : "Weak Hold"}</Caption>
					</Flex>
					<Stepper amount={4} />
					<Flex gap="md" justifyContent="space-between" alignItems="center">
						<Flex gap="sm">
							<IconButton color="highlight" icon="minus" />
							<IconButton color="highlight" icon="plus" />
						</Flex>
						<IconButton
							icon="refresh"
							variant="secondary"
							onClick={toggleHold}
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
					<Stepper amount={12} />
					<Flex gap="sm">
						<IconButton color="highlight" icon="minus" />
						<IconButton color="highlight" icon="plus" />
					</Flex>
				</Flex>
			</Banner>

			{/* --- HEAT --- */}
			<Banner>
				<Flex gap="md" alignItems="flex-end">
					<Flex direction="column" gap="sm" flexGrow={1}>
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="fire" color="highlight" />
							<Body color="highlight" bold>
								Heat
							</Body>
						</Flex>
						<Stepper amount={9} />
						<Flex gap="sm">
							<IconButton color="highlight" icon="minus" />
							<IconButton color="highlight" icon="plus" />
						</Flex>
					</Flex>
					<Flex direction="column" gap="sm" alignItems="flex-end">
						<Caption color="heat">Wanted</Caption>
						<Stepper amount={4} />
						<Flex gap="sm" alignItems="flex-end">
							<IconButton color="heat" icon="minus" />
							<IconButton color="heat" icon="plus" />
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
					<Stepper amount={16} />
					<Flex gap="sm">
						<IconButton color="highlight" icon="minus" />
						<IconButton color="highlight" icon="plus" />
					</Flex>
				</Flex>
			</Banner>
		</>
	);
}
