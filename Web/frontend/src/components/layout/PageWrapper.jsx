// PageWrapper — sets per-page <title> + meta description on mount.
// Lightweight (no external lib); good enough for marketing pages.
import { useEffect } from 'react';

export default function PageWrapper({ title, description, children }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);

  return <>{children}</>;
}
