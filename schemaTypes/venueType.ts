import {defineField, defineType} from 'sanity'

export const venueType = defineType({
    name: 'venue',
    title: 'Venue',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'events',
            type: 'array',
            of: [{type: 'reference', to: {type: 'event'}}]
        })
    ],
})