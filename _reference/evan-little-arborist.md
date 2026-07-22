# Evan Little — ISA Certified Arborist (MI-4446A)

Removed from site while not employed. Restore when rehired.
Credential: MI-4446A · International Society of Arboriculture

---

## about.astro — Meta description (line 10)
```
description="Meet David Paga and the Foundations crew. 26+ years of experience in Southeast Michigan with ISA Certified Arborist Evan Little on staff."
```

## about.astro — Schema (lines 28-42)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Evan Little",
  "jobTitle": "Certified Arborist",
  "worksFor": { "@id": "https://foundationstreeexperts.com/#business" },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "ISA Certified Arborist",
    "identifier": "MI-4446A",
    "recognizedBy": { "@type": "Organization", "name": "International Society of Arboriculture" }
  },
  "knowsAbout": ["Tree Health Assessment", "Pruning Standards", "Disease Diagnosis", "Risk Assessment"]
}
```

## about.astro — "Our Arborist" section (lines 82-97)
```html
<!-- Arborist -->
<section class="section trust noise">
  <div class="container" style="position:relative;z-index:2;">
    <div class="reveal">
      <div class="eyebrow">Our arborist</div>
      <h2 class="display-lg" style="margin-top:1rem;">Evan Little, ISA Certified Arborist</h2>
      <p class="lead" style="margin-top:1rem;max-width:680px;">
        Credential: <strong>MI-4446A</strong> · International Society of Arboriculture
      </p>
    </div>
    <div class="reveal" style="margin-top:2rem;max-width:680px;">
      <p>Evan brings certified expertise to every assessment and job plan. Whether it's diagnosing oak wilt, recommending targeted pruning instead of removal, or evaluating root stability on a mature maple, Evan's assessments ensure the right call is made — every time.</p>
      <p style="margin-top:1rem;">Having an ISA Certified Arborist on staff means Foundations doesn't guess. We know which trees need to come down, which can be saved, and exactly how to handle complex removals safely.</p>
    </div>
  </div>
</section>
```

## about.astro — Founder bio mentions arborist (line 76)
```
<p>It means pulling up on time, walking the property before we quote, and calling out problems even when they're outside our scope. It means having a certified arborist on staff — and leaving every job cleaner and straighter than we found it.</p>
```

## BaseLayout.astro — Employee schema in LocalBusiness (lines 89-102)
```json
"employee": {
  "@type": "Person",
  "name": "Evan Little",
  "jobTitle": "Certified Arborist",
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "ISA Certified Arborist",
    "recognizedBy": {
      "@type": "Organization",
      "name": "International Society of Arboriculture"
    },
    "identifier": "MI-4446A"
  }
}
```

## trust.json — Arborist card
```json
{
  "icon": "badge",
  "title": "Certified arborist on staff",
  "desc": "Evan Little — Certified Arborist (MI-4446A) — is on staff and available for every job. Not a guy who bought a chainsaw last spring."
}
```

## faqs.json — Tree health assessment FAQ
```json
{ "q": "Do you offer tree health assessments?", "a": "Yes. Our certified arborist Evan Little (MI-4446A) can evaluate a tree before you decide to remove it — sometimes the right answer is targeted pruning, cabling, or disease treatment." }
```

## TrustStrip.astro
```
<span>✓ ISA Certified Arborist</span>
```

## index.astro — Hero stat (lines 87-89)
```html
<div class="hero-meta-item">
  <span class="num">ISA</span>
  <span class="label">Certified arborist on staff</span>
</div>
```

## index.astro — Founder badges (line 306)
```
{['Licensed & Insured', '24/7 Emergency', 'Certified Arborist on Staff'].map(b => (
```

## index.astro — Founder bio (line 304)
```
...It means having a certified arborist on staff — and leaving every job cleaner and straighter than we found it.
```

## ann-arbor.md — description (line 4)
```
description: "Professional tree removal, trimming, and emergency storm response in Ann Arbor, MI. 26+ years of experience serving Tree Town's mature urban canopy. ISA Certified Arborist on staff."
```

## ann-arbor.md — body (line 21)
```
Our ISA Certified Arborist Evan Little (MI-4446A) is available to assess any tree before work begins.
```

## tree-removal.md — description (line 4)
```
description: "Professional tree removal in Ann Arbor and Southeast Michigan. Climbing and bucket truck crews, full cleanup, ISA Certified Arborist on staff. Free estimates."
```

## tree-removal.md — body (line 35)
```
...with ISA Certified Arborist Evan Little (MI-4446A) available to assess any tree before work begins.
```

## tree-removal.md — body (line 39)
```
Not every problem tree needs to come down. Our certified arborist evaluates each tree individually.
```

## trimming-pruning.md — description (line 4)
```
description: "Professional tree trimming and pruning in Ann Arbor, MI. Crown thinning, deadwood removal, and structural pruning by an ISA Certified Arborist. Free estimates."
```

## trimming-pruning.md — process step (line 12)
```
text: "Our certified arborist walks the property, evaluates each tree's health, structure, and growth pattern, and recommends the right type of pruning."
```

## trimming-pruning.md — body (line 34)
```
Foundations Tree Experts provides professional pruning services guided by ISA standards, with Certified Arborist Evan Little (MI-4446A) available to assess every tree and recommend the right approach.
```

## trimming-pruning.md — body (line 66)
```
Every pruning job starts with an assessment. Our arborist evaluates:
```

## trimming-pruning.md — FAQ (line 27)
```
Our arborist can recommend a maintenance schedule during your free assessment.
```

## stump-grinding.md — FAQ (line 25)
```
Our arborist can advise on timing.
```

## crane-assisted-removal.md — process step (line 13)
```
Our arborist and crew lead evaluate the tree...
```

## lot-land-clearing.md — FAQ (line 24)
```
Our arborist can advise on which trees are healthy and worth keeping.
```

## City page descriptions with "ISA Certified Arborist on staff"
- canton.md (line 4)
- northville.md (line 5)
- novi.md (line 5)
- plymouth.md (line 4)

## services/index.astro
- description (line 11): "...ISA Certified Arborist on staff. Free estimates."
- body (line 45): "...and an ISA Certified Arborist on staff."
