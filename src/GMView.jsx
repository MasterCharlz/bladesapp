import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Flex, Heading, Card, Button, Body, Caption, Nav } from "./components";
import Clocks from "./gm/Clocks";
import CrewManagement from "./gm/CrewManagement";

export default function GMView() {
	const { id } = useParams();
	const navigate = useNavigate();
	const storageKey = `gm-view-page-${id}`;
	const [activePage, setActivePage] = useState(() => {
		try {
			return localStorage.getItem(storageKey) || "clock-management";
		} catch (e) {
			return "clock-management";
		}
	});

	const profilesRaw = (() => {
		try {
			return JSON.parse(localStorage.getItem("profiles") || "[]");
		} catch (e) {
			return [];
		}
	})();

	const storedProfile = profilesRaw.find((p) => String(p.id) === String(id));
	const [profile, setProfile] = useState(storedProfile);

	useEffect(() => {
		try {
			localStorage.setItem(storageKey, activePage);
		} catch (e) {
			// ignore storage failures
		}
	}, [activePage, storageKey]);

	const handleContactsChange = (contacts) => {
		setProfile((currentProfile) =>
			currentProfile ? { ...currentProfile, contacts } : currentProfile,
		);
	};

	if (!profile) {
		return (
			<Flex direction="column" gap="md" fullWidth alignItems="center">
				<Heading size={2} color="highlight" className="display-title">
					404
				</Heading>
				<Body>No crew found for this GM view.</Body>
				<Button onClick={() => navigate("/")}>Back</Button>
			</Flex>
		);
	}

	return (
		<>
			<Flex
				alignItems="center"
				padding="lg"
				gap="md"
				justifyContent="space-between"
			>
				<Button
					variant="tertiary"
					icon="arrow-left"
					onClick={() => navigate("/")}
				>
					Back
				</Button>
				<Heading color="highlight" className={"align-right"}>
					{profile.crew_name}
				</Heading>
			</Flex>
			<Nav
				marginTop="sm"
				activeId={activePage}
				onChange={setActivePage}
				items={[
					{ id: "crew-management", icon: "people-group" },
					{ id: "clock-management", icon: "stopwatch" },
				]}
			/>
			{activePage === "clock-management" ? (
				<Clocks
					profileId={profile.id}
					playerCharacters={profile.characters || []}
				/>
			) : (
				<CrewManagement
					profile={profile}
					onContactsChange={handleContactsChange}
				/>
			)}
		</>
	);
}
