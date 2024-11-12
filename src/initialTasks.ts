import type { NewTask } from './types';

export const initialTasks: NewTask[] = [
  {
    title: "Bram Slimmer Maken",
    description: "Onze praatrobot die klanten helpt met problemen met hun apparaten verbeteren en uitbreiden.",
    priority: 100,
    parentId: null
  },
  {
    title: "Reparatie-beslismodel Implementeren",
    description: "Ontwikkelen van slim beslismodel met stoplicht-systeem (Groen = repareren, Oranje = twijfel, Rood = niet repareren)",
    priority: 95,
    parentId: 1
  },
  {
    title: "Tarieven Integreren",
    description: "Alle reparatieprijzen toevoegen en koppelen aan merken voor specifieke prijsindicaties",
    priority: 90,
    parentId: 1
  },
  {
    title: "Foutcodes Koppelen",
    description: "Systeem voor het koppelen van storingscodes aan oplossingen en reparatietypes",
    priority: 85,
    parentId: 1
  },
  {
    title: "DIY Reparaties",
    description: "Instructies voor zelf-reparatie toevoegen met feedback systeem",
    priority: 80,
    parentId: 1
  },
  {
    title: "Vriendelijkheid Verbeteren",
    description: "Bram's communicatiestijl natuurlijker en vriendelijker maken",
    priority: 75,
    parentId: 1
  },
  {
    title: "Sharpie Ontwikkelen",
    description: "Nieuwe praatrobot voor productkennis en gebruiksinstructies",
    priority: 90,
    parentId: null
  },
  {
    title: "Handleidingen Verwerken",
    description: "Alle producthandleidingen digitaliseren en koppelen aan Sharpie",
    priority: 85,
    parentId: 7
  },
  {
    title: "Afbeeldingen Herkenning",
    description: "Systeem voor het herkennen en uitleggen van technische afbeeldingen",
    priority: 80,
    parentId: 7
  },
  {
    title: "Onderhoudstips",
    description: "Database met onderhoudstips en veelvoorkomende problemen",
    priority: 75,
    parentId: 7
  },
  {
    title: "Data Analyse",
    description: "Verzamelen en analyseren van gebruiksdata voor verbeteringen",
    priority: 70,
    parentId: null
  },
  {
    title: "Gegevens Verzamelen",
    description: "Opzetten van systeem voor het verzamelen van gebruiksstatistieken",
    priority: 65,
    parentId: 11
  },
  {
    title: "Verbeteringen Identificeren",
    description: "Analyseren van gebruikersfeedback en prestaties",
    priority: 60,
    parentId: 11
  },
  {
    title: "Maandelijkse Rapportage",
    description: "Opstellen van voortgangsrapportages voor Tako",
    priority: 55,
    parentId: 11
  },
  {
    title: "Toekomstplannen",
    description: "Voorbereiden van nieuwe functionaliteiten",
    priority: 50,
    parentId: null
  },
  {
    title: "Spraakinterface",
    description: "Onderzoek naar implementatie van spraakbesturing",
    priority: 45,
    parentId: 15
  },
  {
    title: "Afspraken Systeem",
    description: "Automatisch inplannen van reparatie-afspraken",
    priority: 40,
    parentId: 15
  },
  {
    title: "QR-code Systeem",
    description: "Ontwikkelen van QR-codes voor snelle toegang tot hulp",
    priority: 35,
    parentId: 15
  },
  {
    title: "Documentatie",
    description: "Vastleggen van alle systemen en processen",
    priority: 30,
    parentId: null
  },
  {
    title: "Technische Handleiding",
    description: "Documentatie voor het onderhouden van de chatbots",
    priority: 25,
    parentId: 19
  },
  {
    title: "Trainingsmateriaal",
    description: "Cursusmateriaal voor nieuwe medewerkers",
    priority: 20,
    parentId: 19
  }
];