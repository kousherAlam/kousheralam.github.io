// Registry of React components available to MDX posts. Client- and server-safe
// (no JSX/React here) so both the editor palette and the publish endpoint can use it.

export interface ComponentDef {
  /** Component name as used in MDX, e.g. <PhotoViewer /> */
  name: string;
  /** Short label shown in the editor palette. */
  description: string;
  /** Import line auto-injected into the post on publish so the site can render it. */
  importLine: string;
  /** Ready-to-use MDX snippet inserted when the author clicks the palette button. */
  snippet: string;
}

export const COMPONENT_DEFS: ComponentDef[] = [
  {
    name: 'PhotoViewer',
    description: 'Image gallery / carousel',
    importLine: 'import PhotoViewer from "@/components/PhotoViewer";',
    snippet: [
      '<PhotoViewer',
      '  name="gallery-1"',
      '  title="Gallery"',
      '  minHeight="200px"',
      '  directory="/assets/blog/your-folder"',
      '  images={[',
      '    { imagePath: "1.png", alt: "First image" },',
      '    { imagePath: "2.png", alt: "Second image" },',
      '  ]}',
      '  client:only="react"',
      '/>',
    ].join('\n'),
  },
];

const byName = new Map(COMPONENT_DEFS.map((c) => [c.name, c]));

/**
 * Ensure every registered component used in the body has its import line, so the
 * published MDX renders on the site even though authors insert components without
 * writing imports. Idempotent — won't duplicate an existing import.
 */
export function ensureComponentImports(body: string): string {
  const missing: string[] = [];
  for (const def of COMPONENT_DEFS) {
    const used = new RegExp(`<${def.name}[\\s/>]`).test(body);
    const imported =
      body.includes(def.importLine) || new RegExp(`import\\s+${def.name}\\b`).test(body);
    if (used && !imported) missing.push(def.importLine);
  }
  if (!missing.length) return body;
  return `${missing.join('\n')}\n\n${body.replace(/^\n+/, '')}`;
}

export function componentDef(name: string): ComponentDef | undefined {
  return byName.get(name);
}
