/**
 * Google "Add as a preferred source" button.
 * https://developers.google.com/search/docs/appearance/preferred-sources
 *
 * The library (news.google.com/swg/js/v1/publisher.js) is loaded once in
 * app/layout.tsx. Both theme variants are rendered so the library processes
 * each one on load; Tailwind's `dark:` variant shows the one that matches the
 * site theme, so the toggle switches buttons without re-running the library.
 */
export default function PreferredSourceButton({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="dark:hidden">
        <div google-add-preferred-source-btn="" data-theme="light" data-lang="en" />
      </div>
      <div className="hidden dark:block">
        <div google-add-preferred-source-btn="" data-theme="dark" data-lang="en" />
      </div>
    </div>
  );
}
