import React, { useState } from "react";
import {
	Flex,
	Card,
	Banner,
	Icon,
	Heading,
	Body,
	Caption,
	TextInput,
	Select,
	Button,
	IconButton,
	Stepper,
} from "../components";

export default function Clocks() {
	return (
		<>
			<Flex direction="column" alignItems="center">
				{/* --- Build this with a repeater? */}
				{/* --- FORM --- */}
				<Banner>
					<Flex direction="column" gap="md">
						<Flex direction="column" gap="sm">
							<Flex alignItems="center" gap="sm">
								<Icon icon="stopwatch" color="highlight" />
								<Caption color="highlight">New Clock</Caption>
							</Flex>
							<TextInput placeholder="Enter Clock Name" />
						</Flex>
						<Flex direction="column" gap="sm">
							<Caption>Type</Caption>
							<Flex gap="sm">
								<Button icon="flag-checkered" variant="active" fullWidth />
								<Button icon="scale-unbalanced" variant="secondary" fullWidth />
								<Button icon="skull-crossbones" variant="secondary" fullWidth />
							</Flex>
						</Flex>
						<Flex direction="column" gap="sm">
							<Caption>Slices</Caption>
							<Flex gap="sm">
								<Button variant="active" fullWidth>
									3
								</Button>
								<Button variant="secondary" fullWidth>
									4
								</Button>
								<Button variant="secondary" fullWidth>
									6
								</Button>
								<Button variant="secondary" fullWidth>
									12
								</Button>
							</Flex>
						</Flex>
						<Flex direction="column" gap="sm">
							<Caption>Player</Caption>
							<Select options={["All", "Placeholder here"]} />
						</Flex>
						<Flex gap="md" justifyContent="space-between" marginTop="sm">
							<Button icon="check">Start Clock</Button>
							<Button variant="tertiary">Cancel</Button>
						</Flex>
					</Flex>
				</Banner>
				{/* --- OUTPUT --- */}
				<Banner>
					<Flex gap="md" alignItems="center">
						<IconButton icon="trash-alt" color="highlight" />
						<Flex direction="column" fullWidth>
							<Flex
								alignItems="baseline"
								gap="sm"
								justifyContent="space-between"
							>
								<Body color="highlight">
									<Icon icon="flag-checkered" /> Clock Name Here
								</Body>
								<Caption color="highlight">Player</Caption>
							</Flex>
							<Stepper amount="4" activeCount="2" />
						</Flex>
						<Flex gap="sm">
							<IconButton icon="minus" color="highlight" />
							<IconButton icon="plus" color="highlight" />
						</Flex>
					</Flex>
				</Banner>

				<Button icon="plus" variant="secondary" margin="lg">
					Clock
				</Button>
			</Flex>
		</>
	);
}
