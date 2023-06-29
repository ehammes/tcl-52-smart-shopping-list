/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			display: ['Montserrat', 'sans-serif'],
		},
		backgroundSize: {
			50: '50%',
		},
		extend: {
			colors: {
				green: {
					primary: '#299740',
					secondary: '#29c540',
				},
				orange: {
					primary: '#FF7F00',
				},
			},
			listStyleImage: {
				checkmark: 'url("img/token_checkmark.png")',
			},
		},
		plugins: [],
	},
};
