import { groq } from 'next-sanity';

// Supports both this demo's `page` schema (title/intro/body) and the
// OneTrust Sandbox schema (name/heading/subheading/pageBuilder).
export const PAGE_QUERY = groq`*[_type == "page" && slug.current == $slug][0]{
  "title": coalesce(title, name),
  heading,
  "intro": coalesce(intro, subheading),
  body,
  "imageUrl": heroImage.asset->url
}`;

// Demo `resource` docs plus the sandbox's existing `download` docs.
export const RESOURCES_QUERY = groq`*[_type in ["resource", "download"] && defined(file.asset)]
  | order(coalesce(publishedAt, _createdAt) desc){
  _id,
  title,
  description,
  "category": coalesce(category, kind),
  "publishedAt": coalesce(publishedAt, _createdAt),
  "fileUrl": file.asset->url,
  "fileName": file.asset->originalFilename,
  "fileSize": file.asset->size
}`;

// Full-text search across the main content types. `$term` is the user's
// query with a trailing wildcard (e.g. "privacy*") so partial words match.
export const SEARCH_QUERY = groq`*[
  !(_id in path("drafts.**")) &&
  _type in ["page", "resource", "download", "report", "post", "product", "solution", "industry", "glossaryTerm", "faq", "customerStory"] &&
  (!defined(language) || language == "en") &&
  (
    title match $term ||
    name match $term ||
    heading match $term ||
    subheading match $term ||
    description match $term ||
    excerpt match $term ||
    pt::text(body) match $term
  )
]
| score(
    boost(title match $term, 3),
    boost(name match $term, 3),
    boost(heading match $term, 2),
    description match $term,
    pt::text(body) match $term
  )
| order(_score desc)[0...25]{
  _id,
  _type,
  "title": coalesce(title, name, heading, "Untitled"),
  "summary": coalesce(description, subheading, excerpt, intro, pt::text(body)),
  "slug": slug.current,
  "fileUrl": file.asset->url,
  "fileName": file.asset->originalFilename
}`;
