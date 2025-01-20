export default {
    name: 'main',
    title: 'Intro page content',
    type: 'document',
    fields: [
        {
            name: 'page',
            title: 'Page',
            type: 'string',
            options: {
                list: [
                  { title: 'Nata Courses', value: 'NataCourse' },
                  { title: 'Courses', value: 'Courses' },
                  { title: 'WorkShop', value: 'WorkShop' },
                  { title: 'FDP', value: 'FDP' },
                  { title: 'Home', value: 'Home' },
                ],
              },
          },
      {
        name: 'video',
        title: 'Video',
        type: 'string'
      },

      {
        name: 'description',
        title: 'Description',
        type: "array",
        of: [{ type: "block" }],
      }
    ]
  }