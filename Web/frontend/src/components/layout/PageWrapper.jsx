// PageWrapper — manages per-page SEO metadata at mount time.
// Sets: <title>, meta description, canonical URL, og:title/url/description,
// twitter:title/description, and optional JSON-LD structured data.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://ascassy.com').replace(/\/$/, '');

function upsertMeta(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    for (const [k, v] of Object.entries(attrs.create || {})) tag.setAttribute(k, v);
    document.head.appendChild(tag);
  }
  for (const [k, v] of Object.entries(attrs.set || {})) tag.setAttribute(k, v);
}

function upsertLink(rel, href) {
  let link = document.head.querySelector(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let script = document.head.querySelector(`script[type="application/ld+json"][data-id="${id}"]`);
  if (!data) {
    if (script) script.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-id', id);
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export default function PageWrapper({ title, description, structuredData, children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      upsertMeta('meta[name="description"]', {
        create: { name: 'description' },
        set: { content: description },
      });
    }

    const canonical = `${SITE_URL}${pathname}`;
    upsertLink('canonical', canonical);

    if (title) {
      upsertMeta('meta[property="og:title"]', {
        create: { property: 'og:title' },
        set: { content: title },
      });
      upsertMeta('meta[name="twitter:title"]', {
        create: { name: 'twitter:title' },
        set: { content: title },
      });
    }
    if (description) {
      upsertMeta('meta[property="og:description"]', {
        create: { property: 'og:description' },
        set: { content: description },
      });
      upsertMeta('meta[name="twitter:description"]', {
        create: { name: 'twitter:description' },
        set: { content: description },
      });
    }
    upsertMeta('meta[property="og:url"]', {
      create: { property: 'og:url' },
      set: { content: canonical },
    });

    upsertJsonLd('page-structured-data', structuredData || null);
  }, [title, description, structuredData, pathname]);

  return <>{children}</>;
}
