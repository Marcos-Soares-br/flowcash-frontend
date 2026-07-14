const icons: Record<string, string> = {
    alimentacao: "lucide:utensils",
    celular: "lucide:smartphone",
    credito: "lucide:credit-card",
    educacao: "lucide:graduation-cap",
    freelance: "lucide:banknote",
    idioma: "lucide:languages",
    investimentos: "lucide:trending-up",
    entertenimento: "lucide:clapperboard",
    metas: "lucide:target",
    motos: "lucide:motorbike",
    moradia: "lucide:home",
    presente: "lucide:gift",
    salario: "lucide:wallet",
    saude: "lucide:cross",
    mercado: "lucide:shopping-cart",
    transporte: "lucide:car-front",
    viagem: "lucide:plane",
    videogame: "lucide:gamepad-2",
    outros: "lucide:dollar-sign",
};

export const getIcon = (category: string) => {
    return icons[category] || "lucide:dollar-sign";
};

export const getAllIcons = () => {
    return icons;
};