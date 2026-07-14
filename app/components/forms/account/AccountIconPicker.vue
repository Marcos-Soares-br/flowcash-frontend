<script setup lang="ts">
    // @ts-ignore
    import { SvgBanco } from "@edusites/bancos-brasil";

    const emit = defineEmits(['update:selected']);

    const bankList = [
        'agibank',
        'bancodobrasil', 'bmg', 'bradesco', 'bs2', 'btg', 'bv',
        'c6', 'caixa', 'cora',
        'digio',
        'infinitypay', 'inter', 'itau',
        'mercadopago',
        'neon', 'next', 'ngcash', 'nomad', 'nubank',
        'original',
        'pagbank', 'pan', 'paypal', 'picpay',
        'safra', 'santander', 'sicoob', 'sicredi',
        'ton'
    ]
</script>

<template>
    <div 
        style="z-index: 99999;"
        class="absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 bg-card p-6 w-full max-w-2xl h-full md:h-2/3 flex flex-wrap gap-4 justify- items-center"
    >   
        <div 
            class="bg-primary flex rounded-full cursor-pointer hover:scale-110 transition" style="width: 50px; height: 50px"
            @click="emit('update:selected', 'wallet')"
        >
            <Icon name="lucide:wallet" class="w-10 h-10 text-background m-auto" />
        </div>

        <SvgBanco 
            v-for="bank in bankList" :key="bank" :nome="bank " formato="circulo" tamanho="50" 
            class="cursor-pointer hover:scale-110 transition"
            @click="emit('update:selected', bank)"
        />
    </div>
</template>