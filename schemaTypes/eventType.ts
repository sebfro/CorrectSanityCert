import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'
import DoorsOpenInput from "../components/DoorsOpenInput";

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    preview: {
        select: {
            name: 'name',
            venue: 'venue.name',
            artist: 'headline.name',
            date: 'date',
            media: 'image'
        },
        prepare({name,venue,media,artist,date}) {
            const nameFormatted = name || 'Untitled event';
            const dateFormatted = date ? new Date(date).toLocaleDateString(undefined, {
                dateStyle: 'short'
            }) : 'no date';
            return {
                title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
                subtitle: venue ? `${dateFormatted} at ${venue}` : dateFormatted,
                media: media || CalendarIcon
            }
        }
    },
    groups: [
        {name: 'details', title: 'Details'},
        {name: 'editorial', title: 'Editorial'}
    ],
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            group: 'details'
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {source: 'name'},
            validation: (rule) => rule.required().error('Field is required'),
            hidden: (context) => !context?.document?.name,
            group: 'details'
        }),
        defineField({
            name: 'eventType',
            type: 'string',
            options: {
                list: ['in-person', 'virtual'],
                layout: 'radio'
            },
            group: 'details'
        }),
        defineField({
            name: 'date',
            type: 'datetime',
            group: 'details',
            icon: CalendarIcon
        }),
        defineField({
            name: 'doorsOpen',
            type: 'number',
            initialValue: 60,
            description: 'How many open doors',
            group: 'details',
            components: {
                input: DoorsOpenInput
            }
        }),
        defineField({
            name: 'venue',
            type: 'reference',
            to: [{type: 'venue'}],
            readOnly: ({document, value}) => document?.eventType === 'virtual' && !value,
            validation: (rule) => rule.custom((value, context) => {
                if (value && context?.document?.eventType === 'virtual') {
                    return 'Only in-person events can have a venue';
                }
                return true;
            }),
            group: 'details'
        }),
        defineField({
            name: 'headline',
            type: 'reference',
            to: [{type: 'artist'}],
            group: 'details'
        }),
        defineField({
            name: 'image',
            type: 'image',
            group: 'editorial'
        }),
        defineField({
            name: 'details',
            type: "array",
            of: [{type: 'block'}],
            group: 'editorial'
        }),
        defineField({
            name: 'tickets',
            type: 'url',
            group: 'details'
        })
    ],
})