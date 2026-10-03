'use client'

import React from "react"
import Avatar from "@radui/ui/Avatar"
import AvatarGroup from "@radui/ui/AvatarGroup"
import Badge from "@radui/ui/Badge"
import BlockQuote from "@radui/ui/BlockQuote"
import Button from "@radui/ui/Button"
import Callout from "@radui/ui/Callout"
import Card from "@radui/ui/Card"
import Code from "@radui/ui/Code"
import DataList from "@radui/ui/DataList"
import Fieldset from "@radui/ui/Fieldset"
import Link from "@radui/ui/Link"
import TextArea from "@radui/ui/TextArea"
import ColorLooper from "../helpers/ColorLooper"

const colors = ["gray", "blue", "green", "red", "plum", "gold"]
const sizes = ["small", "medium", "large", "x-large"]
const variants = ["soft", "outline"]

const Examples = ({ children }) => <div className="flex flex-wrap items-center gap-3">{children}</div>

const Section = ({ name, description, children }) => (
    <ColorLooper title={name} docsLink={`/docs/components/${name.toLowerCase().replaceAll(" ", "-")}`} description={description}>
        {children}
    </ColorLooper>
)

const CompleteCoveragePlayground = () => (
    <div className="grid gap-6">
        <Section name="Badge" description="All badge colors, visual variants, and sizes.">
            <div className="grid gap-3">{['solid', 'soft', 'surface', 'outline', 'ghost'].map((variant) => <Examples key={variant}>{colors.map((color) => sizes.map((size) => <Badge key={`${variant}-${color}-${size}`} color={color} variant={variant} size={size}>{color} {size}</Badge>))}</Examples>)}</div>
        </Section>
        <Section name="Button" description="Every button variant, color, and size.">
            <div className="grid gap-3">{['solid', 'soft', 'outline', 'ghost', 'destructive'].map((variant) => <Examples key={variant}>{sizes.map((size) => colors.slice(0, 4).map((color) => <Button key={`${variant}-${size}-${color}`} variant={variant} size={size} color={color}>{variant} {size}</Button>))}</Examples>)}</div>
        </Section>
        <Section name="Callout" description="Callout variants, colors, intents, and sizes.">
            <div className="grid gap-3">{variants.map((variant) => sizes.map((size) => colors.slice(1, 5).map((color) => <Callout.Root key={`${variant}-${size}-${color}`} variant={variant} size={size} color={color}><Callout.Text>{variant} {size} {color}</Callout.Text></Callout.Root>)))}</div>
        </Section>
        <Section name="Avatar" description="Avatar shape, size, and color combinations.">
            <Examples>{['', 'sm', 'lg'].map((size) => ['', 'square'].map((variant) => colors.slice(0, 4).map((color) => <Avatar.Root key={`${size}-${variant}-${color}`} size={size} variant={variant} color={color}><Avatar.Fallback>RU</Avatar.Fallback></Avatar.Root>)))}</Examples>
        </Section>
        <Section name="AvatarGroup" description="Avatar group size and spacing variants.">
            <Examples>{['', 'small', 'medium', 'large'].map((size) => ['circle', 'spacing'].map((variant) => <AvatarGroup.Root key={`${size}-${variant}`} size={size} variant={variant}><AvatarGroup.Item><AvatarGroup.Avatar src="/images/avatars/nina.jpg" alt="Nina" /><AvatarGroup.Fallback>NI</AvatarGroup.Fallback></AvatarGroup.Item><AvatarGroup.Item><AvatarGroup.Avatar src="/images/avatars/omar.jpg" alt="Omar" /><AvatarGroup.Fallback>OM</AvatarGroup.Fallback></AvatarGroup.Item></AvatarGroup.Root>))}</Examples>
        </Section>
        <Section name="BlockQuote" description="Block quote variants, colors, and sizes.">
            <div className="grid gap-3">{variants.map((variant) => sizes.map((size) => <BlockQuote key={`${variant}-${size}`} variant={variant} size={size} color="blue">{variant} {size} block quote</BlockQuote>))}</div>
        </Section>
        <Section name="Card" description="Card surface variants and density sizes.">
            <div className="grid gap-3 sm:grid-cols-2">{variants.map((variant) => sizes.map((size) => <Card key={`${variant}-${size}`} variant={variant} size={size}><Card.Header><Card.Title>{variant}</Card.Title></Card.Header><Card.Content><Card.Description>{size} card</Card.Description></Card.Content></Card>))}</div>
        </Section>
        <Section name="Code" description="Inline code variants, colors, and sizes.">
            <Examples>{variants.map((variant) => sizes.map((size) => colors.slice(0, 4).map((color) => <Code key={`${variant}-${size}-${color}`} variant={variant} size={size} color={color}>{variant} {size}</Code>)))}</Examples>
        </Section>
        <Section name="DataList" description="Data list density sizes.">
            <Examples>{['small', 'medium', 'large'].map((size) => <DataList.Root key={size} size={size}><DataList.Item><DataList.Label>Size</DataList.Label><DataList.Value>{size}</DataList.Value></DataList.Item></DataList.Root>)}</Examples>
        </Section>
        <Section name="Fieldset" description="Fieldset visual variants, colors, and sizes.">
            <Examples>{variants.map((variant) => sizes.map((size) => <Fieldset.Root key={`${variant}-${size}`} variant={variant} size={size} color="blue"><Fieldset.Legend>{variant} {size}</Fieldset.Legend><Fieldset.Description>Fieldset description</Fieldset.Description></Fieldset.Root>))}</Examples>
        </Section>
        <Section name="Link" description="Link color and size variants.">
            <Examples>{sizes.map((size) => colors.slice(0, 4).map((color) => <Link key={`${size}-${color}`} size={size} color={color} href="/docs">{color} {size}</Link>))}</Examples>
        </Section>
        <Section name="TextArea" description="Text area variants, colors, sizes, and resize modes.">
            <div className="grid gap-3 sm:grid-cols-2">{['soft', 'outline', 'solid', 'ghost'].map((variant) => sizes.map((size) => <TextArea key={`${variant}-${size}`} variant={variant} size={size} color="blue" resize="vertical" defaultValue={`${variant} ${size}`} />))}</div>
        </Section>
    </div>
)

export default CompleteCoveragePlayground
