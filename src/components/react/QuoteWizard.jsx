import { useState, useEffect } from 'react';

const Svg = ({ children, size = 24, strokeWidth = 1.6, fill, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...rest}>
    {children}
  </svg>
);

const WizIcons = {
  chainsaw: p => <Svg {...p}><path d="M3 8h10l2-2h4v4h-4l-2 2H3z"/><path d="M6 12v3M9 12v3M12 12v3"/><circle cx="17" cy="16" r="2"/></Svg>,
  branches: p => <Svg {...p}><path d="M12 22V6"/><path d="M12 10l-4-4M12 14l4-4M12 18l-4-4"/></Svg>,
  storm: p => <Svg {...p}><path d="M5 15a4 4 0 010-8 6 6 0 0111.5-2 5 5 0 012 9.5"/><path d="M11 14l-2 5h3l-2 4"/></Svg>,
  stump: p => <Svg {...p}><ellipse cx="12" cy="8" rx="8" ry="3"/><path d="M4 8v6c0 1.5 3.5 3 8 3s8-1.5 8-3V8"/><path d="M10 8v6M14 8v6"/></Svg>,
  hedge: p => <Svg {...p}><rect x="3" y="10" width="18" height="10" rx="2"/><path d="M6 10V6M10 10V4M14 10V5M18 10V7"/></Svg>,
  leaf: p => <Svg {...p}><path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z"/><path d="M5 19l7-7"/></Svg>,
  bolt: p => <Svg {...p}><path d="M13 3L4 14h7l-1 7 9-11h-7z"/></Svg>,
  clock: p => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Svg>,
  compass: p => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M16 8l-2 6-6 2 2-6z"/></Svg>,
  phone: p => <Svg {...p}><path d="M4 4h4l2 5-2.5 1.5a11 11 0 006 6L15 14l5 2v4a1 1 0 01-1 1A16 16 0 013 5a1 1 0 011-1z"/></Svg>,
  arrow: p => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Svg>,
  check: p => <Svg {...p}><path d="M5 13l4 4 10-10"/></Svg>,
  close: p => <Svg {...p}><path d="M6 6l12 12M18 6L6 18"/></Svg>,
};

const SERVICE_OPTS = [
  { id: 'removal', icon: 'chainsaw', title: 'Tree removal', sub: 'Take down 1 or more trees' },
  { id: 'trim', icon: 'branches', title: 'Trimming & pruning', sub: 'Shape, thin, or reduce' },
  { id: 'emergency', icon: 'storm', title: 'Emergency / storm', sub: 'Fallen, split, or hanging' },
  { id: 'stump', icon: 'stump', title: 'Stump grinding', sub: 'Below-grade removal' },
  { id: 'hedge', icon: 'hedge', title: 'Hedge & shrub', sub: 'Shape or rejuvenate' },
  { id: 'clearing', icon: 'leaf', title: 'Lot clearing', sub: 'New build or fence-line' },
];

const SIZE_OPTS = [
  { id: 'small', title: 'Small', sub: 'Under 20 ft' },
  { id: 'medium', title: 'Medium', sub: '20–40 ft' },
  { id: 'large', title: 'Large', sub: '40–70 ft' },
  { id: 'xlarge', title: 'X-Large', sub: '70 ft +' },
];

const URGENCY_OPTS = [
  { id: 'now', icon: 'bolt', title: 'Emergency · today', sub: 'Storm, hazard, blocked access' },
  { id: 'soon', icon: 'clock', title: 'This week', sub: 'Schedule ASAP' },
  { id: 'flex', icon: 'compass', title: 'Next 2–3 weeks', sub: 'Standard booking' },
  { id: 'plan', icon: 'leaf', title: 'Just planning', sub: 'Quote only for now' },
];

const INITIAL_DATA = { service: null, size: null, count: 1, urgency: null, name: '', email: '', phone: '', zip: '', address: '', notes: '' };

