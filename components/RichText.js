import { PortableText } from 'next-sanity';

// Renders Sanity Portable Text, or an array of plain strings from fallback data.
export default function RichText({ value }) {
  if (!value || value.length === 0) return null;
  if (typeof value[0] === 'string') {
    return value.map((p, i) => <p key={i}>{p}</p>);
  }
  return <PortableText value={value} />;
}
