import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'hero-bg': "url('../public/hero_bg.jpeg')",
          'second-bg': "url('../public/second.jpeg')",
          'third-bg' : "url('../public/third_bg.jpeg')",
          'four-bg' : "url('../public/four_bg.jpeg')",
          'shop-one-bg' : "url('../public/shop_one_bg.png')",
          'shop-sec-bg' : "url('../public/shop_sec_bg.png')",
          'shop-third-bg' : "url('../public/shop_third_bg.png')",
          'shop-detail-one-bg' : "url('../public/shop_detail_one_bg.jpeg')",
          'shop-detail-two-bg' : "url('../public/shop_detail_two_bg.jpeg')",
          'shop-detail-three-bg' : "url('../public/shop_detail_three_bg.jpeg')",
          'shop-detail-four-bg' : "url('../public/shop_detail_four_bg.jpeg')",
          "shop-detail-gradient" : "linear-gradient(90deg, #B79891 0%, #94716B 100%)",
          'shop-detail-desgin-bg' : "url('../public/shop_detail_desgin_bg.png')",
          'shop-detail-desgin-gradient' : "linear-gradient(90deg, #72C6EF 0%, #004E8F 100%)"

      },
      colors: {
        "gray" : "#272522",
        "black-50" : "rgb(123 123 123)",
        "grey" : "#676668",
        "checkout-bg" : "#FAFAFA",
        "divider-bg": "#DFDFDF",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#DC6044",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config