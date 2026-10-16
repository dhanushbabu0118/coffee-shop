import { useState } from 'react'
import { categories, items, sizes } from './data.js'

const money = (n) => '$ ' + n.toFixed(2)

export default function App() {
  const [screen, setScreen] = useState('splash')
  const [cat, setCat] = useState(0)
  const [cur, setCur] = useState(0)
  const [size, setSize] = useState(1)
  const [qty, setQty] = useState(1)
  const [mode, setMode] = useState(0)
  const [favs, setFavs] = useState([])
  const [tab, setTab] = useState('home')
  const [query, setQuery] = useState('')

  const item = items[cur]
  const unit = item.price * sizes[size].m
  const subtotal = unit * qty
  const go = (s) => setScreen(s)
  const cls = (id) => 's' + (screen === id ? ' on' : '')

  const toggleFav = (i) => setFavs((f) => (f.includes(i) ? f.filter((v) => v !== i) : [...f, i]))
  const quickOrder = (i) => { setCur(i); setSize(1); setQty(1); go('order') }
  const visible = items
    .map((x, i) => ({ x, i }))
    .filter(({ x, i }) =>
      (tab !== 'fav' || favs.includes(i)) &&
      (cat === 0 || x.tags.includes(categories[cat])) &&
      x.name.toLowerCase().includes(query.trim().toLowerCase()))

  const pick = (i) => { setCur(i); setSize(1); setQty(1); go('detail') }

  return (
    <div id="app">
      <section className={cls('splash')} id="splash">
        <div className="hero">☕</div>
        <h1>Fall in Love with Coffee in Blissful Delight!</h1>
        <p>Welcome to our cozy coffee corner, where every cup is a delightful for you.</p>
        <button className="cta" onClick={() => go('home')}>Get Started</button>
      </section>

      <section className={cls('home')}>
        <div className="top"><small>Location</small><b>Bilzen, Tanjungbalai ⌄</b>
          <div className="search">
            <label className="sbox">🔍<input value={query} onChange={(e) => { setQuery(e.target.value); setTab('home') }} placeholder="Search coffee" /></label>
            <button onClick={() => { setQuery(''); setCat(0); setTab('home') }} title="Reset filters">⚙</button></div></div>
        <div className="promo"><i>Promo</i><h2>Buy one get one FREE</h2><span>☕</span></div>
        {tab === 'bell' ? (
          <div className="notes">
            <h3>Notifications</h3>
            <div className="note">🎉 <div><b>Buy one get one FREE</b><small>Valid on all coffee today.</small></div></div>
            <div className="note">🛵 <div><b>Your last order was delivered</b><small>Rate your courier.</small></div></div>
            <div className="note">☕ <div><b>New: Cappuccino Dry Foam</b><small>Try it today.</small></div></div>
          </div>
        ) : (
          <>
            {tab === 'home' && (
              <div className="chips">
                {categories.map((c, i) => (
                  <button key={c} className={'chip' + (i === cat ? ' on' : '')} onClick={() => setCat(i)}>{c}</button>
                ))}
              </div>
            )}
            {tab === 'fav' && <h3 className="ttl">Favorites ({favs.length})</h3>}
            <div className="grid">
              {visible.map(({ x, i }) => (
                <div key={x.name} className="item" role="button" tabIndex={0} onClick={() => pick(i)}>
                  <div className="pic">☕<em>⭐ {x.rating}</em>
                    <span className={'heart' + (favs.includes(i) ? ' on' : '')}
                      onClick={(e) => { e.stopPropagation(); toggleFav(i) }}>{favs.includes(i) ? '♥' : '♡'}</span></div>
                  <h4>{x.name}</h4><p>{x.sub}</p>
                  <div className="row"><b>{money(x.price)}</b>
                    <button className="plus" onClick={(e) => { e.stopPropagation(); quickOrder(i) }}>+</button></div>
                </div>
              ))}
              {visible.length === 0 && <p className="empty">{tab === 'fav' ? 'No favorites yet. Tap the heart on a coffee.' : 'No coffee found.'}</p>}
            </div>
          </>
        )}
        <nav className="nav">
          <button className={tab === 'home' ? 'on' : ''} onClick={() => setTab('home')}>🏠</button>
          <button className={tab === 'fav' ? 'on' : ''} onClick={() => setTab('fav')}>♡</button>
          <button onClick={() => go('order')}>🛍</button>
          <button className={tab === 'bell' ? 'on' : ''} onClick={() => setTab('bell')}>🔔</button>
        </nav>
      </section>

      <section className={cls('detail')}>
        <div className="hd"><button onClick={() => go('home')}>‹</button>Detail
          <button onClick={() => toggleFav(cur)}>{favs.includes(cur) ? '♥' : '♡'}</button></div>
        <div className="pad">
          <div className="big">☕</div>
          <div className="dt">
            <div><h2>{item.name}</h2><small>Ice/Hot</small></div>
            <div className="ic"><span>🚲</span><span>🫘</span><span>🥛</span></div>
          </div>
          <div className="rate">⭐ {item.rating} <small>(230)</small></div><hr />
          <h3>Description</h3>
          <p className="desc">A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo.. <b>Read More</b></p>
          <h3 style={{ marginTop: 18 }}>Size</h3>
          <div className="sizes">
            {sizes.map((s, i) => (
              <button key={s.l} className={i === size ? 'on' : ''} onClick={() => setSize(i)}>{s.l}</button>
            ))}
          </div>
        </div>
        <div className="buy">
          <div><small>Price</small><b>{money(unit)}</b></div>
          <button className="cta" onClick={() => go('order')}>Buy Now</button>
        </div>
      </section>

      <section className={cls('order')}>
        <div className="hd"><button onClick={() => go('detail')}>‹</button>Order<span style={{ width: 32 }} /></div>
        <div className="pad">
          <div className="seg">
            {['Deliver', 'Pick Up'].map((m, i) => (
              <button key={m} className={i === mode ? 'on' : ''} onClick={() => setMode(i)}>{m}</button>
            ))}
          </div>
          <div className="addr"><h3>Delivery Address</h3><b>Jl. Kpg Sutoyo</b>
            <p>Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.</p>
            <div className="pills"><span>✎ Edit Address</span><span>＋ Add Note</span></div></div><hr />
          <div className="line"><div className="th">☕</div>
            <div className="t"><b>{item.name}</b><small>{item.sub}</small></div>
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><b>{qty}</b>
              <button onClick={() => setQty(qty + 1)}>+</button></div></div><hr />
          <div className="disc">🏷 <span style={{ flex: 1 }}>1 Discount Is Applies</span>›</div>
          <h3 style={{ marginTop: 20 }}>Payment Summary</h3>
          <div className="pay"><span>Price</span><b>{money(subtotal)}</b></div>
          <div className="pay"><span>Delivery Fee</span><span><s>$ 2.0</s><b>$ 1.0</b></span></div><hr />
          <div className="wallet">💳
            <div style={{ flex: 1 }}><b style={{ fontSize: 14 }}>Cash/Wallet</b>
              <small style={{ display: 'block', color: 'var(--brand)', fontSize: 12 }}>{money(subtotal + 1)}</small></div>⌄</div>
          <button className="cta" onClick={() => go('track')}>Order</button>
        </div>
      </section>

      <section className={cls('track')}>
        <div className="map">
          <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
            <g stroke="#fff" strokeWidth="10" fill="none"><path d="M0 80H400M0 200H400M0 320H400M70 0V400M200 0V400M330 0V400" /></g>
            <path d="M70 320V250H200V110H330V60" stroke="#C67C4E" strokeWidth="4" fill="none" />
            <circle cx="70" cy="320" r="9" fill="#C67C4E" /><circle cx="330" cy="60" r="9" fill="#ED5151" />
          </svg>
          <button className="bk" onClick={() => go('order')}>‹</button>
        </div>
        <div className="sheet"><h3>10 minutes left</h3><small>Delivery to <b>Jl. Kpg Sutoyo</b></small>
          <div className="bars"><i /><i /><i /><i /></div>
          <div className="box">🛵<div><b>Delivered your order</b>
            <small style={{ display: 'block', color: 'var(--mute)', fontSize: 11, marginTop: 3 }}>We will deliver your goods to you in the shortest possible time.</small></div></div>
          <div className="box" style={{ border: 0, padding: 0 }}><div className="av">🧑</div>
            <div><b>Brooklyn Simmons</b><small style={{ display: 'block', color: 'var(--mute)', fontSize: 12 }}>Personal Courier</small></div>
            <button className="call">📞</button></div>
          <button className="cta" style={{ marginTop: 14 }} onClick={() => go('home')}>Back to Home</button>
        </div>
      </section>
    </div>
  )
}