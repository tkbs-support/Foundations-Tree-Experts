import { useState } from 'react';
import COVERAGE from '../../data/coverage.json';

const Svg = ({ children, size = 24, strokeWidth = 1.6, fill, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
);

const ZipIcons = {
  pin: p => <Svg {...p}><path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></Svg>,
  compass: p => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></Svg>,
  sparkle: p => <Svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></Svg>,
  check: p => <Svg {...p}><path d="M5 13l4 4 10-10"/></Svg>,
  phone: p => <Svg {...p}><path d="M4 4h4l2 5-2.5 1.5a11 11 0 006 6L15 14l5 2v4a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1z"/></Svg>,
  arrow: p => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Svg>,
};

export default function ZipChecker({ onQuote: onQuoteProp }) {
  const onQuote = onQuoteProp || (() => {
    window.dispatchEvent(new CustomEvent('open-quote-wizard'));
    if (typeof fbq === 'function') fbq('track', 'Schedule', { content_name: 'Quote Wizard Opened' });
  });
  const [zip, setZip] = useState('');
  const [result, setResult] = useState(null);

  const check = (value) => {
    const v = (value ?? zip).replace(/\D/g, '').slice(0, 5);
    if (v.length !== 5) { setResult({ status: 'invalid' }); return; }
    const hit = COVERAGE[v];
    if (hit) {
      setResult({ status: 'covered', zip: v, ...hit });
      if (typeof gtag === 'function') gtag('event', 'zip_check', { event_category: 'engagement', zip_code: v, result: 'covered', city: hit.city });
      if (typeof fbq === 'function') fbq('track', 'FindLocation', { city: hit.city, zip: v });
    } else {
      setResult({ status: 'uncovered', zip: v });
      if (typeof gtag === 'function') gtag('event', 'zip_check', { event_category: 'engagement', zip_code: v, result: 'uncovered' });
      if (typeof fbq === 'function') fbq('track', 'FindLocation', { zip: v });
    }
  };

  const onChange = e => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZip(v);
    if (result) setResult(null);
    if (v.length === 5) check(v);
  };

  return (
    <div className="zip-check">
      <div className="zip-form">
        <label htmlFor="zip-input" className="zip-label">Your zip code</label>
        <div className="zip-input-wrap">
          <ZipIcons.pin size={18} />
          <input
            id="zip-input"
            inputMode="numeric"
            pattern="\d{5}"
            placeholder="e.g. 48103"
            value={zip}
            onChange={onChange}
            onKeyDown={e => { if (e.key === 'Enter') check(); }}
            maxLength={5}
          />
          <button className="btn btn-primary zip-submit" onClick={() => check()}>Check</button>
        </div>
      </div>

      <div className="zip-result-wrap">
        {!result && (
          <div className="zip-idle">
            <div className="zip-idle-inner">
              <ZipIcons.compass size={28} />
              <div>
                <div className="zi-head">Coverage across 20+ cities</div>
                <div className="zi-sub">Washtenaw, Wayne, Oakland & surrounding counties. Enter your zip to check.</div>
              </div>
            </div>
          </div>
        )}

        {result?.status === 'invalid' && (
          <div className="zip-card zip-invalid">
            <div className="zc-head">
              <ZipIcons.sparkle size={20} />
              <div>
                <div className="zc-title">Enter a 5-digit zip</div>
                <div className="zc-sub">So we can look up your coverage.</div>
              </div>
            </div>
          </div>
        )}

        {result?.status === 'covered' && (
          <div className="zip-card zip-covered">
            <div className="zc-head">
              <div className="zc-badge" style={{ background: 'var(--forest-700)' }}>
                <ZipIcons.check size={22} strokeWidth={2.5} />
              </div>
              <div>
                <div className="zc-title">Yes — we cover {result.city}, MI {result.zip}.</div>
                <div className="zc-sub">You're in our service area.</div>
              </div>
            </div>
            <div className="zc-actions">
              <button className="btn btn-primary" onClick={onQuote}>Book a free quote <ZipIcons.arrow /></button>
              <a className="btn btn-ghost" href="tel:17344743336"><ZipIcons.phone size={16} /> (734) 474-3336</a>
            </div>
          </div>
        )}

        {result?.status === 'uncovered' && (
          <div className="zip-card zip-uncovered">
            <div className="zc-head">
              <div className="zc-badge" style={{ background: 'var(--bark-600)' }}>
                <ZipIcons.compass size={22} />
              </div>
              <div>
                <div className="zc-title">{result.zip} is outside our regular routes.</div>
                <div className="zc-sub">But we travel for larger jobs — give us a call and we'll see what we can do.</div>
              </div>
            </div>
            <div className="zc-actions">
              <a className="btn btn-primary" href="tel:17344743336"><ZipIcons.phone size={16} /> Call (734) 474-3336</a>
              <button className="btn btn-ghost" onClick={onQuote}>Request a quote anyway</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
