// Page-builder block that lets editors drop a search box + results list
// onto any page. Copy this file into your Studio's schemaTypes folder.
export default {
  name: 'searchBlock',
  title: 'Search',
  type: 'object',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string' },
    { name: 'intro', title: 'Intro text', type: 'text', rows: 2 },
    { name: 'placeholder', title: 'Placeholder text', type: 'string', initialValue: 'Search…' },
    {
      name: 'contentTypes',
      title: 'Content to search',
      description: 'Leave empty to search everything.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Pages', value: 'page' },
          { title: 'Articles', value: 'post' },
          { title: 'Downloads', value: 'download' },
          { title: 'Reports', value: 'report' },
          { title: 'Products', value: 'product' },
          { title: 'Solutions', value: 'solution' },
          { title: 'Industries', value: 'industry' },
          { title: 'Glossary terms', value: 'glossaryTerm' },
          { title: 'FAQs', value: 'faq' },
          { title: 'Customer stories', value: 'customerStory' },
        ],
      },
    },
    {
      name: 'limit',
      title: 'Max results',
      type: 'number',
      initialValue: 10,
      validation: (r) => r.min(1).max(25),
    },
  ],
  preview: {
    select: { title: 'heading', types: 'contentTypes' },
    prepare: ({ title, types }) => ({
      title: title || 'Search',
      subtitle: `Search block · ${types?.length ? types.join(', ') : 'all content'}`,
    }),
  },
};
