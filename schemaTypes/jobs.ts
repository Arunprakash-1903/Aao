export default {
    name: 'jobs',
    title: 'Jobs',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'string',
        validation: (Rule) => Rule.required().error('A id is required'),
      },
    

      {
        name: 'jobd',
        title: 'JD',
       
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: 'about',
        title: 'Company About',
       
        type: "array",
        of: [{ type: "block" }],
      }
    ],

  }