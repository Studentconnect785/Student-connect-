export default async function handler(req, res) {
if (req.method !== ‘POST’) return res.status(405).end();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const { table, data } = req.body;

if (!table || !data) return res.status(400).json({ error: ‘Missing table or data’ });
if (![‘students’,‘seniors’].includes(table)) return res.status(400).json({ error: ‘Invalid table’ });

try {
const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
method: ‘POST’,
headers: {
‘Content-Type’: ‘application/json’,
‘apikey’: SUPABASE_KEY,
‘Authorization’: `Bearer ${SUPABASE_KEY}`,
‘Prefer’: ‘return=minimal’
},
body: JSON.stringify(data)
});

```
if (!response.ok) {
  const err = await response.text();
  return res.status(500).json({ error: err });
}

res.status(200).json({ success: true });
```

} catch(e) {
res.status(500).json({ error: e.message });
}
}