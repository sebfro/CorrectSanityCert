import {defineField, defineType} from 'sanity'

export const artistType = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
        }),
        defineField({
            name: 'headline',
            type: 'array',
            of: [{type: 'reference', to: {type: 'event'}}]
        })
    ],
})