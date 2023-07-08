/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("daisyui"),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/typography'),
		function ({ addComponents, theme }) {
			addComponents({
				'.github-icon img': {
					padding: theme('spacing.2'),
				},
			});
		},
	],
}
