export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "SEOAudit",
  slug: "seo-audit",
  tagline: "A blunt SEO audit in 60 seconds",
  description: "Paste your homepage HTML or on-page copy and get a checklist of missing or weak SEO signals - title length, meta, H1, image alt, internal links - plus a priority fix list. For founders doing their own SEO.",
  toolTitle: "Run SEO audit",
  resultLabel: "Your audit",
  ctaLabel: "Audit page",
  features: [
  "Title / meta / H1 check",
  "Image alt + links",
  "Priority fixes",
  "No tooling"
],
  inputs: [
  {
    "key": "url",
    "label": "Page URL (optional)",
    "type": "input",
    "placeholder": "https://..."
  },
  {
    "key": "copy",
    "label": "Paste homepage HTML or on-page copy",
    "type": "textarea",
    "placeholder": "<title>TaskNinja - Async Standups</title>\n<meta name=\"description\" content=\"...\">"
  }
] as InputField[],
  systemPrompt: "You are an SEO auditor. Given homepage HTML or on-page copy, check title length, meta description, H1, image alt, and internal links. Output a PASS/WARN checklist and a ranked top-3 fix list.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited"
  },
  {
    "tier": "Pro",
    "price": "$9/mo",
    "desc": "Ranked fixes, bulk"
  },
  {
    "tier": "Team",
    "price": "$29/mo",
    "desc": "Site-wide, API"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const copy = inputs['copy'] || ''
  const url = inputs['url'] || '(no url)'
  const title = (copy.match(/<title>(.*?)<\/title>/i) || [,''])[1]
  const checks = []
  checks.push((title.length >= 30 && title.length <= 60) ? 'PASS  title length (' + title.length + ')' : 'WARN  title length (' + title.length + ') - aim 30-60')
  checks.push(/<meta name="description"/i.test(copy) ? 'PASS  meta description' : 'WARN  missing meta description')
  checks.push(/<h1/i.test(copy) ? 'PASS  has H1' : 'WARN  no H1 tag')
  checks.push(/<img[^>]+alt=/i.test(copy) ? 'PASS  images have alt' : 'WARN  images missing alt text')
  checks.push(/<a[^>]+href=/i.test(copy) ? 'PASS  internal links present' : 'WARN  no internal links')
  const warns = checks.filter(c => c.indexOf('WARN') === 0)
  const fix = warns.length ? '\n\nTOP FIXES\n' + warns.map(w => '- ' + w.replace('WARN  ', '')).join('\n') : '\n\nNothing critical - you are in good shape.'
  return 'SEO AUDIT' + (url !== '(no url)' ? ' for ' + url : '') + '\n\n' + checks.join('\n') + fix + '\n\n--- (Mock scan. Add OPENAI_API_KEY for a ranked, site-wide audit.)'
}
}
