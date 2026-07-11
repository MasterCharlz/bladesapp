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
				<Flex direction="column" gap="md">
					<Flex direction="column" gap="sm">
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="angles-up" color="highlight" />
							<Body color="highlight" bold>
								Crew XP
							</Body>
						</Flex>
						<Stepper amount="10" />
						<Flex gap="sm">
							<IconButton color="highlight" icon="minus" />
							<IconButton color="highlight" icon="plus" />
						</Flex>
					</Flex>
					<div>
						<Caption color="highlight">Advancement</Caption>
						<Body>Insert Advancement Here</Body>
					</div>
				</Flex>
			</Banner>

			{/* --- TIER --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex gap="md" justifyContent="space-between">
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="crown" color="highlight" />
							<Body color="highlight" bold>
								Tier
							</Body>
						</Flex>
						<Body bold>Weak</Body>
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
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="hand-fist" color="highlight" />
							<Body color="highlight" bold>
								Rep
							</Body>
						</Flex>
						<Body color="hero" bold>
							Turf
						</Body>
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
						<Flex alignItems="baseline" gap="sm">
							<Icon icon="fire" color="highlight" />
							<Body color="highlight" bold>
								Heat
							</Body>
						</Flex>
						<Body color="heat" bold>
							Wanted
						</Body>
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
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="ring" color="highlight" />
						<Body color="highlight" bold>
							Coin
						</Body>
					</Flex>
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
