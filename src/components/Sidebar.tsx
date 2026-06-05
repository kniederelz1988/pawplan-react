import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

import SidebarContent from '@components/SidebarContent';
import { Box, Button, CloseButton, Drawer, Portal } from '@chakra-ui/react';

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box display={{ base: "block", md: "none" }}>
                <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement={"start"}>
                    <Drawer.Trigger position="absolute" left="-5px" top="5px" zIndex={100} bgColor={"white"} m={0} p={0} asChild>
                        <Button variant="outline" size="md" m="0">
                            <FiMenu />
                        </Button>
                    </Drawer.Trigger>
                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                        <Drawer.Content w="300px" h="vh" m={0} p={0}>
                            <Drawer.Body p={0}>
                                <SidebarContent p={4}/>
                            </Drawer.Body>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="md" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
            </Box>

            <Box display={{ base: "none", md: "block"}} borderRight="solid 1px">
                <SidebarContent w="250px" p={4}/>
            </Box>
        </>
    )
}