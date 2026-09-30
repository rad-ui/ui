"use client"

import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"
import Toggle from "@radui/ui/Toggle"
import ToggleGroup from "@radui/ui/ToggleGroup"
import Text from "@radui/ui/Text"
import {
    Check,
    ChevronRight,
    Heart,
    ShieldCheck,
    ShoppingBag,
    Sparkles,
    Star,
    Truck,
} from "lucide-react"

const galleryImages = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1200&q=80",
]

const finishes = [
    { value: "carbon", label: "Carbon" },
    { value: "stone", label: "Stone" },
    { value: "sand", label: "Sand" },
]

const highlights = [
    { label: "Adaptive noise control", icon: Sparkles },
    { label: "40-hour battery", icon: ShieldCheck },
    { label: "Free 2-day shipping", icon: Truck },
]

const specRows = [
    ["Drivers", "40 mm custom-tuned"],
    ["Weight", "268 g"],
    ["Connectivity", "Bluetooth 5.3 / USB-C"],
    ["Playback", "40 hrs wireless"],
]

const includedItems = [
    "Travel case",
    "Braided USB-C cable",
    "3.5 mm analog cable",
    "Quick start card",
]

const relatedProducts = [
    {
        name: "Wave Mini",
        price: "$149",
        tag: "Portable",
        image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Studio Dock",
        price: "$79",
        tag: "Accessory",
        image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
    },
]

