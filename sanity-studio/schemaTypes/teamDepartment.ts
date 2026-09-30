import {defineField, defineType} from 'sanity'

export const teamDepartmentType = defineType({
  name: 'teamDepartment',
  title: 'Team-Bereich',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'URL-Kürzel', description: 'Nach der ersten Verwendung möglichst nicht mehr ändern.', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'company', title: 'Unternehmen', description: 'Bestimmt, auf welcher Unternehmensseite dieser Bereich verwendet wird.', type: 'reference', to: [{type: 'company'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', company: 'company.title'},
    prepare: ({title, company}) => ({title, subtitle: company || 'Gruppenweit'}),
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
