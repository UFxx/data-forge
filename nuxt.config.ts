import { fileURLToPath } from 'node:url';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },

	modules:
	[
		'@regle/nuxt',
		'@pinia/nuxt',
		'@vueuse/nuxt'
	],

	css: ['@/assets/styles/index.scss'],

	runtimeConfig:
	{
		JWT_SECRET  : process.env.NUXT_JWT_SECRET,
		JWT_EXPIRES : process.env.NUXT_JWT_EXPIRES,

		public:
		{
			BASE_URL : process.env.NUXT_BASE_URL,
			API_URL  : process.env.NUXT_API_URL
		}
	},

	vite:
	{
		server: { allowedHosts: true },
		css:
		{
			preprocessorOptions:
			{
				scss:
				{
					silenceDeprecations : ['import', 'global-builtin', 'legacy-js-api'],
					additionalData      : `
						@use "@/assets/styles/base/_variables.scss" as *;
						@use "@/assets/styles/base/_mixins.scss" as *;
						@use "@/assets/styles/base/_typography.scss" as *;
						@use "@/assets/styles/base/_transitions.scss" as *;
						@use "@/assets/styles/base/_fonts.scss";
					`,
				},
			},
		},
	},

	alias: { '#config': fileURLToPath(new URL('./config', import.meta.url)) },

	nitro:
	{
		alias: { '#db': fileURLToPath(new URL('./server/db', import.meta.url)) }
	}
})
