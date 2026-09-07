import {defineField, defineType} from 'sanity'

export const teamDepartmentType = defineType({
  name: 'teamDepartment',
  title: 'Team-Bereich',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, validation: (Rule) => Rule.required()}),
    defineField({name: 'company', title: 'Unternehmen', type: 'reference', to: [{type: 'company'}]}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'title', company: 'company.title'},
    prepare: ({title, company}) => ({title, subtitle: company || 'Gruppenweit'}),
  },
})
