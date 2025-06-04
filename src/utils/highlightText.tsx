// highlightText.tsx
import React, { JSX } from "react";

export function highlightText(
  text: string,
  query: string
): (string | JSX.Element)[] {
  if (!query.trim()) return [text];

  const terms = query
    .split(" ")
    .map((t) => t.trim())
    .filter(Boolean);

  const escapedTerms = terms.map((term) =>
    term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escapedTerms.join("|")})`, "gi");

  return text.split(regex).map((part, index) => {
    // Reset lastIndex to ensure consistent results when using the global flag
    regex.lastIndex = 0;
    return regex.test(part) ? (
      <span key={index} className="bg-yellow-200 font-semibold">
        {part}
      </span>
    ) : (
      part
    );
  });
}
