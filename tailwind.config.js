/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#134482',
				secondary: '#3ce653b5',
			},
			fontSize: {
				'body-1': '1.6rem',
				'body-2': '1.4rem',
			},
		},
	},
	plugins: [],
};
