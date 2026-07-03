import React from "react";
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
	return (
		<>
			{/* --- CREW XP --- */}
			<Banner>
				<Flex direction="column" gap="lg">
					<Flex direction="column" gap="sm">
						<Body color="highlight">
							<Icon icon="angles-up" /> Crew XP
						</Body>
						<Stepper amount="10" />
						<Flex gap="sm">
							<IconButton color="highlight" icon="minus" />
							<IconButton color="highlight" icon="plus" />
						</Flex>
					</Flex>
					<div>
						<Caption>Advancement</Caption>
						<Body>Insert Advancement Here</Body>
					</div>
				</Flex>
			</Banner>

			{/* --- TIER --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex gap="md" justifyContent="space-between">
						<Body color="highlight">
							<Icon icon="crown" /> Tier
						</Body>
						<Body>Weak</Body>
					</Flex>
					<Stepper amount="4" />
					<Flex gap="md" justifyContent="space-between" alignItems="center">
						<Flex gap="sm">
							<IconButton color="highlight" icon="minus" />
							<IconButton color="highlight" icon="plus" />
						</Flex>
						<Button icon="refresh" variant="secondary">
							Weak
						</Button>
					</Flex>
				</Flex>
			</Banner>

			{/* --- REP --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex gap="md" justifyContent="space-between">
						<Body color="highlight">
							<Icon icon="hand-fist" /> Rep
						</Body>
						<Body color="hero">Turf</Body>
					</Flex>
					<Stepper amount="12" />
					<Flex gap="md" justifyContent="space-between" alignItems="center">
						<Flex gap="sm">
							<IconButton color="highlight" icon="minus" />
							<IconButton color="highlight" icon="plus" />
						</Flex>
						<Flex gap="sm">
							<IconButton color="hero" icon="minus" />
							<IconButton color="hero" icon="plus" />
						</Flex>
					</Flex>
				</Flex>
			</Banner>

			{/* --- HEAT --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex gap="md" justifyContent="space-between">
						<Body color="highlight">
							<Icon icon="fire" /> Heat
						</Body>
						<Body color="heat">Wanted</Body>
					</Flex>
					<Stepper amount="12" />
					<Flex gap="md" justifyContent="space-between" alignItems="center">
						<Flex gap="sm">
							<IconButton color="highlight" icon="minus" />
							<IconButton color="highlight" icon="plus" />
						</Flex>
						<Flex gap="sm">
							<IconButton color="heat" icon="minus" />
							<IconButton color="heat" icon="plus" />
						</Flex>
					</Flex>
				</Flex>
			</Banner>

			{/* --- COIN --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Body color="highlight">
						<Icon icon="ring" /> Coin
					</Body>
					<Stepper amount="16" />
					<Flex gap="sm">
						<IconButton color="highlight" icon="minus" />
						<IconButton color="highlight" icon="plus" />
					</Flex>
				</Flex>
			</Banner>
		</>
	);
}
