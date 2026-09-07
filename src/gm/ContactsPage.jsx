import React from "react";
import { Flex, Card, Body, Banner, Icon } from "../components";

export default function ContactsPage({ profile, onContactsChange }) {
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
					<Card backgroundColor="darker" noBorder padding="none" />
				</Flex>
			</Banner>
		</>
	);
}
