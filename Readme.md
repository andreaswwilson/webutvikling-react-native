# Project 4 - React Native

**Skrevet av**: Andreas Wilson

## Kort om prosjektet
Prosjektet er laget med stacken MERN (mongdo, express,react,node) og er skrevet i typescript.
Prosjektet er er en mobilapplikasjon og er en movieDB.

## Hvordan sette opp og kjøre prosjektet

1. git clone https://gitlab.stud.idi.ntnu.no/it2810-h20/team-ad-hoc/prosjekt-4-andrewwi.git
2. Installer expo.io for ditt operativsystem. https://docs.expo.io/
3. npm install
4. expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view --npm
5. expo start -c

Installer expo app på mobilen, evt installer en simulator for android/ios. 
Scan QR koden fra expo appen på datamaskinen.
Expo client ios : https://apps.apple.com/app/apple-store/id982107779
Expo client android : https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www

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

Styling er gjort med react-native-elements. Jeg valgte denne fordi de mer populære UI-bibliotekene
(Material-UI og Ant Design) var litt mer trøblete å sette opp fordi det måtte linkes fonter og ikoner.
Jeg ville ha en enkel kjøring slik at jeg var sikker på at prosjektet kunne kjøres på andre maskiner ved peerreview.

Reduxjs-toolkit er brukt for å implementere redux.
