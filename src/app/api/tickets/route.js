export async function POST(req) {
    const body = await req.json();
  
    const res = await fetch('http://localhost:3001/orders/createOrders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });
  }