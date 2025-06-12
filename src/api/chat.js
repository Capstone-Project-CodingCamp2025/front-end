export async function sendChatMessage(question, history = []) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history })
  });

  if (!res.ok) {
    throw new Error('Gagal mengirim pesan');
  }

  const data = await res.json();
  return data.answer;
}
