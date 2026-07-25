import React from 'react';

/**
 * Preview-time stand-ins for the React components the site's MDX can embed.
 * These don't need to be pixel-perfect — they exist so the in-browser preview
 * renders structure (and named components) without the real, browser-heavy
 * implementations (viewerjs / tiny-slider) that only exist in the main site.
 */

function Labeled({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <div className="my-4 rounded-lg border border-dashed border-slate-600 bg-slate-800/40 p-4 text-sm not-prose">
      <div className="mb-1 font-mono text-xs uppercase tracking-wide text-orange-400">{label}</div>
      {children}
    </div>
  );
}

// Relative /assets/... paths are served by the live site, not the studio, so resolve
// them against the site origin so real images show up in the preview.
const SITE_ORIGIN = 'https://kousheralam.github.io';
function resolveSrc(directory = '', imagePath = ''): string {
  const joined = `${directory}/${imagePath}`.replace(/([^:])\/{2,}/g, '$1/');
  if (/^https?:\/\//.test(joined)) return joined;
  return `${SITE_ORIGIN}${joined.startsWith('/') ? '' : '/'}${joined}`;
}

/** Real preview of the site's PhotoViewer: shows the images in a scroll row. */
export function PhotoViewerStub(props: any) {
  const images: any[] = Array.isArray(props?.images) ? props.images : [];
  return (
    <div className="not-prose my-4 rounded-lg border border-slate-700 bg-slate-800/40 p-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-200">{props?.title ?? 'Gallery'}</span>
        <span className="font-mono text-xs text-orange-400">&lt;PhotoViewer /&gt;</span>
      </div>
      {images.length === 0 ? (
        <div className="text-sm text-slate-400">No images provided yet.</div>
      ) : (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((im, i) => (
            <img
              key={i}
              src={resolveSrc(props?.directory, im?.imagePath ?? im?.src)}
              alt={im?.alt ?? ''}
              loading="lazy"
              className="h-28 w-auto flex-none rounded bg-slate-700 object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** A generic placeholder for any component name we don't explicitly stub. */
export function makeFallback(name: string) {
  return function Fallback(props: any) {
    return (
      <Labeled label={`<${name} />`}>
        <div className="text-slate-400">
          Component preview placeholder. It will render for real on the published site.
        </div>
        {props?.children}
      </Labeled>
    );
  };
}

const base: Record<string, React.ComponentType<any>> = {
  PhotoViewer: PhotoViewerStub,
};

/**
 * A components object that resolves any Capitalized component name — returning a
 * labeled fallback for anything not explicitly stubbed — while letting intrinsic
 * HTML elements (p, h1, a, …) fall through to their defaults.
 */
export const previewComponents: Record<string, React.ComponentType<any>> = new Proxy(base, {
  get(target, prop: string) {
    if (prop in target) return (target as any)[prop];
    if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
      const fb = makeFallback(prop);
      (target as any)[prop] = fb;
      return fb;
    }
    return undefined;
  },
  has(target, prop: string) {
    if (typeof prop === 'string' && /^[A-Z]/.test(prop)) return true;
    return prop in target;
  },
});
