export async function PUT(req) {
  try {
    const auth = req.headers.get('authorization');
    const body = await req.json();
    
    const backendRes = await fetch('http://localhost:3001/users/profileUpdate', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth
      },
      body: JSON.stringify(body)
    });
    
    const data = await backendRes.json();
    
    return new Response(JSON.stringify(data), {
      status: backendRes.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.toString() }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}