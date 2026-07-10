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
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="person-rifle" color="highlight" />
						<Body color="highlight" bold>
							Cohorts
						</Body>
					</Flex>
					<Card backgroundColor="darker" noBorder></Card>
				</Flex>
			</Banner>

			{/* --- CONTACTS --- */}
			<Banner>
				<Flex direction="column" gap="sm">
					<Flex alignItems="baseline" gap="sm">
						<Icon icon="phone" color="highlight" />
						<Body color="highlight" bold>
							Contacts
						</Body>
					</Flex>
					<Card backgroundColor="darker" noBorder></Card>
				</Flex>
			</Banner>
		</>
	);
}
