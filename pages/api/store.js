import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "store.json");

async function readStore() {
	try {
		const raw = await readFile(STORE_FILE, "utf8");
		const parsed = JSON.parse(raw);
		return parsed && typeof parsed === "object" && !Array.isArray(parsed)
			? parsed
			: {};
	} catch (error) {
		return {};
	}
}

async function writeStore(nextStore) {
	await mkdir(DATA_DIR, { recursive: true });
	await writeFile(STORE_FILE, JSON.stringify(nextStore, null, 2), "utf8");
}

export default async function handler(req, res) {
	if (req.method === "GET") {
		const key = req.query.key;
		if (!key || typeof key !== "string") {
			res.status(400).json({ error: "Query parameter 'key' is required." });
			return;
		}

		const store = await readStore();
		res.status(200).json({ value: store[key] ?? null });
		return;
	}

	if (req.method === "PUT") {
		const { key, value } = req.body || {};
		if (!key || typeof key !== "string") {
			res.status(400).json({ error: "Body field 'key' is required." });
			return;
		}

		const store = await readStore();
		store[key] = value;
		await writeStore(store);
		res.status(200).json({ ok: true });
		return;
	}

	res.setHeader("Allow", ["GET", "PUT"]);
	res.status(405).json({ error: "Method not allowed" });
}
