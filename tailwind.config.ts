import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
