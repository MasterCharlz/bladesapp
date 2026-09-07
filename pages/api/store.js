import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
	try {
		if (req.method === "GET") {
			const key = req.query.key;
			if (!key || typeof key !== "string") {
				res.status(400).json({ error: "Query parameter 'key' is required." });
				return;
			}

			const rows = await sql`
				select value
				from app_store
				where key = ${key}
			`;
			res.status(200).json({ value: rows[0]?.value ?? null });
			return;
		}

		if (req.method === "PUT") {
			const { key, value } = req.body || {};
			if (!key || typeof key !== "string") {
				res.status(400).json({ error: "Body field 'key' is required." });
				return;
			}

			await sql`
				insert into app_store (key, value, updated_at)
				values (${key}, ${JSON.stringify(value)}::jsonb, now())
				on conflict (key)
				do update set
					value = excluded.value,
					updated_at = now()
			`;
			res.status(200).json({ ok: true });
			return;
		}

		res.setHeader("Allow", ["GET", "PUT"]);
		res.status(405).json({ error: "Method not allowed" });
	} catch (error) {
		console.error("Store API error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}
