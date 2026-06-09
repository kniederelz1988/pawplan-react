import { useEffect, useState } from "react";

import { VolunteerModel } from "@models/VolunteerModel";
import volunteerRepository from "@repos/VolunteerRepository";

export default function useVolunteerCollection() {
    const [volunteers, setVolunteers] = useState<VolunteerModel[]>([])    
    const [filterByIds, setIdsFilter] = useState<string[]>([])

    useEffect(() => {
        if (!filterByIds || filterByIds.length == 0) {
            setVolunteers([])
            return
        }

        return volunteerRepository.subscribeForVolunteers(filterByIds, setVolunteers)
    }, [filterByIds])
    
    return { volunteers, setIdsFilter }
}