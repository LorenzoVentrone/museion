export async function GET(req) {
  const auth = req.headers.get('authorization');
  const res = await fetch('http://localhost:3001/users/validate', {
    headers: { Authorization: auth }
  });
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('Content-Type') }
  });
}
