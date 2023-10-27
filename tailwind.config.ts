import { type Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#923eff',
			},
		},
	},
	plugins: [],
	darkMode: 'class',
} satisfies Config;
