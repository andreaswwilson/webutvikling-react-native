# Project 4 - React Native

**Skrevet av**: Andreas Wilson

## Hvordan sette opp og kjøre prosjektet

### Dersom du har expo appen på mobilen

### Dersom du ønsker å kjøre den via simulator

1. Installer expo.io for ditt operativsystem. https://docs.expo.io/
2. npm install
3. npm start

Installer expo app på mobilen, evt installer en simulator for android/ios. Scan QR koden fra expo appen på datamaskinen.

Backend kjører på NTNU VM og er tilgjengelig også utenfor NTNU-nettverket.
Backend er helt uendret fra prosjekt 3. Dette er bevisst siden det er lagt opp
til gjenbruk av kode.

## Krav til applikasjonens innhold og funksjonalitet

1. Applikasjonen har søkegrensesnitt.
2. Applikasjonen henter kun inn 4 filmer om ganger. Når brukeren scroller cirka halvveis ned på skjermen lastes det inn 4 nye filmer som
   legges til det eksisterende datasettet. Dette kan gjentas helt til det er tomt for filmer i databasen.
3. Ved å trykke på en film får brukeren mer informasjon om filmen.
4. Brukeren kan sortere på år og filtere på en eller flere kategorier.

## Krav til bruk av teknologi, koding, testing, dokumentasjon, levering etc.

1. Typescript er brukt. I så stor grad som mulig er typesetting gjort.
2. React Native er brukt og lagd ved hjelp av expo.i
3. Expo init er brukt for å komme i gang.
4. Testing er gjort ved manuell e2e testing iht. oppgavens krav. Jeg har testet med å bla frem og tilbake,
   lukke og åpne sider, fjerne og legge til favoritt, prøve forskjellige kombinasjoner av søk, filtering og sortering.
5. Prosjektet er dokumentert via readme.

Det er gjenbrukt kode i så stor grad som mulig fra forrige prosjekt. Backend er helt uendret og kjører på ntnu vm.
