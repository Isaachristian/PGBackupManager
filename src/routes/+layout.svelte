<script lang="ts">
	import '../app.css'
	import { browser } from '$app/environment'

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
			attributeFilter: ['variant', 'size'],
			attributeOldValue: true
		})
</script>

<slot />
