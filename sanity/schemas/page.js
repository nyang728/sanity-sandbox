export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Use: home, about, contact, resources',
      options: { source: 'title' },
      validation: (r) => r.required(),
    },
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'intro', title: 'Intro', type: 'text', rows: 3 },
    { name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
    {
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      // Add your other blocks (e.g. formBlock) to this list as well
      of: [{ type: 'searchBlock' }],
    },
  ],
};
