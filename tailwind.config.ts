import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: ["class", "class"],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#299D91',
					dark: ',',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: '#E4E7EB',
					dark: ',',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				'default-black': '#191919',
				'special-2': {
					DEFAULT: '#FFFFFF70'
				},
				'special-3': {
					DEFAULT: '#FFFFFF08'
				},
				'gray-1': {
					DEFAULT: '#666666'
				},
				'gray-2': {
					DEFAULT: '#878787'
				},
				'gray-3': {
					DEFAULT: '#9F9F9F'
				},
				'gray-4': {
					DEFAULT: '#D1D1D1'
				},
				'gray-5': {
					DEFAULT: '#E8E8E8'
				},
				'gray-6': {
					DEFAULT: '#F3F3F3'
				},
				'gray-7': {
					DEFAULT: "#999DA3",
				},
				'primary-color': {
					DEFAULT: '#191D23',
					dark: '#D1D1D1'
				},
				'secondary-color': {
					DEFAULT: '#525256',
					dark: '#F3F3F3'
				},
				'third-color': {
					DEFAULT: '#4B5768'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
