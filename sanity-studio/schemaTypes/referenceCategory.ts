import {defineField, defineType} from 'sanity'

export const referenceCategoryType = defineType({
  name: 'referenceCategory',
  title: 'Referenz-Kategorie',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'URL-Kürzel', description: 'Nach der ersten Veröffentlichung möglichst nicht mehr ändern.', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'company', title: 'Unternehmen', type: 'reference', to: [{type: 'company'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', company: 'company.title'},
    prepare: ({title, company}) => ({title, subtitle: company}),
  },
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'title', direction: 'asc'},
      ],
    },
  ],
})
