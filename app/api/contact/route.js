import { NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const name = String(body.name || '').trim().slice(0, 100);
  const email = String(body.email || '').trim().slice(0, 200);
  const message = String(body.message || '').trim().slice(0, 2000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  if (!writeClient) {
    console.log('[contact] Sanity write token not set; submission:', { name, email, message });
    return NextResponse.json({
      message: 'Thanks! (Demo mode: no SANITY_API_WRITE_TOKEN set, so this was only logged on the server.)',
    });
  }

  try {
    const doc = await writeClient.create({
      _type: 'contactSubmission',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ message: `Thanks, ${name}! Your message was saved to Sanity (${doc._id}).` });
  } catch (err) {
    console.error('[contact] Sanity create failed:', err.message);
    return NextResponse.json({ error: 'Could not save your message to Sanity.' }, { status: 502 });
  }
}
