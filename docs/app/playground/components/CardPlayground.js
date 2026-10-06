'use client'

import Button from "@radui/ui/Button"
import Card from "@radui/ui/Card"
import Matrix, { toAxis } from "../helpers/Matrix"
import PlaygroundSection from "../helpers/PlaygroundSection"

const variants = [{ key: "default", label: "default", value: undefined }, ...toAxis(["outline", "soft"])]

const CardPlayground = () => (
    <PlaygroundSection title="Card" docsLink="/docs/components/card" description="variant × size with header, content, and footer.">
        <Matrix
            align="top"
            rows={variants}
            columns={toAxis(["small", "medium", "large"])}
            renderCell={(variant, size) => (
                <Card variant={variant.value} size={size.value} className="w-60">
                    <Card.Header>
                        <Card.Title>Release status</Card.Title>
                        <Card.Description>Docs refresh in progress.</Card.Description>
                    </Card.Header>
                    <Card.Footer>
                        <Button size="small" variant="soft">View</Button>
                    </Card.Footer>
                </Card>
            )}
        />
    </PlaygroundSection>
)

export default CardPlayground
