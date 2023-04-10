import { Dayjs } from "dayjs";

export enum Status {
    Opened = 'OPENED',
    Accepted = 'ACCEPTED',
    Cancelled = 'CANCELLED',
    Finished = 'FINISHED'
};

export interface AppointmentEntity {
    doctor_name: string,
    specialty: string,
    branch: string,
    patient_name: string,
    start_date: Dayjs,
    end_date: Dayjs,
    status: Status
}

export interface Appointment {
    doctorId: number,
    patientId: number,
    startDate: Dayjs,
    endDate?: Dayjs
}