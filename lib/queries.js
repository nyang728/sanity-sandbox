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