export default function QuoteWizard({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [requestId, setRequestId] = useState('');
  const [data, setData] = useState(INITIAL_DATA);
  const [errs, setErrs] = useState({});

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setData(INITIAL_DATA);
    setErrs({});
    setSubmitting(false);
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = patch => setData(d => ({ ...d, ...patch }));

  const validateContact = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Your name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email';
    if (!/^[\d\s\-()+.]{7,}$/.test(data.phone)) e.phone = 'Enter a valid phone number';
    if (!/^\d{5}$/.test(data.zip)) e.zip = 'Enter a 5-digit zip';
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submitToNetlify = async () => {
    setSubmitting(true);
    const selService = SERVICE_OPTS.find(s => s.id === data.service);
    const selSize = SIZE_OPTS.find(s => s.id === data.size);
    const selUrg = URGENCY_OPTS.find(s => s.id === data.urgency);
    const now = new Date();
    const yy = String(now.getFullYear()).slice(2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    const id = `FTE-${yy}${mm}${dd}-${rand}`;
    setRequestId(id);
    const body = new URLSearchParams({
      'form-name': 'quote-request',
      'request-id': id,
      service: selService?.title || '',
      size: selSize ? `${selSize.title} (${selSize.sub})` : '',
      count: String(data.count),
      urgency: selUrg?.title || '',
      name: data.name,
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      address: data.address,
      notes: data.notes,
    });
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() });
      if (typeof fbq === 'function') fbq('track', 'Lead', { content_name: selService?.title, content_category: selUrg?.title });
      setStep(4);
    } catch {
      setStep(4);
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step === 0 && !data.service) return;
    if (step === 1 && !data.size) return;
    if (step === 2 && !data.urgency) return;
    if (step === 3) { if (!validateContact()) return; submitToNetlify(); return; }
    const nextStep = Math.min(4, step + 1);
    const stepNames = ['Service', 'Size', 'Urgency', 'Contact'];
    if (typeof fbq === 'function') fbq('trackCustom', 'QuoteWizardStep', { step_number: nextStep + 1, step_name: stepNames[nextStep], service_selected: data.service });
    setStep(nextStep);
  };

  const back = () => setStep(s => Math.max(0, s - 1));

  const titles = ['Service Needed', 'How big is the tree?', 'When do you need service?', 'Your Details', ''];
  const subs = ["Pick the closest match — we'll dial it in during the walk-through.", "If you're unsure, ballpark it. We'll confirm on-site.", 'Emergency jobs jump the queue. Standard bookings run 1–3 weeks.', "We'll call you within one business day to schedule a quote visit.", ''];
  const selService = SERVICE_OPTS.find(s => s.id === data.service);
  const selSize = SIZE_OPTS.find(s => s.id === data.size);
  const selUrg = URGENCY_OPTS.find(s => s.id === data.urgency);

  return (
    <div className="wiz-backdrop" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="wiz" role="dialog" aria-modal="true">
        <div className="wiz-head">
          <div>
            <h3>Free quote</h3>
            <div className="wiz-steps">
              STEP {Math.min(step + 1, 4)} / 4
              <div className="wiz-pips">
                {[0,1,2,3].map(i => <div key={i} className={`wiz-pip ${step > i ? 'done' : ''} ${step === i ? 'active' : ''}`} />)}
              </div>
            </div>
          </div>
          <button className="wiz-close" onClick={onClose} aria-label="Close"><WizIcons.close size={16} /></button>
        </div>

        <div className="wiz-body">
          {step < 4 && <>
            <div className="wiz-step-title">{titles[step]}</div>
            <div className="wiz-step-sub">{subs[step]}</div>
          </>}

          {step === 0 && (
            <div className="wiz-options">
              {SERVICE_OPTS.map(o => (
                <button key={o.id} className={`wiz-option ${data.service === o.id ? 'selected' : ''}`} onClick={() => set({ service: o.id })}>
                  <div className="ico">{WizIcons[o.icon]({})}</div>
                  <div className="title">{o.title}</div>
                  <div className="sub">{o.sub}</div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && <>
            <div className="wiz-options">
              {SIZE_OPTS.map(o => (
                <button key={o.id} className={`wiz-option ${data.size === o.id ? 'selected' : ''}`} onClick={() => set({ size: o.id })}>
                  <div className="title">{o.title}</div>
                  <div className="sub">{o.sub}</div>
                </button>
              ))}
            </div>
            <div className="wiz-field">
              <label>How many trees?</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button className="btn btn-ghost" style={{ padding: '0.5rem 0.9rem' }} onClick={() => set({ count: Math.max(1, data.count - 1) })}>−</button>
                <div style={{ fontFamily: 'var(--ff-display)', fontSize: '1.6rem', minWidth: '2ch', textAlign: 'center' }}>{data.count}</div>
                <button className="btn btn-ghost" style={{ padding: '0.5rem 0.9rem' }} onClick={() => set({ count: Math.min(50, data.count + 1) })}>+</button>
              </div>
            </div>
          </>}

          {step === 2 && (
            <div className="wiz-options">
              {URGENCY_OPTS.map(o => (
                <button key={o.id} className={`wiz-option ${data.urgency === o.id ? 'selected' : ''}`} onClick={() => set({ urgency: o.id })}>
                  <div className="ico">{WizIcons[o.icon]({})}</div>
                  <div className="title">{o.title}</div>
                  <div className="sub">{o.sub}</div>
                </button>
              ))}
            </div>
          )}

          {step === 3 && <>
            <div className="wiz-field">
              <label>Your summary</label>
              <div className="wiz-summary">
                <div className="row"><span className="k">Service</span><span className="v">{selService?.title}</span></div>
                <div className="row"><span className="k">Size × Count</span><span className="v">{selSize?.title} · {data.count} tree{data.count > 1 ? 's' : ''}</span></div>
                <div className="row"><span className="k">Timing</span><span className="v">{selUrg?.title}</span></div>
              </div>
            </div>
            <div className="wiz-2col">
              <div className={`wiz-field ${errs.name ? 'err' : ''}`}>
                <label>Name</label>
                <input value={data.name} onChange={e => set({ name: e.target.value })} placeholder="Your full name" />
                {errs.name && <div className="err-msg">{errs.name}</div>}
              </div>
              <div className={`wiz-field ${errs.email ? 'err' : ''}`}>
                <label>Email</label>
                <input type="email" value={data.email} onChange={e => set({ email: e.target.value })} placeholder="you@example.com" />
                {errs.email && <div className="err-msg">{errs.email}</div>}
              </div>
            </div>
            <div className="wiz-2col">
              <div className={`wiz-field ${errs.phone ? 'err' : ''}`}>
                <label>Phone</label>
                <input value={data.phone} onChange={e => set({ phone: e.target.value })} placeholder="(734) 555-0123" />
                {errs.phone && <div className="err-msg">{errs.phone}</div>}
              </div>
              <div className={`wiz-field ${errs.zip ? 'err' : ''}`}>
                <label>Zip</label>
                <input value={data.zip} onChange={e => set({ zip: e.target.value.replace(/\D/g, '').slice(0, 5) })} placeholder="48103" />
                {errs.zip && <div className="err-msg">{errs.zip}</div>}
              </div>
            </div>
            <div className="wiz-field">
              <label>Address (optional)</label>
              <input value={data.address} onChange={e => set({ address: e.target.value })} placeholder="123 Main St" />
            </div>
            <div className="wiz-field">
              <label>Anything we should know?</label>
              <textarea rows={3} value={data.notes} onChange={e => set({ notes: e.target.value })} placeholder="Big leaning oak near the fence. Power line underneath…" />
            </div>
          </>}

          {step === 4 && (
            <div className="wiz-success">
              <div className="circle"><WizIcons.check size={32} strokeWidth={2.5} /></div>
              <h3>Quote request received.</h3>
              <p>Thanks {data.name.split(' ')[0] || 'neighbor'}!</p>
              <p>We will call you back ASAP (generally within 24 hours).</p>
              <p>For same-day emergencies, call <a href="tel:17344743336" style={{ color: 'var(--forest-700)', fontWeight: 600 }}>(734) 474-3336</a>.</p>
              <div style={{ fontFamily: 'var(--ff-mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--fg-3)', textTransform: 'uppercase' }}>Request ID · {requestId}</div>
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="wiz-foot">
            <button className="btn btn-ghost" onClick={step === 0 ? onClose : back}>{step === 0 ? 'Cancel' : 'Back'}</button>
            <button className="btn btn-primary" onClick={next} disabled={submitting}>
              {submitting ? 'Sending…' : step === 3 ? 'Send request' : 'Continue'} {!submitting && <WizIcons.arrow />}
            </button>
          </div>
        )}
        {step === 4 && (
          <div className="wiz-foot" style={{ justifyContent: 'center' }}>
            <button className="btn btn-ghost" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
