import {defineField, defineType} from 'sanity'

export const groupTeamDepartmentType = defineType({
  name: 'groupTeamDepartment',
  title: 'Gruppen-Abteilung',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL-Kürzel',
      description: 'Wird automatisch aus dem Namen erzeugt und intern für die Zuordnung verwendet.',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Reihenfolge',
      description: 'Kleinere Zahlen erscheinen weiter links bzw. weiter oben.',
      type: 'number',
    }),
    defineField({
      name: 'isVisible',
      title: 'Sichtbar',
      type: 'boolean',
      initialValue: true,
    }),
  ],
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
  preview: {
    select: {title: 'title', sortOrder: 'sortOrder', isVisible: 'isVisible'},
    prepare: ({title, sortOrder, isVisible}) => ({
      title,
      subtitle: `${isVisible === false ? 'Ausgeblendet · ' : ''}Reihenfolge: ${sortOrder ?? 'nicht gesetzt'}`,
    }),
  },
})
