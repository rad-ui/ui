"use client"

import Badge from "@radui/ui/Badge"
import Button from "@radui/ui/Button"
import Heading from "@radui/ui/Heading"
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
    { label: "Carbon", active: true },
    { label: "Stone" },
    { label: "Sand" },
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
            <main className="min-w-0 border-b border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-3 sm:p-4 lg:border-b-0 lg:border-r">
                <div className="space-y-4">
                    <section className="rounded-[28px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-4">
                        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.9fr)]">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Badge variant="soft" color="orange" className="rounded-full px-3 py-1">
                                        New Arrival
                                    </Badge>
                                    <Text className="!text-[11px] uppercase tracking-[0.28em] text-slate-1000/45">
                                        Product Showcase
                                    </Text>
                                </div>

                                <div>
                                    <Heading as="h2" className="max-w-xl !text-slate-1000">
                                        Waveform One
                                    </Heading>
                                    <Text className="mt-2 max-w-2xl !text-sm text-slate-1000/68">
                                        A premium over-ear headphone page built for stronger product hierarchy, denser buying controls, and cleaner accessory merchandising.
                                    </Text>
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <div className="flex items-center gap-1.5 rounded-full border border-slate-500 bg-slate-1000/[0.03] px-3 py-1.5">
                                        <div className="flex items-center gap-0.5 text-amber-800">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <Star key={index} className="h-3.5 w-3.5 fill-current" />
                                            ))}
                                        </div>
                                        <Text className="!text-xs text-slate-1000/68">4.9 · 1,284 reviews</Text>
                                    </div>
                                    <Text className="!text-sm text-slate-1000/55">Designed for late-night listening and compact travel setups.</Text>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-[92px_minmax(0,1fr)]">
                                    <div className="order-2 grid grid-cols-3 gap-2 sm:order-1 sm:grid-cols-1">
                                        {galleryImages.map((src, index) => (
                                            <button
                                                key={src}
                                                type="button"
                                                className={`overflow-hidden rounded-[18px] border p-1 ${
                                                    index === 0
                                                        ? "border-orange-800/30 bg-gradient-to-br from-amber-900/10 to-orange-800/10"
                                                        : "border-slate-500 bg-slate-1000/[0.03]"
                                                }`}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Waveform One gallery ${index + 1}`}
                                                    className="h-20 w-full rounded-[14px] object-cover sm:h-[88px]"
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    <div className="order-1 overflow-hidden rounded-[26px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 sm:order-2">
                                        <div className="relative h-[360px] w-full bg-gradient-to-br from-slate-100 via-slate-50 to-mauve-50">
                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,theme(colors.orange.500/.18),transparent_24%),radial-gradient(circle_at_72%_80%,theme(colors.amber.400/.12),transparent_26%)]" />
                                            <img
                                                src={galleryImages[0]}
                                                alt="Waveform One hero product"
                                                className="absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen"
                                            />
                                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-[20px] border border-slate-300 bg-slate-50/60 px-3 py-2.5 text-slate-1000 backdrop-blur-md">
                                                <div>
                                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Featured Finish</Text>
                                                    <Text className="mt-1 !text-sm font-medium !text-slate-1000">Carbon Black</Text>
                                                </div>
                                                <Badge variant="soft" color="orange" className="rounded-full px-3 py-1">
                                                    Best Seller
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <aside className="rounded-[26px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-4 text-slate-1000">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Starter Bundle</Text>
                                        <Heading as="h4" className="mt-2 !text-slate-1000">$329</Heading>
                                        <Text className="mt-1 !text-sm text-slate-1000/65">Includes carrying case and analog cable.</Text>
                                    </div>
                                    <button type="button" className="rounded-full border border-slate-400 bg-slate-50/70 p-2 text-slate-1000/55 hover:bg-slate-50 hover:text-slate-1000">
                                        <Heart className="h-4 w-4" />
                                    </button>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <Text className="!text-[11px] uppercase tracking-[0.28em] text-slate-700">Choose finish</Text>
                                    <div className="grid grid-cols-3 gap-2">
                                        {finishes.map((finish) => (
                                            <button
                                                key={finish.label}
                                                type="button"
                                                className={`rounded-[18px] border px-3 py-2.5 text-sm font-medium ${
                                                    finish.active
                                                        ? "border-orange-800/30 bg-gradient-to-r from-amber-900/18 to-orange-800/20 text-slate-1000"
                                                        : "border-slate-400 bg-slate-50/60 text-slate-1000/72 hover:bg-slate-50"
                                                }`}
                                            >
                                                {finish.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 rounded-[20px] border border-slate-400 bg-slate-50/70 p-3">
                                    <div className="flex items-center justify-between gap-3">
                                        <Text className="!text-sm font-medium !text-slate-1000">Delivery</Text>
                                        <Text className="!text-[11px] text-green-700">In stock</Text>
                                    </div>
                                    <Text className="mt-1 !text-[11px] text-slate-1000/58">Arrives between Apr 10 and Apr 12 with free express shipping.</Text>
                                </div>

                                <div className="mt-4 flex gap-2.5">
                                    <Button variant="solid" className="flex-1 rounded-full border-0 bg-gradient-to-r from-amber-900 to-orange-800 px-4 py-2.5 !text-slate-1000">
                                        <span className="flex items-center justify-center gap-2">
                                            <ShoppingBag className="h-4 w-4" />
                                            Add to Cart
                                        </span>
                                    </Button>
                                    <Button variant="outline" className="rounded-full border-slate-400 bg-slate-50 px-4 py-2.5 text-slate-1000 hover:bg-slate-100">
                                        Buy Now
                                    </Button>
                                </div>

                                <div className="mt-4 space-y-2.5">
                                    {highlights.map((item) => {
                                        const Icon = item.icon

                                        return (
                                            <div key={item.label} className="flex items-center gap-3 rounded-[18px] border border-slate-400 bg-slate-50/70 px-3 py-2.5">
                                                <div className="rounded-[14px] border border-slate-400 bg-slate-50 p-2 text-orange-800">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <Text className="!text-sm text-slate-1000/78">{item.label}</Text>
                                            </div>
                                        )
                                    })}
                                </div>
                            </aside>
                        </div>
                    </section>

                    <div className="grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_320px]">
                        <section className="rounded-[24px] border border-slate-500 bg-gradient-to-br from-slate-50 via-mauve-50 to-slate-100 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Why it lands</Text>
                                    <Heading as="h5" className="mt-2 !text-slate-1000">Premium details, not filler</Heading>
                                    <Text className="mt-1 max-w-2xl !text-sm text-slate-1000/65">
                                        The page keeps the buying path obvious while still making room for texture, trust, and supporting information.
                                    </Text>
                                </div>
                                <Badge variant="outline" className="rounded-full border-slate-500 bg-slate-1000/[0.03] px-3 py-1 text-slate-1000/62">
                                    3 modules
                                </Badge>
                            </div>

                            <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                                {[
                                    "Lighter visual chrome around supporting controls.",
                                    "Dense product gallery with immediate focus state.",
                                    "Purchase box stays compact without feeling cramped.",
                                ].map((item) => (
                                    <div key={item} className="rounded-[18px] border border-slate-500 bg-slate-1000/[0.03] px-3 py-3">
                                        <div className="flex items-start gap-2">
                                            <span className="mt-1 h-2 w-2 rounded-full bg-orange-800" />
                                            <Text className="!text-[11px] text-slate-1000/68">{item}</Text>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                                <div className="rounded-[22px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-4 text-slate-1000">
                                    <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Included in the box</Text>
                                    <div className="mt-3 space-y-2">
                                        {includedItems.map((item) => (
                                            <div key={item} className="flex items-center gap-2.5">
                                                <div className="rounded-full bg-orange-800/15 p-1 text-orange-800">
                                                    <Check className="h-3.5 w-3.5" />
                                                </div>
                                                <Text className="!text-sm text-slate-1000/75">{item}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-[22px] border border-slate-500 bg-slate-1000/[0.03] px-4 py-4">
                                    <Text className="!text-[10px] uppercase tracking-[0.28em] text-slate-1000/45">Core specs</Text>
                                    <div className="mt-3 space-y-2.5">
                                        {specRows.map(([label, value]) => (
                                            <div key={label} className="flex items-center justify-between gap-3 border-b border-slate-500 pb-2 last:border-b-0 last:pb-0">
                                                <Text className="!text-[11px] text-slate-1000/55">{label}</Text>
                                                <Text className="!text-sm font-medium !text-slate-1000">{value}</Text>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <aside className="rounded-[24px] border border-slate-500 bg-gradient-to-br from-slate-100 via-mauve-100 to-slate-50 p-4">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Also works with</Text>
                                    <Heading as="h5" className="mt-2 !text-slate-1000">Recommended add-ons</Heading>
                                </div>
                                <ChevronRight className="h-4 w-4 text-slate-1000/45" />
                            </div>

                            <div className="mt-4 space-y-2.5">
                                {relatedProducts.map((item) => (
                                    <div key={item.name} className="overflow-hidden rounded-[20px] border border-slate-500 bg-slate-50">
                                        <img src={item.image} alt={item.name} className="h-28 w-full object-cover" />
                                        <div className="p-3">
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <Text className="!text-sm font-medium !text-slate-1000">{item.name}</Text>
                                                    <Text className="mt-1 !text-[11px] text-slate-1000/58">{item.tag}</Text>
                                                </div>
                                                <Text className="!text-sm font-semibold !text-slate-1000">{item.price}</Text>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>
                </div>
            </main>

            <aside className="bg-gradient-to-b from-slate-200 via-mauve-100 to-slate-100 p-3 sm:p-4">
                <div className="space-y-3">
                    <section className="rounded-[24px] border border-slate-500 bg-slate-50 p-4">
                        <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Merchandising Notes</Text>
                        <Heading as="h5" className="mt-2 !text-slate-1000">Designed for conversion</Heading>
                        <Text className="mt-2 !text-sm text-slate-1000/65">
                            The right rail acts like a compact merchant brief: trust, shipping, add-ons, and why this page structure sells.
                        </Text>
                    </section>

                    <section className="rounded-[24px] border border-slate-400 bg-gradient-to-br from-slate-100 to-slate-50 px-4 py-4 text-slate-1000">
                        <Text className="!text-[10px] uppercase tracking-[0.3em] text-slate-1000/45">Checkout pulse</Text>
                        <div className="mt-3 rounded-[18px] border border-slate-400 bg-slate-50/70 p-3">
                            <div className="flex items-center justify-between gap-2">
                                <Text className="!text-sm font-medium !text-slate-1000">Cart confidence</Text>
                                <Text className="!text-[11px] text-green-700">High</Text>
                            </div>
                            <div className="mt-3 flex h-2 gap-1 rounded-full bg-slate-1000/[0.08] p-0.5">
                                <span className="h-full w-[78%] rounded-full bg-gradient-to-r from-amber-900 to-orange-800" />
                                <span className="h-full flex-1 rounded-full bg-slate-1000/[0.08]" />
                            </div>
                        </div>
                        <div className="mt-3 space-y-2">
                            {[
                                "Prominent pricing and stock state above the fold.",
                                "Accessory recommendations are supportive, not distracting.",
                                "Gallery and specs stay legible in compact layouts.",
                            ].map((item) => (
                                <div key={item} className="flex items-start gap-2 rounded-[18px] border border-slate-400 bg-slate-50/70 px-3 py-2.5">
                                    <span className="mt-1 h-2 w-2 rounded-full bg-orange-800" />
                                    <Text className="!text-[11px] text-slate-1000/62">{item}</Text>
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
