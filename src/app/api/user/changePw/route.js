export async function PATCH(req) {
  const auth = req.headers.get('authorization');   // Bearer token
  const body = await req.json();
  const API_URL = process.env.DATABASE_URL || '';

  const res = await fetch(`/users/changePassword`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();         // gestiamo sia JSON sia plain-text
  const isJson = res.headers
    .get('content-type')
    ?.includes('application/json');

  return new Response(isJson ? text : JSON.stringify({ error: text }), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}