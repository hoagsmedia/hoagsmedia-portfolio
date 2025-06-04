import { browser } from '$app/environment';

// Theme store using Svelte 5 runes
export function createThemeStore() {
	let isDark = $state(false);

	// Initialize theme from localStorage or system preference
	if (browser) {
		const saved = localStorage.getItem('theme');
		if (saved) {
			isDark = saved === 'dark';
		} else {
			// Check system preference
			isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		updateDocumentClass();
	}

	function toggle() {
		isDark = !isDark;
		if (browser) {
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
			updateDocumentClass();
		}
	}

	function updateDocumentClass() {
		if (browser) {
			if (isDark) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}

	return {
		get isDark() {
			return isDark;
		},
		toggle
	};
}

// Export singleton instance
export const themeStore = createThemeStore();
