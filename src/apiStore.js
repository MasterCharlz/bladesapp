export async function getStoreValue(key, fallbackValue) {
	try {
		const response = await fetch(`/api/store?key=${encodeURIComponent(key)}`);
		if (!response.ok) return fallbackValue;
		const payload = await response.json();
		return payload.value === null || payload.value === undefined
			? fallbackValue
			: payload.value;
	} catch (error) {
		return fallbackValue;
	}
}

export async function setStoreValue(key, value) {
	try {
		await fetch("/api/store", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ key, value }),
		});
	} catch (error) {
		// ignore request failures
	}
}

export async function getProfiles(fallbackProfiles = []) {
	const nextProfiles = await getStoreValue("profiles", fallbackProfiles);
	return Array.isArray(nextProfiles) ? nextProfiles : fallbackProfiles;
}

export async function saveProfiles(profiles) {
	await setStoreValue("profiles", profiles);
}

export async function patchProfile(profileId, dataKey, data) {
	if (!profileId || !dataKey) return;
	const profiles = await getProfiles([]);
	const index = profiles.findIndex((p) => String(p.id) === String(profileId));
	if (index < 0) return;
	profiles[index] = { ...profiles[index], [dataKey]: data };
	await saveProfiles(profiles);
}
