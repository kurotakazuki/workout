import { Site } from '@src/models/sites'
import { For } from 'solid-js'

const SiteList = (props: { sites: Site[] }) => {
  return (
    <div>
      <table class="table table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>サイト名</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <For each={props.sites}>
            {(site: Site, i) => (
              <tr>
                <td>{i}</td>
                <td>{site.name}</td>
                <td>{site.url}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  )
}

export default SiteList
