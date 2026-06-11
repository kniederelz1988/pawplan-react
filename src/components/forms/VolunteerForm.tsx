import { useCallback, useState } from "react";

import { Button, Field, HStack, Input, Spacer, Switch, Toggle } from "@chakra-ui/react";
import DatePicker from "@components/utils/DatePicker";
import { VolunteerModel } from "@models/VolunteerModel";
import { dateValueToTimestamp, timestampToDateValue } from "@helpers/TimeHelpers";

type VolunteerFormProps = {
    volunteer: VolunteerModel,
    onSubmit: (v: VolunteerModel) => void,
    onReset: () => void
}

export default function VolunteerForm({ volunteer, onSubmit, onReset } : VolunteerFormProps) {
    const [birthday, setBirthday] = useState(timestampToDateValue(volunteer.birthday))

    const handleSubmit = useCallback((e: React.SubmitEvent) => {
        e.preventDefault()

        volunteer.name = e.target.displayName.value
        volunteer.birthday = dateValueToTimestamp(birthday)

        onSubmit(volunteer)
    }, [volunteer, birthday])
    const handleReset = useCallback((e: React.SyntheticEvent) => {
        e.preventDefault();
        onReset()
    }, [])

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <HStack>
                <Field.Root disabled>
                    <Field.Label>Id</Field.Label>
                    <Input placeholder={volunteer.id}/>
                </Field.Root>

                <Spacer h={4} />

                <Field.Root disabled>
                    <Field.Label>User id</Field.Label>
                    <Input placeholder={volunteer.userId}/>
                </Field.Root>
            </HStack>
        
            <Spacer h={4} />

            <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input type="text" name="displayName" placeholder="John Doe/Jane Roe" defaultValue={volunteer.name} />
                <Field.ErrorText />
            </Field.Root>

            <Spacer h={4} />

            <HStack>
                <Field.Root>
                    <DatePicker name="birthday" value={[birthday]} onValueChange={t => { console.log(t.value[0]); setBirthday(t.value[0]) }}>
                        Birthday
                    </DatePicker>
                    <Field.ErrorText />
                </Field.Root>

                <Field.Root>
                    <DatePicker name="volunteerSince" defaultValue={[timestampToDateValue(volunteer.volunteerSince)]} disabled>
                        Volunteer since
                    </DatePicker>
                    <Field.ErrorText />
                </Field.Root>
            </HStack>

            <Spacer h={4} />
            
            <HStack>
                <Spacer />
            
                <Button variant="outline" type="reset">Cancel</Button>
                <Button type="submit">Submit</Button>
            </HStack>
        </form>
    )
}