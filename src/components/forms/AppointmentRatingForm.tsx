import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Button, Field, Flex, HStack, Spacer, Text, Textarea } from "@chakra-ui/react"

import InputRating from "@components/utils/InputRating"

import { yupResolver } from "@hookform/resolvers/yup"
import { appointmentRatingSchema } from "@schemas/appointmentSchemas"

type AppointmentRatingFormProps = {
    onConfirm: (rating: number, comment: string) => void,
    onClose: () => void
}

export default function AppointmentRatingForm({ onConfirm, onClose} : AppointmentRatingFormProps) {
    const { handleSubmit, register, formState: { errors } } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        resolver: yupResolver(appointmentRatingSchema)
    })

    const [ratingValue, setRating] = useState(0)

    const handleFormSubmit = useCallback((data: any) => {
        onConfirm(ratingValue, data.comment)
    }, [ratingValue])
    const handleFormReset = useCallback((_e: React.SyntheticEvent) => {
        onClose()
    }, [onClose])

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} onReset={handleFormReset}> 
            <Flex direction={"row"} gap={4}>
                <Spacer />
                
                <Text fontSize="sm" alignContent={"center"}>Rate your visit</Text>
                <Flex direction={"row"} justifyContent={"left"} gap={0}>
                    <InputRating value={ratingValue} onValueChanged={setRating} />
                </Flex>
            </Flex>
        
            <Spacer h={2} />

            <Field.Root invalid={!!errors.comment}>
                <Textarea {...register("comment")} placeholder="Write your comment..." rows={4} />
                <Field.ErrorText>
                    <Field.ErrorIcon />
                    {errors.comment?.message}
                </Field.ErrorText>
            </Field.Root>
            
            <Spacer h={4} />

            <HStack>
                <Spacer />
            
                <Button variant="subtle" w="30%" type="reset">Cancel</Button>
                <Button type="submit" w="30%">Submit</Button>
            </HStack>
        </form>
    )
}