import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#a17e72',
  				foreground: '#FFFFFF',
  				hover: '#8c695b',
  				dark: '#5d4b44',
  				light: '#d9c5bd'
  			},
  			secondary: {
  				DEFAULT: '#D9CAB3',
  				foreground: '#5C4A39',
  				hover: '#CBB295'
  			},
  			destructive: {
  				DEFAULT: '#C03D29',
  				foreground: '#FFFFFF',
  				hover: '#A63322'
  			},
  			muted: {
  				DEFAULT: '#e2e2e2',
  				foreground: '#6B7280'
  			},
  			background: {
  				DEFAULT: '#F8F6F5',
  				muted: '#E2E2E2',
  				foreground: '#4A4A4A'
  			},
  			input: '#F3F4F6',
  			border: '#D1D5DB',
  			card: {
  				DEFAULT: '#FFFFFF',
  				muted: '#F9FAFB',
  				foreground: '#333333'
  			},
  			accent: {
  				DEFAULT: '#B29584',
  				hover: '#9C826E',
  				foreground: '#FFFFFF'
  			},
  			ring: {
  				DEFAULT: '#E2E8F0',
  				offset: '#F8FAFC'
  			},
  			disabled: '#A17E727F',
  			link: {
  				DEFAULT: '#8c695b',
  				hover: '#5d4b44'
  			},
  			white: '#FFFFFF',
  			black: '#000000',
  			success: {
  				DEFAULT: '#138636',
  				foreground: '#FFFFFF',
  				hover: '#0f6b2b',
  				dark: '#0b5020',
  				light: '#429e5e'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	borderRadius: {
  		xs: '4px',
  		sm: '8px',
  		md: '12px',
  		lg: '16px',
  		xl: '28px',
  		full: '9999px'
  	}
  },
  plugins: [],
};

export default config;
