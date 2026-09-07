import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import {
	Card,
	Button,
	Flex,
	TextInput,
	Select,
	Collapsible,
	Heading,
	Caption,
} from "../src/components";
import profilesData from "../src/profiles.json";
import { getProfiles, saveProfiles } from "../src/apiStore";

function normalizeProfiles(items) {
	return (items || []).map((p) => ({
		...p,
		id: p.id ?? crypto.randomUUID(),
		characters: p.characters ?? [],
	}));
}

function HomePage() {
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [profiles, setProfiles] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [newProfile, setNewProfile] = useState({
		crew_name: "",
		crew_type: "",
	});

	const handleCancelCreate = () => {
		setNewProfile({ crew_name: "", crew_type: "" });
		setShowCreateForm(false);
	};

	const router = useRouter();

	useEffect(() => {
		let mounted = true;
		getProfiles(profilesData.profiles || []).then((items) => {
			if (!mounted) return;
			setProfiles(normalizeProfiles(items));
			setLoaded(true);
		});
		return () => {
			mounted = false;
		};
	}, []);

	const handleCreateCrew = () => {
		if (!newProfile.crew_name.trim()) return;

		const createdProfile = {
			crew_name: newProfile.crew_name.trim(),
			crew_type: newProfile.crew_type,
			subprofiles: [{ subprofile_type: "gm" }],
			characters: [],
			id: crypto.randomUUID(),
		};

		setProfiles((prev) => [...prev, createdProfile]);
		setNewProfile({ crew_name: "", crew_type: "" });
		setShowCreateForm(false);
	};

	useEffect(() => {
		if (!loaded) return;
		saveProfiles(profiles);
	}, [profiles, loaded]);

	const handleDeleteProfile = (profileId) => {
		setProfiles((prev) => prev.filter((p) => p.id !== profileId));
	};

	return (
		<Flex
			direction="column"
			gap="lg"
			maxWidth="500px"
			margin="auto"
			fullHeight
			alignItems="center"
			justifyContent="center"
			paddingX="md"
			paddingY="xl"
		>
			<img src="/images/bitd-logo.svg" />
			<Flex direction="column" gap="sm" fullWidth>
				{profiles.map((profile) => (
					<Card key={profile.id} padding="none" fullWidth noBorder>
						<Collapsible>
							<Collapsible.Header>
								<Flex
									gap="md"
									justifyContent="space-between"
									alignItems="center"
								>
									<Heading color="highlight" size={3}>
										{profile.crew_name || "Untitled Crew"}
									</Heading>
									<Caption>{profile.crew_type || "No Type"}</Caption>
								</Flex>
							</Collapsible.Header>
							<Collapsible.Body>
								<Flex marginBottom="md">
									<Button
										icon="dice"
										onClick={() => router.push(`/gm/${profile.id}`)}
									>
										GM View
									</Button>
									<Button
										variant="tertiary"
										marginLeft="auto"
										onClick={() => handleDeleteProfile(profile.id)}
									>
										Delete Crew
									</Button>
								</Flex>
								<Card noBorder padding="none" backgroundColor="darker" />
							</Collapsible.Body>
						</Collapsible>
					</Card>
				))}

				{showCreateForm && (
					<Card borderColor="highlight" fullWidth>
						<TextInput
							placeholder="Crew Name"
							value={newProfile.crew_name}
							onChange={(value) =>
								setNewProfile((prev) => ({ ...prev, crew_name: value }))
							}
							marginBottom="md"
						/>
						<Select
							options={[
								"Assassins",
								"Bravos",
								"Cult",
								"Hawkers",
								"Smugglers",
								"Shadows",
							]}
							value={newProfile.crew_type}
							onChange={(value) =>
								setNewProfile((prev) => ({ ...prev, crew_type: value }))
							}
							placeholder="Select Type..."
							marginBottom="md"
						/>
						<Flex>
							<Button variant="primary" icon="check" onClick={handleCreateCrew}>
								Create Crew
							</Button>
							<Button
								variant="tertiary"
								marginLeft="auto"
								onClick={handleCancelCreate}
							>
								Cancel
							</Button>
						</Flex>
					</Card>
				)}
			</Flex>

			<Button
				icon="plus"
				variant="secondary"
				onClick={() => setShowCreateForm(true)}
			>
				Crew
			</Button>
		</Flex>
	);
}

// disable SSR: profile data depends on browser-only crypto.randomUUID and per-user state
export default dynamic(() => Promise.resolve(HomePage), { ssr: false });
