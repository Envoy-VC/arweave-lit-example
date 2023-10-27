import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#b23eff',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
