import {defineField, defineType} from 'sanity'

export const companyType = defineType({
  name: 'company',
  title: 'Unternehmen (technische Zuordnung)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Unternehmensname',
      description: 'Technischer Stammdatensatz für die Zuordnung von Mitarbeitern, Abteilungen und Referenzen.',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Technisches URL-Kürzel',
      description: 'Nicht verändern: Dieses Kürzel wird von der Website für feste Zuordnungen verwendet.',
      type: 'slug',
      options: {source: 'title'},
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', hidden: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number', hidden: true}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
