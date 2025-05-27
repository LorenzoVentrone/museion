/* -------------------------------------------- */
/* see backend */

export async function GET() {
  const res = await fetch('http://localhost:3001/items/merch');
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}