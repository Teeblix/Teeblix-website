// Framer-style "Push Up" page transition, driven directly through the View
// Transitions API so both the outgoing and incoming pages are part of the
// root snapshot (React's <ViewTransition> keeps the incoming page out of it,
// which breaks a push). The keyframes live in globals.css.

let pendingResolve: (() => void) | null = null;

/** Called by the page that just rendered; lets the transition proceed. */
export function signalPageRendered() {
  pendingResolve?.();
}

export function startPageTransition(navigate: () => void) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!document.startViewTransition || reduceMotion) {
    navigate();
    return;
  }

  pendingResolve?.();

  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          pendingResolve = null;
          resolve();
        };
        pendingResolve = finish;
        // Rendering is frozen while this promise is pending, so never hold it
        // for long if the new page is slow to arrive.
        window.setTimeout(finish, 2500);
        navigate();
      })
  );

  const ignore = () => {};
  transition.updateCallbackDone.catch(ignore);
  transition.ready.catch(ignore);
  transition.finished.catch(ignore);
}
