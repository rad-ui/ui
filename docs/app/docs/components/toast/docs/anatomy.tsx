import Toast from '@radui/ui/Toast'

export default () => {
    return (
        <Toast.Provider>
            <Toast.Portal>
                <Toast.Viewport>
                    <Toast.Root toast={{ id: 'example' }}>
                        <Toast.Content>
                            <Toast.Title />
                            <Toast.Description />
                            <Toast.Action />
                            <Toast.Close />
                        </Toast.Content>
                    </Toast.Root>
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    )
}
