import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {publishWebsiteAction} from './actions/publishWebsiteAction'
import {structure} from './structure'

export default defineConfig({
  name: 'gruenewald_website_redaktion',
  title: 'Gruenewald Gruppe Redaktion',
  projectId: 'qnxqpqp1',
  dataset: 'production',
  plugins: [structureTool({structure})],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (previousActions, context) =>
      context.schemaType === 'siteDeployment'
        ? [publishWebsiteAction]
        : previousActions,
  },
})


