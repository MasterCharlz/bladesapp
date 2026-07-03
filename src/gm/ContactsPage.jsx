import React from "react";
import {
	Flex,
	Heading,
	Card,
	Body,
	Caption,
	Banner,
	Button,
	IconButton,
	Stepper,
	Icon,
} from "../components";

export default function ContactsPage({ profile }) {
	return (
		<>
			{/* --- COHORTS --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="person-rifle" /> Cohorts
					</Body>
					<Card backgroundColor="darker" noBorder></Card>
				</Flex>
			</Banner>

			{/* --- CONTACTS --- */}
			<Banner>
				<Flex direction="column" gap="md">
					<Body color="highlight">
						<Icon icon="phone" /> Contacts
					</Body>
					<Card backgroundColor="darker" noBorder></Card>
				</Flex>
			</Banner>
		</>
	);
}
