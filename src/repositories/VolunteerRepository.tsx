import { addDoc, collection, Firestore, FirestoreDataConverter, getDocs, onSnapshot, query, QueryDocumentSnapshot, Timestamp, updateDoc, where } from "firebase/firestore";
import { database } from "@fb/config"
import { VolunteerModel } from "@models/VolunteerModel";
import { User } from "firebase/auth";

const modelConverter: FirestoreDataConverter<VolunteerModel, VolunteerModel> = {
    toFirestore: (data: VolunteerModel) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const d = snap.data() as VolunteerModel
        d.id = snap.id
        return d
    }
}

type VolunteerRepositoryListener = (volunteer: VolunteerModel[]) => void
type VolunteerOperationCallback = (volunteer: VolunteerModel | null, error: string | null) => void

function VolunteerRepository({ database } : { database: Firestore }) {
    function subscribeForVolunteers(userIds: string[], listener: VolunteerRepositoryListener) {
        if (userIds.length == 0)
            return

        const q = query(
            collection(database, "volunteers"),
            where("userId", "in", userIds)
        ).withConverter(modelConverter)

        return onSnapshot(q, (snap) => {
            const data = snap.docs.map(t => t.data())
            listener(data)
        })
    }

    function createVolunteer(volunteer: VolunteerModel, operationResult: VolunteerOperationCallback) {
        if (!volunteer || volunteer.id)
        {
            operationResult(volunteer, "undefined-data")
            return
        }

        const c = collection(database, "volunteers")
        addDoc(c, volunteer)
            .then(
                onSuccess => { 
                    volunteer.id = onSuccess.id
                    operationResult(volunteer, null)
                },
                onError => {
                    operationResult(volunteer, onError)
                }
            )
    }
    async function updateVolunteer(volunteer: VolunteerModel, operationResult: VolunteerOperationCallback) {
        if (!volunteer || !volunteer.id) {
            operationResult(volunteer, "undefined-data")
            return
        }

        const q = query(
            collection(database, "volunteers"),
            where("userId", "==", volunteer.userId)
        );

        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            operationResult(volunteer, "no-volunteer-found")
            return
        }

        const userDoc = snapshot.docs[0];
        await updateDoc(userDoc.ref, volunteer)
            .then(
                _ => {
                    operationResult(volunteer, null)
                },   
                error => {
                    operationResult(null, error)
                }
            )
    }

    async function createVolunteerIfNotExistant(user: User) {
        const t = async (user: User, operationResult: VolunteerOperationCallback) => {
            if (!user || !user.uid)
                operationResult(null, "undefined-data")

            const q = query(
                collection(database, "volunteers"),
                where("userId", "==", user.uid)
            )   
            
            getDocs(q)
                .then(
                    onSuccess => {
                        if(onSuccess.empty) {
                            operationResult(null, "no-data-found")
                            return
                        }

                        const v = onSuccess.docs[0].data() as VolunteerModel
                        operationResult(v, null)
                    },
                    onError => {
                        operationResult(null, onError)
                    }
                )
        }

        await t(user, (_, error) => {
            if (error) {
                if (error === "no-data-found") {
                    const v = { 
                        admin: false,
                        birthday: Timestamp.now(),
                        volunteerSince: Timestamp.now(),
                        favoriteDogIds: [],
                        name: user.displayName || "",
                        userId: user.uid
                    }
                    volunteerRepository.createVolunteer(v, (_, error) => {
                        if (error) {
                            console.error("Error creating volunteer data " + error)
                            return
                        }
                    })
                    return
                }

                console.error("Error reading volunteer data " + error)
                return
            }            
        })
    }

    return { subscribeForVolunteers, createVolunteer, createVolunteerIfNotExistant, updateVolunteer }
}

const volunteerRepository = VolunteerRepository({ database })
export default volunteerRepository