import prisma from "../src/config/database";

async function seed() {
  await prisma.states.createMany({
    data: [
      {
        uf: "AC",
      },
      {
        uf: "AL",
      },
      {
        uf: "AP",
      },
      {
        uf: "AM",
      },
      {
        uf: "BA",
      },
      {
        uf: "CE",
      },
      {
        uf: "DF",
      },
      {
        uf: "ES",
      },
      {
        uf: "GO",
      },
      {
        uf: "MA",
      },
      {
        uf: "MT",
      },
      {
        uf: "MS",
      },
      {
        uf: "MG",
      },
      {
        uf: "PA",
      },
      {
        uf: "PB",
      },
      {
        uf: "PR",
      },
      {
        uf: "PE",
      },
      {
        uf: "PI",
      },
      {
        uf: "RJ",
      },
      {
        uf: "RN",
      },
      {
        uf: "RS",
      },
      {
        uf: "RO",
      },
      {
        uf: "RR",
      },
      {
        uf: "SC",
      },
      {
        uf: "SP",
      },
      {
        uf: "SE",
      },
      {
        uf: "TO",
      },
    ],
  });
  await prisma.branchs.createMany({
    data: [
      {
        name: "branch 1",
      },
      {
        name: "branch 2",
      },
      {
        name: "branch 3",
      },
    ],
  });
  await prisma.specialties.createMany({
    data: [
      {
        name: "Cardiologista",
      },
      {
        name: "Dermatologista",
      },
      {
        name: "Endocrinologista",
      },
      {
        name: "Ginecologista",
      },
      {
        name: "Neurologista",
      },
      {
        name: "Oftalmologista",
      },
      {
        name: "Ortopedista",
      },
      {
        name: "Pediatra",
      },
      {
        name: "Psiquiatra",
      },
      {
        name: "Urologista",
      },
    ],
  });
}

seed()
  .then(() => console.log("Registered!"))
  .catch((e) => console.log(e))
  .finally(async () => await prisma.$disconnect());
