export default {
    name: 'workshop',
    title: 'Workshop',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'Id',
        type: 'string',
        validation: (Rule) => Rule.required().error('A id is required'),
      },
      {
        name: 'title',
        title: 'Title',
        type: 'string'
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
      {
        name: 'body',
        title: 'Body',
       
        type: "array",
        of: [{ type: "block" }],
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime'
      },
 
    ]
  }