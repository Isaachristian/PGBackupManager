<script lang="ts">
	import '../app.css'
	import { browser } from '$app/environment'

	// https://github.com/shoelace-style/shoelace/discussions/1690
	if (browser)
		new MutationObserver((mutation) => {
			for (let m of mutation) {
				if (
					m.type == 'attributes' &&
					m.target.localName.startsWith('sl-') &&
					m.oldValue &&
					!m.target.getAttribute(m.attributeName)
				) {
					m.target.setAttribute(m.attributeName, m.oldValue)
				}
			}
		}).observe(document.body, {
			subtree: true,
			childList: true,
			attributeFilter: ['variant', 'size', 'name', 'slot'],
			attributeOldValue: true
		})
</script>

<div class="absolute inset-0 bg-gray-100 dark:bg-neutral-700">
	<slot />
</div>
