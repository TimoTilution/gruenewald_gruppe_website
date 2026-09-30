import {defineField, defineType} from 'sanity'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Mitarbeiter',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'role', title: 'Berufsbezeichnung', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'degree', title: 'Titel / Zusatz', type: 'string'}),
    defineField({name: 'email', title: 'E-Mail-Adresse', type: 'string', validation: (Rule) => Rule.email().warning('Bitte eine gültige E-Mail-Adresse eintragen.')}),
    defineField({name: 'phone', title: 'Handynummer', type: 'string'}),
    defineField({name: 'company', title: 'Unternehmen', description: 'Technische Zuordnung zur jeweiligen Unternehmensseite.', type: 'reference', to: [{type: 'company'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'department', title: 'Team-Bereich', type: 'reference', to: [{type: 'teamDepartment'}], validation: (Rule) => Rule.required()}),
    defineField({
      name: 'gruenewaldContactPosition',
      title: 'Position im Kontaktbereich der Grünewald GmbH',
      description: 'Optional. Bestimmt, welche der beiden besonders gestalteten Kontaktkarten diese Person auf der GmbH-Seite belegt. Jede Position sollte nur einmal vergeben werden.',
      type: 'string',
      options: {
        list: [
          {title: 'Erste Ansprechperson', value: 'primary'},
          {title: 'Projektleitung vor Ort', value: 'project-lead'},
        ],
        layout: 'radio',
      },
    }),
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
    defineField({name: 'imageAlt', title: 'Alternativtext Foto', description: 'Zum Beispiel: „Max Mustermann, Projektleitung“.', type: 'string', validation: (Rule) => Rule.required().warning('Bitte einen Alternativtext ergänzen.')}),
    defineField({name: 'legacyImagePath', title: 'Interner alter Bildpfad', type: 'string', readOnly: true, hidden: true}),
    defineField({name: 'isVisible', title: 'Sichtbar', type: 'boolean', initialValue: true}),
    defineField({name: 'sortOrder', title: 'Reihenfolge', type: 'number'}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'sortOrderAsc',
      by: [
        {field: 'sortOrder', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})

