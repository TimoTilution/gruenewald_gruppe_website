import {defineField, defineType} from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Mitarbeiter',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Berufsbezeichnung', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'degree', title: 'Titel / Zusatz', type: 'string'}),
    defineField({name: 'email', title: 'E-Mail-Adresse', type: 'string'}),
    defineField({name: 'phone', title: 'Handynummer', type: 'string'}),
    defineField({name: 'company', title: 'Unternehmen', type: 'reference', to: [{type: 'company'}]}),
    defineField({name: 'department', title: 'Team-Bereich', type: 'reference', to: [{type: 'teamDepartment'}], validation: (Rule) => Rule.required()}),
    defineField({
      name: 'groupDepartmentRef',
      title: 'Team-Bereich auf der Gruppenseite',
      description: 'Optional: Überschreibt nur auf der Grünewald-Gruppenseite die automatische Zuordnung. Leer lassen, um die bisherige Zuordnung beizubehalten.',
      type: 'reference',
      to: [{type: 'groupTeamDepartment'}],
      options: {disableNew: false},
    }),
    defineField({
      name: 'groupDepartment',
      title: 'Bisheriger Gruppen-Team-Bereich',
      description: 'Technisches Übergangsfeld für bereits gespeicherte Zuordnungen.',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({name: 'photo', title: 'Foto', type: 'image', options: {hotspot: true}}),
    defineField({name: 'imageAlt', title: 'Alternativtext Foto', type: 'string'}),
    defineField({name: 'legacyImagePath', title: 'Interner alter Bildpfad', type: 'string', readOnly: true}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
})

