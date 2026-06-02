import { useRef, useCallback, useEffect } from 'react';

/**
 * Dependency-free "decode" text animation.
 *
 * Technique (adapted from tol-is/use-scramble):
 * each character position holds a countdown in a control array — a positive
 * number renders a random glyph and ticks down; 0 locks in the real character.
 * A reveal frontier sweeps left→right while a few characters ahead of it
 * flicker, giving the decoding texture. Throttled rAF loop keeps it at ~60fps
 * scaled by `speed`. Respects prefers-reduced-motion (resolves instantly).
 *
 * Attach the returned `ref` to any text element; call `replay()` to re-trigger.
 */

const LATIN_GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_\\/[]{}=+*^?#'.split('');

const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export type UseDecodeTextOptions = {
  /** The final text to resolve to. */
  text: string;
  /** Reveal speed, 0–1. 1 ≈ 60fps redraw; lower = slower flicker. @default 1 */
  speed?: number;
  /** Characters revealed per frame. Higher = faster wipe. @default 1 */
  step?: number;
  /** How many frames each character flickers before locking. @default 6 */
  scramble?: number;
  /** Run the animation on first mount. @default true */
  playOnMount?: boolean;
  /**
   * Glyph pool to flicker through while scrambling. Pass a CJK pool for
   * Chinese text so widths stay stable and the noise matches the script.
   * @default Latin letters + symbols
   */
  glyphs?: readonly string[];
};

export function useDecodeText({
  text,
  speed = 1,
  step = 1,
  scramble = 6,
  playOnMount = true,
  glyphs = LATIN_GLYPHS,
}: UseDecodeTextOptions) {
  const randGlyph = useCallback(
    () => glyphs[randInt(0, glyphs.length - 1)],
    [glyphs]
  );
  const nodeRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef(0);
  const elapsedRef = useRef(0);
  const frontierRef = useRef(0); // reveal frontier index
  // per-character countdown: number = frames left to scramble, string = locked
  const controlRef = useRef<Array<number | string>>([]);

  const draw = useCallback(() => {
    const node = nodeRef.current;
    if (!node) return false;

    let result = '';
    let done = true;

    for (let i = 0; i < text.length; i++) {
      const cv = controlRef.current[i];
      if (text[i] === ' ') {
        result += ' ';
      } else if (typeof cv === 'number' && cv > 0) {
        result += randGlyph();
        controlRef.current[i] = cv - 1;
        done = false;
      } else if (cv === 0) {
        result += text[i];
        controlRef.current[i] = text[i]; // lock it
      } else if (typeof cv === 'string') {
        result += cv;
      } else {
        // not started yet
        done = false;
      }
    }

    node.textContent = result;
    return done;
  }, [text, randGlyph]);

  const animate = useCallback(
    (time: number) => {
      if (!speed) return;
      rafRef.current = requestAnimationFrame(animate);

      const fpsInterval = 1000 / (60 * speed);
      if (time - elapsedRef.current < fpsInterval) return;
      elapsedRef.current = time;

      // advance the reveal frontier, arming new characters to scramble
      for (let s = 0; s < step; s++) {
        if (frontierRef.current < text.length) {
          const idx = frontierRef.current;
          if (text[idx] !== ' ') {
            controlRef.current[idx] = scramble + randInt(0, Math.ceil(scramble / 2));
          }
          frontierRef.current++;
        }
      }

      const done = draw();
      if (done) cancelAnimationFrame(rafRef.current);
    },
    [draw, speed, step, scramble, text]
  );

  const replay = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    elapsedRef.current = 0;
    frontierRef.current = 0;
    controlRef.current = [];
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!playOnMount || reduced) {
      // resolve instantly, no flicker
      controlRef.current = text.split('');
      frontierRef.current = text.length;
      draw();
      return;
    }

    replay();
    return () => cancelAnimationFrame(rafRef.current);
    // re-run whenever the target text changes (e.g. ZH ⇄ EN switch)
  }, [text, playOnMount, replay, draw]);

  return { ref: nodeRef, replay };
}
