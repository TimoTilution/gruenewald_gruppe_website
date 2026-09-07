import {defineField, defineType} from 'sanity'

export const companyType = defineType({
  name: 'company',
  title: 'Unternehmen',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
