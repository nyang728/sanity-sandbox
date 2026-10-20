'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ state: 'sending', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      form.reset();
      setStatus({ state: 'ok', message: data.message });
    } catch (err) {
      setStatus({ state: 'err', message: err.message });
    }
  }

  return (
    <form className="contact" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" required maxLength={100} />
      </label>
      <label>
        Email
        <input name="email" type="email" required maxLength={200} />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} required maxLength={2000} />
      </label>
      <div>
        <button className="btn btn-primary" type="submit" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
      {status.message && <div className={`notice ${status.state}`}>{status.message}</div>}
    </form>
  );
}
