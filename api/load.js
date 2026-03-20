export default async function handler(req, res) {
if (req.method !== ‘GET’) return res.status(405).end();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const { table } = req.query;

if (![‘students’,‘seniors’].includes(table)) return res.status(400).json({ error: ‘Invalid table’ });

try {
const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?order=created_at.desc`, {
headers: {
‘apikey’: SUPABASE_KEY,
‘Authorization’: `Bearer ${SUPABASE_KEY}`
}
});

```
const data = await response.json();
res.status(200).json({ data });
```

} catch(e) {
res.status(500).json({ error: e.message });
}
}