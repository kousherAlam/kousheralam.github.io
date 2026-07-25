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

export function PhotoViewerStub(props: any) {
  const images = Array.isArray(props?.images) ? props.images : [];
  return (
    <Labeled label={`PhotoViewer${props?.title ? ` · ${props.title}` : ''}`}>
      <div className="text-slate-300">
        {images.length > 0
          ? `${images.length} image${images.length === 1 ? '' : 's'} from ${props.directory ?? '(directory)'}`
          : 'Image gallery (preview placeholder)'}
      </div>
    </Labeled>
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
