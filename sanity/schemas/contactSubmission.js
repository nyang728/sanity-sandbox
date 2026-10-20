export default {
  name: 'contactSubmission',
  title: 'Contact submission',
  type: 'document',
  readOnly: true,
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'message', title: 'Message', type: 'text' },
    { name: 'submittedAt', title: 'Submitted at', type: 'datetime' },
  ],
  preview: { select: { title: 'name', subtitle: 'email' } },
};
