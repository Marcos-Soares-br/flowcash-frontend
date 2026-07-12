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
    
    css: ['@/assets/css/index.css'],

    app: {
        head: {
            title: 'FlowCash',
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