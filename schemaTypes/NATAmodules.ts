export default {
    name: 'modules',
    title: 'NATA Course Modules',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'id',
        title: 'Id',
        type: 'string',
        validation: (Rule) => Rule.required().error('A id is required'),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96
        }
      },
    
      {
        name: 'description',
        title: 'Description',
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
    
    ]
  }