import { Flex, Spacer } from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function LoadingPage() {
    return (
        <Flex w="vw" direction="row">
            <Spacer />

            <Flex h="vh" direction="column">
                <Spacer />

                <DotLottieReact src="loading-paw.lottie" style={{ width: "150px", height: "150px" }} loop autoplay />

                <Spacer />
            </Flex>

            <Spacer />
        </Flex>
    )
}