import React, { useEffect, useState } from 'react';
import { evaluate } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import * as runtime from 'react/jsx-runtime';
import { previewComponents } from './mdxComponents';
import type { Frontmatter } from '@/lib/types';

interface Props {
  body: string;
  frontmatter: Frontmatter;
}

/**
 * Strip author `import` statements (bare specifiers can't be resolved in the
 * browser) and inject the current frontmatter as an MDX export so `{frontmatter.x}`
 * expressions resolve during preview.
 */
function preprocess(body: string, frontmatter: Frontmatter): string {
  const withoutImports = body.replace(/^\s*import\s.*$/gm, '');
  const fmExport = `export const frontmatter = ${JSON.stringify(frontmatter)}\n\n`;
  return fmExport + withoutImports;
}

export default function MdxPreview({ body, frontmatter }: Props) {
  const [node, setNode] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const handle = setTimeout(async () => {
      try {
        const source = preprocess(body, frontmatter);
        const { default: Content } = await evaluate(source, {
          ...(runtime as any),
          remarkPlugins: [remarkGfm],
          useMDXComponents: () => previewComponents,
        });
        if (cancelled) return;
        setError(null);
        setNode(<Content components={previewComponents} />);
      } catch (err: any) {
        if (cancelled) return;
        setError(err?.message ?? String(err));
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [body, frontmatter]);

  return (
    <div className="h-full overflow-auto bg-slate-900 px-6 py-6">
      {error && (
        <div className="mb-4 rounded-md bg-red-950/60 px-3 py-2 font-mono text-xs text-red-300 whitespace-pre-wrap">
          {error}
        </div>
      )}
      <article className="prose prose-invert max-w-3xl prose-img:rounded-lg prose-headings:text-orange-400">
        {frontmatter.title && <h1>{frontmatter.title}</h1>}
        {node}
      </article>
    </div>
  );
}
