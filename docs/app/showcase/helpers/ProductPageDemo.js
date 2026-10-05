"use client"

import { useState } from "react"

import Accordion from "@radui/ui/Accordion"
import Badge from "@radui/ui/Badge"
import Breadcrumb from "@radui/ui/Breadcrumb"
import Button from "@radui/ui/Button"
import NumberField from "@radui/ui/NumberField"
import Separator from "@radui/ui/Separator"
import Toggle from "@radui/ui/Toggle"
import ToggleGroup from "@radui/ui/ToggleGroup"
import { Check, ChevronDown, Heart, RotateCcw, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react"

const finishes = [
    { value: "carbon", label: "Carbon", swatch: "bg-gray-1000", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" },
    { value: "stone", label: "Stone", swatch: "bg-gray-500", image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80" },
    { value: "midnight", label: "Midnight", swatch: "bg-indigo-900", image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=1200&q=80" },
]

const addOns = [
    { id: "case", name: "Travel case", price: 39, image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=400&q=80" },
    { id: "stand", name: "Walnut stand", price: 59, image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=400&q=80" },
]

const details = [
    {
        id: "features",
        title: "Features",
        body: (
            <ul className="space-y-2">
                {["Adaptive noise cancelling that tunes itself 200× per second", "40 hours of playback, 10 minutes of charge for 5 hours", "Multipoint pairing with two devices at once", "Memory-foam ear cushions in vegan leather"].map((item) => (
                    <li key={item} className="flex gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-green-900" />{item}</li>
                ))}
            </ul>
        ),
    },
    {
        id: "specs",
        title: "Specifications",
        body: (
            <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2">
                {[["Drivers", "40 mm custom dynamic"], ["Frequency", "4 Hz – 40 kHz"], ["Weight", "268 g"], ["Connectivity", "Bluetooth 5.3, USB-C audio"]].map(([term, value]) => (
                    <div key={term} className="contents"><dt className="text-gray-900">{term}</dt><dd>{value}</dd></div>
                ))}
            </dl>
        ),
    },
    {
        id: "shipping",
        title: "Shipping & returns",
        body: <p>Free 2-day shipping on orders over $100. Return within 30 days for a full refund — we cover the label.</p>,
    },
]

const money = (value) => `$${value.toLocaleString("en-US")}`

const ProductPageDemo = () => {
    const [finish, setFinish] = useState("carbon")
    const [quantity, setQuantity] = useState(1)
    const [saved, setSaved] = useState(false)
    const [bag, setBag] = useState([])
    const [justAdded, setJustAdded] = useState(false)

    const active = finishes.find((item) => item.value === finish)
    const bagCount = bag.reduce((sum, item) => sum + item.qty, 0)
    const bagTotal = bag.reduce((sum, item) => sum + item.qty * item.price, 0)

    const addToBag = (item) => {
        setBag((current) => {
            const existing = current.find((entry) => entry.id === item.id)
            if (existing) return current.map((entry) => (entry.id === item.id ? { ...entry, qty: entry.qty + item.qty } : entry))
            return [...current, item]
        })
    }

    const addHeadphones = () => {
        addToBag({ id: `waveform-${finish}`, name: `Waveform One — ${active.label}`, price: 329, qty: Number(quantity) || 1 })
        setJustAdded(true)
        setTimeout(() => setJustAdded(false), 1800)
    }

    return (
        <div className="bg-gray-50 text-gray-1000">
            {/* Store bar */}
            <div className="flex items-center justify-between border-b border-gray-400 px-5 py-3 sm:px-8">
                <span className="text-[15px] font-semibold tracking-tight">Waveform</span>
                <div className="flex items-center gap-2 text-sm" role="status" aria-live="polite">
                    {bagCount ? <span className="hidden text-gray-900 sm:inline">{money(bagTotal)}</span> : null}
                    <span className="relative inline-flex items-center gap-1.5 rounded-md px-2 py-1">
                        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Bag:</span>
                        <Badge size="small">{bagCount}</Badge>
                        <span className="sr-only">items</span>
                    </span>
                </div>
            </div>

            <div className="px-5 py-6 sm:px-8 sm:py-8">
                <Breadcrumb.Root>
                    <Breadcrumb.List>
                        <Breadcrumb.Item><Breadcrumb.Link href="#">Shop</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item>
                        <Breadcrumb.Item><Breadcrumb.Link href="#">Audio</Breadcrumb.Link><Breadcrumb.Separator /></Breadcrumb.Item>
                        <Breadcrumb.Item><Breadcrumb.Page>Waveform One</Breadcrumb.Page></Breadcrumb.Item>
                    </Breadcrumb.List>
                </Breadcrumb.Root>

                <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
                    {/* Gallery */}
                    <div className="min-w-0">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200">
                            <img src={active.image} alt={`Waveform One in ${active.label}`} className="h-full w-full object-cover" />
                            <span className="absolute left-4 top-4"><Badge color="green">New</Badge></span>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-3">
                            {finishes.map((item) => (
                                <button
                                    key={item.value}
                                    type="button"
                                    aria-label={`Show ${item.label}`}
                                    aria-pressed={finish === item.value}
                                    onClick={() => setFinish(item.value)}
                                    className={`aspect-[4/3] overflow-hidden rounded-lg ring-offset-2 ring-offset-gray-50 transition ${
                                        finish === item.value ? "ring-2 ring-gray-1000" : "opacity-70 hover:opacity-100"
                                    }`}
                                >
                                    <img src={item.image} alt="" className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Buy box */}
                    <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-semibold tracking-tight">Waveform One</h2>
                                <p className="mt-1 text-[15px] text-gray-950">Wireless noise-cancelling headphones</p>
                            </div>
                            <Toggle
                                pressed={saved}
                                onPressedChange={setSaved}
                                aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
                                className="shrink-0 rounded-full!"
                            >
                                <Heart className={`h-4 w-4 ${saved ? "fill-crimson-900 text-crimson-900" : ""}`} />
                            </Toggle>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-sm">
                            <span className="flex" aria-label="Rated 4.8 out of 5">
                                {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-amber-800 text-amber-800" aria-hidden="true" />)}
                            </span>
                            <span className="font-medium">4.8</span>
                            <span className="text-gray-900">· 1,284 reviews</span>
                        </div>

                        <p className="mt-5 text-3xl font-semibold tabular-nums">{money(329)}</p>

                        <div className="mt-6">
                            <p className="mb-2.5 text-sm"><span className="font-medium">Finish</span> <span className="text-gray-900">— {active.label}</span></p>
                            <ToggleGroup.Root
                                type="single"
                                value={[finish]}
                                onValueChange={(next) => {
                                    const value = Array.isArray(next) ? next[0] : next
                                    if (value) setFinish(value)
                                }}
                                aria-label="Finish"
                            >
                                {finishes.map((item) => (
                                    <ToggleGroup.Item key={item.value} value={item.value} className="gap-2">
                                        <span className={`h-3 w-3 shrink-0 rounded-full border border-gray-600 ${item.swatch}`} aria-hidden="true" />
                                        {item.label}
                                    </ToggleGroup.Item>
                                ))}
                            </ToggleGroup.Root>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <NumberField.Root value={quantity} onValueChange={setQuantity} min={1} max={5} step={1}>
                                <NumberField.Decrement aria-label="Decrease quantity">−</NumberField.Decrement>
                                <NumberField.Input aria-label="Quantity" className="w-12! text-center" />
                                <NumberField.Increment aria-label="Increase quantity">+</NumberField.Increment>
                            </NumberField.Root>
                            <Button size="large" className="flex-1 justify-center" onClick={addHeadphones}>
                                {justAdded ? <><Check className="h-4 w-4" /> Added to bag</> : <><ShoppingBag className="h-4 w-4" /> Add to bag</>}
                            </Button>
                        </div>

                        <ul className="mt-6 space-y-2.5 text-sm text-gray-950">
                            <li className="flex items-center gap-2.5"><Truck className="h-4 w-4 text-gray-900" /> Free 2-day shipping — arrives by Thursday</li>
                            <li className="flex items-center gap-2.5"><RotateCcw className="h-4 w-4 text-gray-900" /> 30-day returns, no questions asked</li>
                            <li className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4 text-gray-900" /> 2-year warranty included</li>
                        </ul>

                        <Separator className="mt-6" />

                        <Accordion.Root collapsible defaultValue={["features"]}>
                            {details.map((item) => (
                                <Accordion.Item key={item.id} value={item.id}>
                                    <Accordion.Header>
                                        <Accordion.Trigger>
                                            <span>{item.title}</span>
                                            <ChevronDown className="rad-ui-accordion-chevron" aria-hidden="true" />
                                        </Accordion.Trigger>
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <div className="text-sm leading-relaxed text-gray-1000">{item.body}</div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            ))}
                        </Accordion.Root>
                    </div>
                </div>

                {/* Add-ons */}
                <section aria-labelledby="pairs-heading" className="mt-12">
                    <h3 id="pairs-heading" className="text-lg font-semibold tracking-tight">Pairs well with</h3>
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                        {addOns.map((item) => {
                            const inBag = bag.some((entry) => entry.id === item.id)
                            return (
                                <li key={item.id} className="flex items-center gap-4 rounded-xl border border-gray-400 p-3">
                                    <img src={item.image} alt="" className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-sm tabular-nums text-gray-900">{money(item.price)}</p>
                                    </div>
                                    <Button
                                        variant={inBag ? "soft" : "outline"}
                                        size="small"
                                        onClick={() => addToBag({ id: item.id, name: item.name, price: item.price, qty: 1 })}
                                    >
                                        {inBag ? <><Check className="h-3.5 w-3.5" /> Added</> : "Add"}
                                    </Button>
                                </li>
                            )
                        })}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export default ProductPageDemo
