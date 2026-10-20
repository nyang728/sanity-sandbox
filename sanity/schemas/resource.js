export default {
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Guide', 'Whitepaper', 'Datasheet', 'Report'] },
    },
    { name: 'publishedAt', title: 'Published at', type: 'date' },
    {
      name: 'file',
      title: 'PDF file',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (r) => r.required(),
    },
  ],
  orderings: [{ title: 'Newest', name: 'newest', by: [{ field: 'publishedAt', direction: 'desc' }] }],
};
