import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setResult(null)
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, sentAt: new Date().toISOString() }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setResult(data)
      setName(''); setEmail(''); setMessage('')
    } catch (err) {
      setError('送信に失敗しました。後でもう一度お試しください。')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <header className="header">
       <h1>Level 2: React 一枚ページ（更新テスト）</h1>
        <p>ヘッダー／カード／フォーム、ダミーAPIにPOSTする練習</p>
      </header>

      <section className="card">
        <h2>カード</h2>
        <p>このサンプルは、<code>.env</code>で設定した <code>VITE_API_BASE_URL</code> に POST します。</p>
        <p>現在の送信先: <code>{API_BASE}/posts</code></p>
      </section>

      <section className="card">
        <h2>問い合わせフォーム</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            名前
            <input required value={name} onChange={e => setName(e.target.value)} placeholder="山田 太郎" />
          </label>
          <label>
            メール
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="taro@example.com" />
          </label>
          <label>
            メッセージ
            <textarea required value={message} onChange={e => setMessage(e.target.value)} placeholder="お問い合わせ内容" rows={4} />
          </label>
          <button type="submit" disabled={loading}>{loading ? '送信中…' : '送信'}</button>
        </form>
        {error && <p className="error">{error}</p>}
        {result && (
          <div className="result">
            <h3>送信結果</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </section>

      <footer className="footer">
        <p>© 2025 Level2 Sample</p>
      </footer>
    </div>
  )
}
