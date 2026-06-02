import { useEffect, useRef } from 'react';
import { useDecodeText } from './useDecodeText';

// CJK pool so Chinese text scrambles through same-width glyphs (no layout jitter)
// and the noise matches the script instead of flickering Latin letters.
const CJK_GLYPHS =
  '守护信任安全系统智能边界数据治理风险审核合规模型评测协作产品交付'.split('');

type DecodeTextProps = {
  text: string;
  /** Picks the glyph pool: 'zh' flickers CJK, anything else flickers Latin. */
  lang?: string;
  className?: string;
  /** Element tag to render. @default 'span' */
  as?: 'span' | 'p' | 'h1' | 'h2';
};

/**
 * Renders `text` and runs the decode animation once it scrolls into view.
 *
 * The real text is rendered as children (so prerendered HTML keeps it for SEO),
 * then `useDecodeText` takes over imperatively. playOnMount is false — an
 * IntersectionObserver triggers `replay()` the first time the element is visible.
 * Respects prefers-reduced-motion (leaves the static text untouched).
 */
export function DecodeText({ text, lang, className, as: Tag = 'span' }: DecodeTextProps) {
  const { ref, replay } = useDecodeText({
    text,
    playOnMount: false,
    scramble: 8,
    glyphs: lang === 'zh' ? CJK_GLYPHS : undefined,
  });
  const playedRef = useRef(false);

  useEffect(() => {
    // re-arm when the text changes (e.g. ZH ⇄ EN switch)
    playedRef.current = false;

    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !playedRef.current) {
            playedRef.current = true;
            replay();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text, replay, ref]);

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement>} className={className}>
      {text}
    </Tag>
  );
}
