import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Card, Button, Body, Caption, Nav } from "./components";
import Clocks from "./gm/Clocks";
import CrewManagement from "./gm/CrewManagement";
import { getProfiles, getStoreValue, setStoreValue } from "./apiStore";

export default function GMView() {
	const router = useRouter();
	const routeId = router.query.id;
	const id = Array.isArray(routeId) ? routeId[0] : routeId;
	const storageKey = `gm-view-page-${id ?? ""}`;
	const [activePage, setActivePage] = useState("clock-management");
	const [activePageLoaded, setActivePageLoaded] = useState(false);
	const [profile, setProfile] = useState(null);
	const [profileLoaded, setProfileLoaded] = useState(false);

	useEffect(() => {
		if (!id) return;
		let mounted = true;
		getProfiles([]).then((items) => {
			if (!mounted) return;
			setProfile(items.find((p) => String(p.id) === String(id)) || null);
			setProfileLoaded(true);
		});
		return () => {
			mounted = false;
		};
	}, [id]);

	useEffect(() => {
		if (!id) return;
		let mounted = true;
		getStoreValue(storageKey, "clock-management").then((value) => {
			if (!mounted) return;
			setActivePage(value || "clock-management");
			setActivePageLoaded(true);
		});
		return () => {
			mounted = false;
		};
	}, [storageKey, id]);

	useEffect(() => {
		if (!id || !activePageLoaded) return;
		setStoreValue(storageKey, activePage);
	}, [activePage, storageKey, id, activePageLoaded]);

	const handleContactsChange = (contacts) => {
		setProfile((currentProfile) =>
			currentProfile ? { ...currentProfile, contacts } : currentProfile,
		);
	};

	if (!id || !profileLoaded) {
		return null;
	}

	if (!profile) {
		return (
			<Flex direction="column" gap="md" fullWidth alignItems="center">
				<Heading size={2} color="highlight" className="display-title">
					404
				</Heading>
				<Body>No crew found for this GM view.</Body>
				<Button onClick={() => router.push("/")}>Back</Button>
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
					onClick={() => router.push("/")}
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
					{ id: "clock-management", icon: "stopwatch" },
					{ id: "crew-management", icon: "people-group" },
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
