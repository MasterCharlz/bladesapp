import React, { useEffect, useState } from "react";
import { Flex, SubNav } from "../components";
import HeatPage from "./HeatPage";
import AbilitiesPage from "./AbilitiesPage";
import ContactsPage from "./ContactsPage";
import { getStoreValue, setStoreValue } from "../apiStore";

export default function CrewManagement({ profile, onContactsChange }) {
	const storageKey = `gm-crew-subpage-${profile?.id}`;
	const [activeSubPage, setActiveSubPage] = useState("heat");
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!profile?.id) return;
		let mounted = true;
		getStoreValue(storageKey, "heat").then((value) => {
			if (!mounted) return;
			setActiveSubPage(value || "heat");
			setLoaded(true);
		});
		return () => {
			mounted = false;
		};
	}, [storageKey, profile?.id]);

	useEffect(() => {
		if (!profile?.id || !loaded) return;
		setStoreValue(storageKey, activeSubPage);
	}, [activeSubPage, storageKey, profile?.id, loaded]);

	return (
		<Flex direction="column" paddingBottom="xxl">
			<SubNav
				items={[
					{ id: "heat", icon: "fire" },
					{ id: "abilities", icon: "users-gear" },
					{ id: "contacts", icon: "address-book" },
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
