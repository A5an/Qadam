import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";
const svgToDataUri = require("mini-svg-data-uri");

const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/onborda/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'border-beam': {
  				'100%': {
  					'offset-distance': '100%'
  				}
  			},
  			gradient: {
  				to: {
  					backgroundPosition: 'var(--bg-size) 0'
  				}
  			},
  			'spin-around': {
  				'0%': {
  					transform: 'translateZ(0) rotate(0)'
  				},
  				'15%, 35%': {
  					transform: 'translateZ(0) rotate(90deg)'
  				},
  				'65%, 85%': {
  					transform: 'translateZ(0) rotate(270deg)'
  				},
  				'100%': {
  					transform: 'translateZ(0) rotate(360deg)'
  				}
  			},
  			slide: {
  				to: {
  					transform: 'translate(calc(100cqw - 100%), 0)'
  				}
  			},
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
  			},
  			heartbeat: {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.2)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			levitate: {
  				'0%': {
  					transform: 'translateY(0)'
  				},
  				'30%': {
  					transform: 'translateY(-10px)'
  				},
  				'50%': {
  					transform: 'translateY(4px)'
  				},
  				'70%': {
  					transform: 'translateY(-15px)'
  				},
  				'100%': {
  					transform: 'translateY(0)'
  				}
  			},
  			expand: {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.2)'
  				},
  				'100%': {
  					transform: 'scale(1)'
  				}
  			},
  			'expand-opacity': {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(1)'
  				},
  				'50%': {
  					opacity: '1',
  					transform: 'scale(1.3)'
  				},
  				'100%': {
  					opacity: '0',
  					transform: 'scale(1.295)'
  				}
  			},
  			spotlight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate(-72%, -62%) scale(0.5)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate(-50%,-40%) scale(1)'
  				}
  			}
  		},
  		animation: {
  			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
  			gradient: 'gradient 8s linear infinite',
  			'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
  			slide: 'slide var(--speed) ease-in-out infinite alternate',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			heartbeat: 'heartbeat 1s ease-in-out infinite',
  			levitate: 'levitate 5s ease infinite',
  			expand: 'expand 6s ease-out infinite both',
  			'expand-opacity': 'expand-opacity 6s linear infinite both',
  			spotlight: 'spotlight 2s ease .75s 1 forwards'
  		}
  	}
  },

  plugins: [
    require("tailwindcss-animate"),
    nextui(),

    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;

export default config;
