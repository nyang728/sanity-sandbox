// Sample content shown when Sanity isn't connected (or has no documents yet).

export const fallbackPages = {
  home: {
    title: 'Home',
    heading: 'OneTrust Sandbox Inc',
    intro:
      'A demo website built with Next.js and React, powered by the Sanity content platform. Edit this text in Sanity Studio to see it update here.',
  },
  about: {
    title: 'About Us',
    heading: 'About OneTrust Sandbox Inc',
    intro: 'A sandbox site used to test a headless CMS integration with Sanity.',
    body: [
      'Founded in 2026, OneTrust Sandbox Inc exists purely to exercise content models, queries and page rendering against a Sanity sandbox project.',
      'Our "team" is made up of placeholder content, sample images and a very patient developer.',
      'Replace this copy by creating a "page" document with the slug "about" in your Sanity Studio.',
    ],
  },
  contact: {
    title: 'Contact',
    heading: 'Get in touch',
    intro:
      'Send us a message. When a write token is configured, submissions are saved as "contactSubmission" documents in Sanity.',
  },
  // Demo page showing the Search page-builder block. In Sanity, create a
  // page and add a "Search" block to its page builder to get the same result.
  'search-demo': {
    title: 'Search demo',
    heading: 'Search block demo',
    intro: 'This page is built from page-builder blocks. The block below is a "searchBlock".',
    pageBuilder: [
      {
        _key: 'demo-search',
        _type: 'searchBlock',
        heading: 'Search articles and downloads',
        intro: 'This block only searches articles and downloads, and shows up to 5 results.',
        placeholder: 'Try "privacy" or "sample"',
        contentTypes: ['post', 'download'],
        limit: 5,
      },
    ],
  },
  resources: {
    title: 'Resources',
    heading: 'Resources',
    intro: 'Guides and documents you can download. Upload PDFs as "resource" documents in Sanity.',
  },
};

export const fallbackResources = [
  {
    _id: 'sample-guide',
    title: 'Getting Started Guide',
    description: 'A sample PDF bundled with the site so the download flow works before Sanity has content.',
    category: 'Guide',
    publishedAt: '2026-10-19',
    fileUrl: '/sample-guide.pdf',
    fileName: 'sample-guide.pdf',
  },
];
