import React, { useEffect, useState } from "react";
import { Flex, SubNav } from "../components";
import HeatPage from "./HeatPage";
import AbilitiesPage from "./AbilitiesPage";
import ContactsPage from "./ContactsPage";

export default function CrewManagement({ profile, onContactsChange }) {
	const storageKey = `gm-crew-subpage-${profile?.id}`;
	const [activeSubPage, setActiveSubPage] = useState(() => {
		try {
			return localStorage.getItem(storageKey) || "heat";
		} catch (e) {
			return "heat";
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(storageKey, activeSubPage);
		} catch (e) {
			// ignore storage failures
		}
	}, [activeSubPage, storageKey]);

	return (
		<Flex direction="column" paddingBottom="xxl">
			<SubNav
				items={[
					{ id: "abilities", icon: "users-gear" },
					{ id: "contacts", icon: "address-book" },
					{ id: "heat", icon: "fire" },
				]}
				activeId={activeSubPage}
				onChange={setActiveSubPage}
				fullWidth
			/>

			{activeSubPage === "heat" && <HeatPage profile={profile} />}
			{activeSubPage === "abilities" && <AbilitiesPage profile={profile} />}
			{activeSubPage === "contacts" && (
				<ContactsPage profile={profile} onContactsChange={onContactsChange} />
			)}
		</Flex>
	);
}
