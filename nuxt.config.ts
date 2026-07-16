// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',

    modules: [
        '@nuxtjs/tailwindcss', 
        '@nuxt/icon', 
        '@pinia/nuxt',
    ],
    
    devtools: { enabled: true },
    
    typescript: { strict: true },

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
        }
    },
    
    css: ['@/assets/css/index.css'],

    app: {
        head: {
            title: 'FlowCash',
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/flowcash-favicon.png' },
            ],
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Registre suas finanças e controle seu dinheiro de forma fácil.' },
                { name: 'keywords', content: 'FlowCash Sistema Financeiro' },
                { name: 'author', content: 'Marcos Soares' }
            ]
        },

    },
});