import Form from "@radui/ui/Form"
import Field from "@radui/ui/Field"

export default () => {
    return (
        <Form>
            <Field.Root>
                <Field.Label />
                <Field.Control />
                <Field.Error />
            </Field.Root>
        </Form>
    )
}
