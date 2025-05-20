export async function POST(req) {
  const token = req.headers.get('authorization');
  const body = await req.json();

  // body: { items: [...], customer: { name, surname, email } }

  const res = await fetch('http://localhost:3001/orders/createOrders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: token } : {}),
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();

  try {
    const json = JSON.parse(text);
    return new Response(JSON.stringify(json), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(text, { status: res.status });
  }
}
