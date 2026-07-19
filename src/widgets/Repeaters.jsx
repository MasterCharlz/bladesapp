import React, { useState, useEffect, useCallback, useRef } from "react";
import {
	Flex,
	Body,
	Caption,
	TextInput,
	Select,
	Button,
	IconButton,
} from "../components";
import {
	getProfiles,
	getStoreValue,
	patchProfile,
	saveProfiles,
	setStoreValue,
} from "../apiStore";

// ============================================================================
// COMMON UTILITIES
// ============================================================================

export function useProfileDataPersist(profileId, dataKey) {
	return useCallback(
		(data) => {
			if (!profileId) return;
			patchProfile(profileId, dataKey, data);
		},
		[profileId, dataKey],
	);
}

// ============================================================================
// ABILITIES REPEATER UTILITIES
// ============================================================================

export function renderBoldText(text) {
	if (!text) return null;
	const parts = [];
	const segments = String(text).split(/(<\/b>|<b>)/g);
	let isBold = false;

	segments.forEach((segment, index) => {
		if (segment === "<b>") {
			isBold = true;
			return;
		}
		if (segment === "</b>") {
			isBold = false;
			return;
		}
		if (segment) {
			parts.push(
				isBold ? (
					<b key={`${segment}-${index}`}>{segment}</b>
				) : (
					<span key={`${segment}-${index}`}>{segment}</span>
				),
			);
		}
	});

	return <>{parts}</>;
}

export function useAbilitiesRepeater(profile, crewAbilitiesData) {
	const [items, setItems] = useState(profile?.abilities || []);
	const persist = useProfileDataPersist(profile?.id, "abilities");

	useEffect(() => {
		setItems(profile?.abilities || []);
	}, [profile?.id, profile?.abilities]);

	useEffect(() => {
		persist(items);
	}, [items, persist]);

	const activeCrewType = profile?.crew_type || "";
	const abilities = crewAbilitiesData.crew_type?.[activeCrewType] || [];

	const abilityOptions = abilities.map(({ value, title }) => ({
		value,
		label: title,
	}));
	const abilityLookup = abilities.reduce((acc, ability) => {
		acc[ability.value] = ability;
		return acc;
	}, {});

	const handleChange = useCallback((nextItems) => {
		setItems(nextItems);
	}, []);

	return {
		items,
		handleChange,
		abilityOptions,
		abilityLookup,
	};
}

export function useUpgradesRepeater(profile, crewUpgradesData) {
	const [items, setItems] = useState(profile?.upgrades || []);
	const persist = useProfileDataPersist(profile?.id, "upgrades");

	useEffect(() => {
		setItems(profile?.upgrades || []);
	}, [profile?.id, profile?.upgrades]);

	useEffect(() => {
		persist(items);
	}, [items, persist]);

	const activeCrewType = profile?.crew_type || "";
	const upgrades = crewUpgradesData.crew_type?.[activeCrewType] || [];

	const upgradeOptions = upgrades.map(({ value, description }) => ({
		value,
		label: description,
	}));
	const upgradeLookup = upgrades.reduce((acc, upgrade) => {
		acc[upgrade.value] = upgrade;
		return acc;
	}, {});

	const handleChange = useCallback((nextItems) => {
		setItems(nextItems);
	}, []);

	return {
		items,
		handleChange,
		upgradeOptions,
		upgradeLookup,
	};
}

export function useHuntingGroundsRepeater(profile, crewSpecialtiesData) {
	const [items, setItems] = useState(profile?.huntingGrounds || []);
	const persist = useProfileDataPersist(profile?.id, "huntingGrounds");

	useEffect(() => {
		setItems(profile?.huntingGrounds || []);
	}, [profile?.id, profile?.huntingGrounds]);

	useEffect(() => {
		persist(items);
	}, [items, persist]);

	const handleChange = useCallback((nextItems) => {
		setItems(nextItems);
	}, []);

	const activeCrewType = profile?.crew_type || "";
	const specialties = crewSpecialtiesData?.crew_type?.[activeCrewType] || [];
	const specialtyOptions = specialties.map((specialty) => ({
		value: specialty,
		label: specialty,
	}));

	return {
		items,
		handleChange,
		specialtyOptions,
	};
}

export function useContactsRepeater(profile) {
	const [items, setItems] = useState(profile?.contacts || []);
	const persist = useProfileDataPersist(profile?.id, "contacts");

	useEffect(() => {
		setItems(profile?.contacts || []);
	}, [profile?.id, profile?.contacts]);

	const handleChange = useCallback(
		(nextItems) => {
			setItems(nextItems);
			persist(nextItems);
		},
		[persist],
	);

	return {
		items,
		handleChange,
	};
}

// ============================================================================
// CLOCKS REPEATER UTILITIES
// ============================================================================

export const CLOCK_TYPES = [
	{ id: "race", icon: "hourglass-half" },
	{ id: "contested", icon: "scale-unbalanced" },
	{ id: "danger", icon: "skull-crossbones" },
];

export const CLOCK_SLICES = [3, 4, 6, 12];

export function getClockStorageKey(profileId) {
	return `gm-clocks-${profileId}`;
}

export function createClockRow() {
	return {
		id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
		name: "",
		type: "race",
		slices: 3,
		player: "All",
		progress: 0,
		editing: true,
	};
}

