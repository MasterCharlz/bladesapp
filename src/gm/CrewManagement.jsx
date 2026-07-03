import React, { useState } from "react";
import { Flex, SubNav } from "../components";
import HeatPage from "./HeatPage";
import AbilitiesPage from "./AbilitiesPage";
import ContactsPage from "./ContactsPage";

export default function CrewManagement({ profile }) {
	const [activeSubPage, setActiveSubPage] = useState("heat");

	return (
		<>
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

			{activeSubPage === "heat" && <HeatPage />}
			{activeSubPage === "abilities" && <AbilitiesPage />}
			{activeSubPage === "contacts" && <ContactsPage profile={profile} />}
		</>
	);
}
