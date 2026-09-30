import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-30'})

const departments = [
  {id: 'geschaeftsfuehrung', title: 'Geschäftsführung', sortOrder: 10},
  {id: 'vertrieb', title: 'Vertrieb', sortOrder: 20},
  {id: 'produktion', title: 'Produktion', sortOrder: 30},
  {id: 'marketing', title: 'Marketing', sortOrder: 40},
  {id: 'zentrale-dienste', title: 'Zentrale Dienste', sortOrder: 50},
  {id: 'verwaltung', title: 'Verwaltung', sortOrder: 60},
  {id: 'fachkraefteverwaltung', title: 'Fachkräfteverwaltung', sortOrder: 70},
]

await Promise.all(
  departments.map((department) =>
    client.createIfNotExists({
      _id: `groupTeamDepartment-${department.id}`,
      _type: 'groupTeamDepartment',
      title: department.title,
      slug: {_type: 'slug', current: department.id},
      sortOrder: department.sortOrder,
      isVisible: true,
    }),
  ),
)

console.log(`${departments.length} Gruppen-Abteilungen sind vorhanden.`)