export function getClockIcon(type) {
	return (
		CLOCK_TYPES.find((option) => option.id === type)?.icon || "flag-checkered"
	);
}

export function useClocksRepeater(profileId, playerCharacters = []) {
	const storageKey = getClockStorageKey(profileId);
	const [rows, setRows] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!profileId) return;
		let mounted = true;
		getStoreValue(storageKey, []).then((storedRows) => {
			if (!mounted) return;
			setRows(Array.isArray(storedRows) ? storedRows : []);
			setLoaded(true);
		});
		return () => {
			mounted = false;
		};
	}, [profileId, storageKey]);

	useEffect(() => {
		if (!profileId || !loaded) return;
		setStoreValue(storageKey, rows);
	}, [profileId, rows, storageKey, loaded]);

	const playerOptions = [
		"All",
		...playerCharacters.map((char) => char?.value?.name).filter(Boolean),
	];

	const addRow = useCallback(() => {
		setRows((prev) => [...prev, createClockRow()]);
	}, []);

	const updateRow = useCallback((id, changes) => {
		setRows((prev) =>
			prev.map((row) => (row.id === id ? { ...row, ...changes } : row)),
		);
	}, []);

	const startClock = useCallback((id) => {
		setRows((prev) =>
			prev.map((row) =>
				row.id === id && row.name.trim() ? { ...row, editing: false } : row,
			),
		);
	}, []);

	const cancelRow = useCallback((id) => {
		setRows((prev) => prev.filter((row) => row.id !== id));
	}, []);

	const deleteRow = useCallback((id) => {
		setRows((prev) => prev.filter((row) => row.id !== id));
	}, []);

	const progressRow = useCallback((id, delta) => {
		setRows((prev) =>
			prev.map((row) => {
				if (row.id !== id) return row;
				const nextProgress = Math.max(
					0,
					Math.min(row.slices, row.progress + delta),
				);
				return { ...row, progress: nextProgress };
			}),
		);
	}, []);

	return {
		rows,
		playerOptions,
		addRow,
		updateRow,
		startClock,
		cancelRow,
		deleteRow,
		progressRow,
	};
}

// ============================================================================
// PLAYER CHARACTER REPEATER
// ============================================================================

export default function PlayerCharacterRepeater({
	initialItems = [],
	onPersist,
	profileId,
}) {
	const [items, setItems] = useState(initialItems || []);
	const [isCreating, setIsCreating] = useState(false);
	const [formValue, setFormValue] = useState({ name: "", playbook: "" });
	const onPersistRef = useRef(onPersist);

	useEffect(() => {
		onPersistRef.current = onPersist;
	}, [onPersist]);

	useEffect(() => {
		setItems(initialItems || []);
	}, [initialItems]);

	useEffect(() => {
		if (!profileId) {
			onPersistRef.current?.(items);
			return;
		}
		getProfiles([]).then((arr) => {
			if (!Array.isArray(arr)) return;
			const idx = arr.findIndex((p) => p.id === profileId);
			if (idx > -1) {
				arr[idx].characters = items;
				saveProfiles(arr);
			}
		});
		onPersistRef.current?.(items);
	}, [items, profileId]);

	function handleSave() {
		if (!formValue.name.trim()) return;
		const next = [
			...items,
			{
				id: crypto.randomUUID(),
				value: { name: formValue.name.trim(), playbook: formValue.playbook },
			},
		];
		setItems(next);
		setFormValue({ name: "", playbook: "" });
		setIsCreating(false);
	}

	function handleDelete(id) {
		setItems(items.filter((it) => it.id !== id));
	}

	return (
		<div>
			{items.map((item) => (
				<Flex
					key={item.id}
					gap="sm"
					alignItems="center"
					padding="md"
					className="repeater__row"
				>
					<Body color="highlight" bold>
						{item.value.name}
					</Body>
					<Caption color="light">{item.value.playbook}</Caption>
					<IconButton
						icon="trash-alt"
						variant="tertiary"
						onClick={() => handleDelete(item.id)}
						marginLeft="auto"
					/>
				</Flex>
			))}

			{isCreating && (
				<Flex
					direction="column"
					gap="sm"
					padding="md"
					className="repeater__row"
				>
					<Body color="highlight" bold>
						New Character
					</Body>
					<TextInput
						placeholder="Enter Name"
						value={formValue.name}
						onChange={(name) => setFormValue({ ...formValue, name })}
					/>
					<Select
						value={formValue.playbook}
						onChange={(playbook) => setFormValue({ ...formValue, playbook })}
						options={[
							"Cutter",
							"Hound",
							"Leech",
							"Lurk",
							"Slide",
							"Spider",
							"Whisper",
						]}
						placeholder="Select Scoundrel..."
					/>
					<Flex gap="sm" justifyContent="space-between" paddingTop="md">
						<Button icon="check" onClick={handleSave}>
							Create Character
						</Button>
						<Button
							variant="tertiary"
							onClick={() => {
								setIsCreating(false);
								setFormValue({ name: "", playbook: "" });
							}}
						>
							Cancel
						</Button>
					</Flex>
				</Flex>
			)}

			{!isCreating && (
				<Button
					variant="tertiary"
					icon="plus"
					onClick={() => setIsCreating(true)}
					fullWidth
					padding="md"
				>
					Character
				</Button>
			)}
		</div>
	);
}