const ProductPageDemo = () => {
    return (
        <div className="grid min-h-[780px] lg:grid-cols-[minmax(0,1.15fr)_360px]">
            <main className="min-w-0 border-b border-gray-600 bg-gray-50 p-3 sm:p-4 lg:border-b-0 lg:border-r">
                <div className="space-y-4">
                    <section className="rounded-2xl border border-gray-600 bg-gray-50 p-4">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.9fr)]">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Badge variant="soft" color="green" className="rounded-full px-3 py-1">
                                        New Arrival
                                    </Badge>
                                    <Text className="!text-[11px] uppercase tracking-[0.28em] text-gray-1000/60">
                                        Product Showcase
                                    </Text>
                                </div>

                                <div>
                                    <Heading as="h2" className="max-w-xl !text-gray-1000">
                                        Waveform One
                                    </Heading>
                                    <Text className="mt-2 max-w-2xl !text-sm text-gray-1000/70">
                                        A premium over-ear headphone page built for stronger product hierarchy, denser buying controls, and cleaner accessory merchandising.
                                    </Text>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5 rounded-full border border-gray-600 bg-gray-1000/[0.03] px-3 py-1.5">
                                        <div className="flex items-center gap-0.5 text-green-800">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <Star key={index} className="h-3.5 w-3.5 fill-current" />
                                            ))}
                                        </div>
                                        <Text className="!text-xs text-gray-1000/70">4.9 · 1,284 reviews</Text>
                                    </div>
                                    <Text className="!text-sm text-gray-1000/60">Designed for late-night listening and compact travel setups.</Text>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-[92px_minmax(0,1fr)]">
                                    <div className="order-2 grid grid-cols-3 gap-2 sm:order-1 sm:grid-cols-1">
                                        {galleryImages.map((src, index) => (
                                            <button
                                                key={src}
                                                type="button"
                                                className={`overflow-hidden rounded-xl border p-1 ${
                                                    index === 0
                                                        ? "border-green-800/30 bg-gradient-to-br from-green-900/10 to-green-800/10"
                                                        : "border-gray-600 bg-gray-1000/[0.03]"
                                                }`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Waveform One gallery ${index + 1}`}
                                                    className="h-20 w-full rounded-lg object-cover sm:h-[88px]"
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    <div className="order-1 overflow-hidden rounded-2xl border border-gray-600 bg-gray-100 sm:order-2">
                                        <div className="relative h-[360px] w-full bg-gray-100">
                                            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
                                            <div className="pointer-events-none absolute -bottom-16 -right-12 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />
                                            <img
                                                src={galleryImages[0]}
                                                alt="Waveform One hero product"
                                                className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen"
                                            />
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-gray-600 bg-gray-50/60 px-3 py-2.5 text-gray-1000 backdrop-blur-md">
                                                <div>
                                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">Featured Finish</Text>
                                                    <Text className="mt-1 !text-sm font-medium !text-gray-1000">Carbon Black</Text>
                                                </div>
                                                <Badge variant="soft" color="green" className="rounded-full px-3 py-1">
                                                    Best Seller
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <aside className="rounded-2xl border border-gray-600 bg-gray-100 px-4 py-4 text-gray-1000">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <Text className="!text-[10px] uppercase tracking-[0.28em] text-gray-1000/60">Starter Bundle</Text>
                                        <Heading as="h4" className="mt-2 !text-gray-1000">$329</Heading>
                                        <Text className="mt-1 !text-sm text-gray-1000/70">Includes carrying case and analog cable.</Text>
                                    </div>
                                    <Toggle
                                        color="green"
                                        aria-label="Save Starter Bundle to wishlist"
                                        className="!rounded-full"
                                    >
                                        <Heart className="h-4 w-4" />
                                    </Toggle>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <Text className="!text-[11px] uppercase tracking-[0.28em] text-gray-1000/60">Choose finish</Text>
                                    <ToggleGroup.Root
                                        type="single"
                                        defaultValue="carbon"
                                        aria-label="Choose finish"
                                        className="w-full"
                                    >
                                        {finishes.map((finish) => (
                                            <ToggleGroup.Item
                                                key={finish.value}
                                                value={finish.value}
                                                aria-label={finish.label}
                                                className="!text-sm"
                                            >
                                                {finish.label}
                                            </ToggleGroup.Item>
                                        ))}
                                    </ToggleGroup.Root>
                                </div>

                                <div className="mt-4 rounded-xl border border-gray-600 bg-gray-50/70 p-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <Text className="!text-sm font-medium !text-gray-1000">Delivery</Text>
                                        <Text className="!text-[11px] text-green-700">In stock</Text>
                                    </div>
                                    <Text className="mt-1 !text-[11px] text-gray-1000/60">Arrives between Apr 10 and Apr 12 with free express shipping.</Text>
                                </div>

                                <div className="mt-4 flex gap-2.5">
                                    <Button variant="solid" className="flex-1 rounded-full border-0 !bg-gray-1000 px-4 py-2.5 !text-gray-50">
                                        <span className="flex items-center justify-center gap-2">
                                            <ShoppingBag className="h-4 w-4" />
                                            Add to Cart
                                        </span>
                                    </Button>
                                    <Button variant="outline" className="rounded-full border-gray-600 bg-gray-50 px-4 py-2.5 text-gray-1000 hover:bg-gray-100">
                                        Buy Now
                                    </Button>
                                </div>

                                <div className="mt-4 space-y-2.5">
                                    {highlights.map((item) => {
                                        const Icon = item.icon

                                        return (
                                            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-gray-600 bg-gray-50/70 px-3 py-2.5">
                                                <div className="rounded-lg border border-gray-600 bg-gray-50 p-2 text-green-800">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <Text className="!text-sm text-gray-1000/80">{item.label}</Text>
                                            </div>
                                        )
                                    })}
                                </div>
                            </aside>
                        </div>
                    </section>

                    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_320px]">
                        <section className="rounded-2xl border border-gray-600 bg-gray-50 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">Why it lands</Text>
                                    <Heading as="h5" className="mt-2 !text-gray-1000">Premium details, not filler</Heading>
                                    <Text className="mt-1 max-w-2xl !text-sm text-gray-1000/70">
                                        The page keeps the buying path obvious while still making room for texture, trust, and supporting information.
                                    </Text>
                                </div>
                                <Badge variant="outline" className="rounded-full border-gray-600 bg-gray-1000/[0.03] px-3 py-1 text-gray-1000/60">
                                    3 modules
                                </Badge>
                            </div>

                            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                                {[
                                    "Lighter visual chrome around supporting controls.",
                                    "Dense product gallery with immediate focus state.",
                                    "Purchase box stays compact without feeling cramped.",
                                ].map((item) => (
                                    <div key={item} className="rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-3 py-3">
                                        <div className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-green-800" />
                                            <Text className="!text-[11px] text-gray-1000/70">{item}</Text>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                                <div className="rounded-xl border border-gray-600 bg-gray-100 px-4 py-4 text-gray-1000">
                                    <Text className="!text-[10px] uppercase tracking-[0.28em] text-gray-1000/60">Included in the box</Text>
                                    <div className="mt-3 space-y-2">
                                        {includedItems.map((item) => (
                                            <div key={item} className="flex items-center gap-2.5">
                                                <div className="rounded-full bg-green-800/20 p-1 text-green-800">
                                                    <Check className="h-3.5 w-3.5" />
                                                </div>
                                                <Text className="!text-sm text-gray-1000/75">{item}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray-600 bg-gray-1000/[0.03] px-4 py-4">
                                    <Text className="!text-[10px] uppercase tracking-[0.28em] text-gray-1000/60">Core specs</Text>
                                    <div className="mt-3 space-y-2.5">
                                        {specRows.map(([label, value]) => (
                                            <div key={label} className="flex items-center justify-between gap-3 border-b border-gray-600 pb-2 last:border-b-0 last:pb-0">
                                                <Text className="!text-[11px] text-gray-1000/60">{label}</Text>
                                                <Text className="!text-sm font-medium !text-gray-1000">{value}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="rounded-2xl border border-gray-600 bg-gray-100 p-4">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">Also works with</Text>
                                    <Heading as="h5" className="mt-2 !text-gray-1000">Recommended add-ons</Heading>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-1000/60" />
                            </div>

                            <div className="mt-4 space-y-2.5">
                                {relatedProducts.map((item) => (
                                    <div key={item.name} className="overflow-hidden rounded-xl border border-gray-600 bg-gray-50">
                                        <img src={item.image} alt={item.name} className="h-28 w-full object-cover" />
                                        <div className="p-3">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <Text className="!text-sm font-medium !text-gray-1000">{item.name}</Text>
                                                    <Text className="mt-1 !text-[11px] text-gray-1000/60">{item.tag}</Text>
                                                </div>
                                                <Text className="!text-sm font-semibold !text-gray-1000">{item.price}</Text>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <aside className="bg-gray-200 p-3 sm:p-4">
                <div className="space-y-3">
                    <section className="rounded-2xl border border-gray-600 bg-gray-50 p-4">
                        <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">Merchandising Notes</Text>
                        <Heading as="h5" className="mt-2 !text-gray-1000">Designed for conversion</Heading>
                        <Text className="mt-2 !text-sm text-gray-1000/70">
                            The right rail acts like a compact merchant brief: trust, shipping, add-ons, and why this page structure sells.
                        </Text>
                    </section>

                    <section className="rounded-2xl border border-gray-600 bg-gray-100 px-4 py-4 text-gray-1000">
                        <Text className="!text-[10px] uppercase tracking-[0.3em] text-gray-1000/60">Checkout pulse</Text>
                        <div className="mt-3 rounded-xl border border-gray-600 bg-gray-50/70 p-3">
                            <div className="flex items-center justify-between gap-2">
                                <Text className="!text-sm font-medium !text-gray-1000">Cart confidence</Text>
                                <Text className="!text-[11px] text-green-700">High</Text>
                            </div>
                            <div className="mt-3 flex h-2 gap-1 rounded-full bg-gray-1000/[0.08] p-0.5">
                                <span className="h-full w-[78%] rounded-full bg-gray-1000" />
                                <span className="h-full flex-1 rounded-full bg-gray-1000/[0.08]" />
                            </div>
                        </div>
                        <div className="mt-3 space-y-2">
                            {[
                                "Prominent pricing and stock state above the fold.",
                                "Accessory recommendations are supportive, not distracting.",
                                "Gallery and specs stay legible in compact layouts.",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-2 rounded-xl border border-gray-600 bg-gray-50/70 px-3 py-2.5">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-green-800" />
                                    <Text className="!text-[11px] text-gray-1000/60">{item}</Text>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </aside>
        </div>
    )
}

export default ProductPageDemo
