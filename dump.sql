--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: appoitments_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.appoitments_status AS ENUM (
    'OPENED',
    'ACCEPTED',
    'CANCELLED',
    'FINISHED'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.appointments (
    id integer NOT NULL,
    doctor_id integer,
    patient_id integer,
    status public.appoitments_status DEFAULT 'OPENED'::public.appoitments_status NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL
);


--
-- Name: appointments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.appointments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: appointments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.appointments_id_seq OWNED BY public.appointments.id;


--
-- Name: branchs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.branchs (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


--
-- Name: branch_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.branch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: branch_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.branch_id_seq OWNED BY public.branchs.id;


--
-- Name: doctors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.doctors (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    crm_state_id integer,
    crm character varying(6) NOT NULL,
    specialty_id integer,
    branch_id integer
);


--
-- Name: doctors_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.doctors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: doctors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.doctors_id_seq OWNED BY public.doctors.id;


--
-- Name: patients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.patients (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    cpf character varying(11) NOT NULL
);


--
-- Name: patients_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: patients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;


--
-- Name: specialties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


--
-- Name: specialty_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.specialty_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: specialty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.specialty_id_seq OWNED BY public.specialties.id;


--
-- Name: states; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.states (
    id integer NOT NULL,
    uf character varying(2) NOT NULL
);


--
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.states_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- Name: appointments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments ALTER COLUMN id SET DEFAULT nextval('public.appointments_id_seq'::regclass);


--
-- Name: branchs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.branchs ALTER COLUMN id SET DEFAULT nextval('public.branch_id_seq'::regclass);


--
-- Name: doctors id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors ALTER COLUMN id SET DEFAULT nextval('public.doctors_id_seq'::regclass);


--
-- Name: patients id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);


--
-- Name: specialties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties ALTER COLUMN id SET DEFAULT nextval('public.specialty_id_seq'::regclass);


--
-- Name: states id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.appointments VALUES (3, 1, 7, 'OPENED', '2023-12-25 19:00:00', '2023-12-25 20:00:00');
INSERT INTO public.appointments VALUES (4, 1, 7, 'OPENED', '2023-12-25 14:00:00', '2023-12-25 15:00:00');
INSERT INTO public.appointments VALUES (5, 1, 7, 'OPENED', '2023-12-25 12:00:00', '2023-12-25 13:00:00');
INSERT INTO public.appointments VALUES (1, 1, 1, 'CANCELLED', '2023-04-05 11:00:00', '2023-04-05 12:00:00');
INSERT INTO public.appointments VALUES (2, 1, 7, 'FINISHED', '2023-12-25 20:00:00', '2023-12-25 21:00:00');


--
-- Data for Name: branchs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.branchs VALUES (1, 'hospital 1');
INSERT INTO public.branchs VALUES (2, 'hospital 2');
INSERT INTO public.branchs VALUES (3, 'hospital 3');


--
-- Data for Name: doctors; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.doctors VALUES (1, 'guilherme', 'gui@gui.com', '$2b$10$r0GVjGHD4OqFM1G/yBBPa./qi5eVdp.STRT/WOHJalCmVNgJ1xIRG', 1, '123456', 1, 1);


--
-- Data for Name: patients; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.patients VALUES (1, 'guilherme', 'gui@gui.com', '1234', '12345678901');
INSERT INTO public.patients VALUES (2, 'guilherme2', 'gui2@gui.com', '1234', '12345678902');
INSERT INTO public.patients VALUES (7, 'guilherme', 'gui3@gui.com', '$2b$10$NxEdH5oDHS0zQw6ZVFLAqe8bmmg52YldCi9Bvhxy6Y4R9z3wEQJEq', '12345678903');


--
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.specialties VALUES (1, 'Oftalmologia');
INSERT INTO public.specialties VALUES (2, 'Pediatria');
INSERT INTO public.specialties VALUES (3, 'Cardiologia');
INSERT INTO public.specialties VALUES (4, 'Dermatologia');
INSERT INTO public.specialties VALUES (5, 'Ginecologia');
INSERT INTO public.specialties VALUES (6, 'Obstetrícia');
INSERT INTO public.specialties VALUES (7, 'Urologia');


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.states VALUES (1, 'AC');
INSERT INTO public.states VALUES (2, 'AL');
INSERT INTO public.states VALUES (3, 'AP');
INSERT INTO public.states VALUES (4, 'AM');
INSERT INTO public.states VALUES (5, 'BA');
INSERT INTO public.states VALUES (6, 'CE');
INSERT INTO public.states VALUES (7, 'DF');
INSERT INTO public.states VALUES (8, 'ES');
INSERT INTO public.states VALUES (9, 'GO');
INSERT INTO public.states VALUES (10, 'MA');
INSERT INTO public.states VALUES (11, 'MT');
INSERT INTO public.states VALUES (12, 'MS');
INSERT INTO public.states VALUES (13, 'MG');
INSERT INTO public.states VALUES (14, 'PA');
INSERT INTO public.states VALUES (15, 'PB');
INSERT INTO public.states VALUES (16, 'PR');
INSERT INTO public.states VALUES (17, 'PE');
INSERT INTO public.states VALUES (18, 'PI');
INSERT INTO public.states VALUES (19, 'RJ');
INSERT INTO public.states VALUES (20, 'RN');
INSERT INTO public.states VALUES (21, 'RS');
INSERT INTO public.states VALUES (22, 'RO');
INSERT INTO public.states VALUES (23, 'RR');
INSERT INTO public.states VALUES (24, 'SC');
INSERT INTO public.states VALUES (25, 'SP');
INSERT INTO public.states VALUES (26, 'SE');
INSERT INTO public.states VALUES (27, 'TO');


--
-- Name: appointments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.appointments_id_seq', 5, true);


--
-- Name: branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.branch_id_seq', 3, true);


--
-- Name: doctors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.doctors_id_seq', 1, true);


--
-- Name: patients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.patients_id_seq', 7, true);


--
-- Name: specialty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.specialty_id_seq', 7, true);


--
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.states_id_seq', 27, true);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: branchs branch_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.branchs
    ADD CONSTRAINT branch_name_key UNIQUE (name);


--
-- Name: branchs branch_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.branchs
    ADD CONSTRAINT branch_pkey PRIMARY KEY (id);


--
-- Name: doctors doctors_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_email_key UNIQUE (email);


--
-- Name: doctors doctors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_pkey PRIMARY KEY (id);


--
-- Name: patients patients_cpf_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_cpf_key UNIQUE (cpf);


--
-- Name: patients patients_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_email_key UNIQUE (email);


--
-- Name: patients patients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);


--
-- Name: specialties specialty_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialty_name_key UNIQUE (name);


--
-- Name: specialties specialty_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialty_pkey PRIMARY KEY (id);


--
-- Name: states states_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_name_key UNIQUE (uf);


--
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- Name: appointments appointments_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.doctors(id);


--
-- Name: appointments appointments_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id);


--
-- Name: doctors doctors_branch_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_branch_id_fkey FOREIGN KEY (branch_id) REFERENCES public.branchs(id);


--
-- Name: doctors doctors_crm_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_crm_state_id_fkey FOREIGN KEY (crm_state_id) REFERENCES public.states(id);


--
-- Name: doctors doctors_specialty_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.doctors
    ADD CONSTRAINT doctors_specialty_id_fkey FOREIGN KEY (specialty_id) REFERENCES public.specialties(id);


--
-- PostgreSQL database dump complete
--

