import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Zap, Cpu, ChevronDown, ChevronUp, ShieldAlert, Package } from 'lucide-react';

interface PartNumberEntry {
  label: Record<'en' | 'sv', string>;
  number: string;
  note?: Record<'en' | 'sv', string>;
}

interface RetrofitItem {
  id: string;
  category: 'oem' | 'aftermarket' | 'diyCoding';
  title: Record<'en' | 'sv', string>;
  feasibility: 'easy' | 'medium' | 'hard' | 'expert';
  description: Record<'en' | 'sv', string>;
  warning?: Record<'en' | 'sv', string>;
  steps?: Record<'en' | 'sv', string[]>;
  partNumbers?: PartNumberEntry[];
  link?: string;
  linkLabel?: Record<'en' | 'sv', string>;
}

const retrofitsData: RetrofitItem[] = [
  {
    id: 'pixel-led',
    category: 'oem',
    title: {
      en: 'Pixel Active High Beam Software Enable (US/Canada)',
      sv: 'Pixel Aktivt Helljus Mjukvaruaktivering (USA/Kanada)',
    },
    feasibility: 'hard',
    description: {
      en: 'Enable steering-responsive adaptive headlights that dynamically dim individual pixel sections to prevent glare for oncoming drivers. This software deactivation was specific to North American (US/Canada) vehicles due to old FMVSS 108 regulatory bans. Note that the physical Pixel LED hardware must be present (MY21 Launch Edition or MY22-MY23 Pilot pack). Cars with Pilot Lite packages lack the hardware arrays.',
      sv: 'Aktivera styrresponsiva adaptiva strålkastare som dynamiskt dämpar enskilda pixeldelar. Denna mjukvarudeaktivering var specifik för nordamerikanska (USA/Kanada) fordon på grund av äldre FMVSS 108-regler. Fysisk Pixel LED-hårdvara måste finnas (MY21 Launch Edition eller MY22-MY23 Pilot-paket). Bilar med Pilot Lite saknar hårdvaran.',
    },
    warning: {
      en: 'Adaptive beam functions were disabled by default on US/Canadian cars. Enabling this feature via CCF modification will be overwritten whenever the vehicle receives an official OTA software update from Polestar, requiring you to re-apply the coding change.',
      sv: 'Adaptiva helljusfunktioner var inaktiverade som standard på bilar i USA/Kanada. Aktivering via CCF-kodning kommer att skrivas över vid officiella OTA-mjukvaruuppdateringar från Polestar, vilket kräver att kodningen görs om.',
    },
    steps: {
      en: [
        'Verify physical headlamps feature the "Polestar Pixel Technology" lettering on the inner bezel.',
        'Connect an OBD2 cable/adapter to the vehicle OBD port.',
        'Use third-party Car Configuration File (CCF) editing tools (like Orbit) to change the Headlight Configuration value to Pixel Adaptive.',
        'Perform an ECU reset (CEM and VMCU) to apply and index the new headlight settings.',
      ],
      sv: [
        'Verifiera att de fysiska strålkastarna har texten "Polestar Pixel Technology" på den inre ramen.',
        'Anslut en OBD2-kabel/adapter till fordonets OBD-uttag.',
        'Använd tredjepartsverktyg för ändring av Car Configuration File (CCF), till exempel Orbit, för att ändra strålkastarinställningen till Pixel Adaptive.',
        'Utför en återställning av styrenheter (CEM och VMCU) för att tillämpa och indexera de nya strålkastarinställningarna.',
      ],
    },
  },
  {
    id: 'kick-sensor',
    category: 'oem',
    title: {
      en: 'Power Tailgate Kick Sensor Retrofit (FMDM)',
      sv: 'Kick-sensor för Baklucka Retrofit (FMDM)',
    },
    feasibility: 'hard',
    description: {
      en: 'Retrofit the Foot Movement Detection Module (FMDM) that was omitted from select late MY22 and early MY23 Polestar 2 vehicles due to the global semiconductor shortage. Some affected vehicles have the rear bumper wiring harness pre-installed with a dummy connector, but many do not — the harness may lack the required Power, Ground, and LIN bus lines. After hardware installation, the Central Electronic Module (CEM) must be software-configured to recognize the new sensor before the kick-to-open function will activate.',
      sv: 'Eftermontera Foot Movement Detection Module (FMDM) som utelämnades från vissa sena MY22- och tidiga MY23-modeller av Polestar 2 på grund av den globala halvledarbristen. Vissa drabbade fordon har bakre stötfångarens kablage förberett med en blindkontakt, men många saknar de nödvändiga ström-, jord- och LIN-bussledningarna. Efter hårdvarumontering måste CEM (Central Electronic Module) programmeras för att känna igen den nya sensorn innan kick-funktionen aktiveras.',
    },
    warning: {
      en: 'This is not a simple plug-and-play installation. The FMDM communicates over the LIN bus with the CEM, and incorrect wiring can cause tailgate system faults or interfere with other vehicle modules. Modifying CEM configuration may affect your warranty. Check with your Polestar Service Point first — many affected vehicles are eligible for a free official retrofit under an open service campaign.',
      sv: 'Detta är inte en enkel plug-and-play-installation. FMDM kommunicerar via LIN-bussen med CEM, och felaktig kabeldragning kan orsaka bakluckefel eller störa andra fordonsmoduler. Ändring av CEM-konfiguration kan påverka din garanti. Kontrollera med din Polestar-verkstad först — många drabbade fordon är berättigade till gratis officiell eftermontering via en öppen servicekampanj.',
    },
    partNumbers: [
      {
        label: {
          en: 'Foot Movement Detection Module (FMDM)',
          sv: 'Fotrörelsedetekteringsmodul (FMDM)',
        },
        number: '32337498',
        note: {
          en: 'Primary OEM part. May be superseded — verify with VIN.',
          sv: 'Primärt OEM-artikelnummer. Kan vara ersatt — verifiera med VIN.',
        },
      },
      {
        label: {
          en: 'FMDM Module (Alternate / Earlier Revision)',
          sv: 'FMDM-modul (Alternativ / Tidigare revision)',
        },
        number: '32252119',
        note: {
          en: 'Earlier revision number referenced in some service bulletins.',
          sv: 'Tidigare revisionsnummer som nämns i vissa servicemeddelanden.',
        },
      },
    ],
    steps: {
      en: [
        'Contact your Polestar Service Point with your VIN to check eligibility for a free factory retrofit campaign before attempting a DIY installation.',
        'Purchase the FMDM module and dual antenna sensor tubes. Ensure your 12V battery is fully charged or connected to a maintainer.',
        'Remove the lower rear bumper valence panel to access the sensor mounting area and bumper wiring harness.',
        'Inspect the harness for a pre-existing dummy connector. If absent, you will need to run Power, Ground, and LIN bus wires from the rear fuse box area to the bumper — consult vehicle-specific wiring diagrams for your model year.',
        'Mount the FMDM antenna tubes into the retaining clips on the inside of the bumper cover and connect the module to the harness.',
        'Activate the kick sensor feature in the CEM using a CCF configuration tool (such as Orbit via OBD2) or have a Polestar Service Point enable it via VIDA. The hardware will not function without this software step.',
        'Reassemble the bumper trim and test by standing within 1 meter of the rear bumper with the key fob and performing a foot-sweep motion under the center of the bumper.',
      ],
      sv: [
        'Kontakta din Polestar-verkstad med ditt VIN för att kontrollera om du är berättigad till gratis fabrikseftermontering innan du försöker göra det själv.',
        'Köp FMDM-modulen och de dubbla antennsensorrören. Se till att 12V-batteriet är fulladdat eller anslutet till en laddare.',
        'Ta bort den nedre bakre stötfångarplasten för att komma åt sensorns monteringsarea och stötfångarens kablage.',
        'Inspektera kablaget efter en befintlig blindkontakt. Om den saknas måste du dra ström-, jord- och LIN-busskablar från det bakre säkringsutrymmet till stötfångaren — konsultera fordonsspecifika kopplingsscheman för din årsmodell.',
        'Montera FMDM-antennrören i fästklämmorna på insidan av stötfångarhöljet och anslut modulen till kablaget.',
        'Aktivera kick-sensorfunktionen i CEM med ett CCF-konfigurationsverktyg (t.ex. Orbit via OBD2) eller låt en Polestar-verkstad aktivera den via VIDA. Hårdvaran fungerar inte utan detta mjukvarusteg.',
        'Montera tillbaka stötfångarplasten och testa genom att stå inom 1 meter från bakre stötfångaren med nyckelbrickan och utföra en fotsveprörelse under mitten av stötfångaren.',
      ],
    },
  },
  {
    id: 'magsafe-charging',
    category: 'aftermarket',
    title: {
      en: 'MagSafe Console Wireless Charger Upgrade',
      sv: 'MagSafe Magnetisk Trådlös Laddare',
    },
    feasibility: 'easy',
    description: {
      en: 'The standard OEM wireless charging pad is slow, generates significant heat, and allows devices to slide off on turns. Upgrading to a custom 3D-printed MagSafe tray mount provides fast, stable charging and holds the phone securely.',
      sv: 'Den trådlösa standardladdaren i bilen är långsam, genererar mycket värme och gör att telefonen glider runt i kurvorna. Att uppgradera till ett specialanpassat 3D-utskrivet MagSafe-fack ger snabb och stabil laddning samt håller mobilen på plats.',
    },
    steps: {
      en: [
        'Print or purchase a custom center console wireless charging replacement insert.',
        'Insert a standard 15W MagSafe magnetic puck into the designated circular cutout.',
        'Route the USB-C power wire under the trim to the console USB ports.',
        'Place the assembly in the wireless charging slot for a flush, OEM-like look.',
      ],
      sv: [
        'Skriv ut eller köp en anpassad trådlös laddningsinsats för mittkonsolen.',
        'Placera en standard 15W MagSafe-laddningspuck i det avsedda runda uttaget.',
        'Dra USB-C-kabeln under panelen till mittkonsolens USB-portar.',
        'Placera monteringen i det trådlösa laddningsfacket för ett snyggt, integrerat utseende.',
      ],
    },
  },
  {
    id: 'mudflaps',
    category: 'aftermarket',
    title: {
      en: 'Fitted Contoured Mud Guards',
      sv: 'Formanpassade Stänkskydd',
    },
    feasibility: 'easy',
    description: {
      en: 'Polestar 2 paint is susceptible to stone chips and road debris damage along the lower sills and rear wheel arches due to the flared body styling. Fitted aftermarket mud guards offer subtle, functional protection.',
      sv: 'Lacken på Polestar 2 är känslig för stenskott och vägsmuts längs trösklarna och bakre hjulhusen på grund av den utställda karossformen. Formanpassade stänkskydd ger diskret och funktionellt skydd.',
    },
  },
  {
    id: 'console-insert',
    category: 'diyCoding',
    title: {
      en: 'Dual-Tier Center Armrest Organizer',
      sv: 'Förvaringsfack för Mittkonsol',
    },
    feasibility: 'easy',
    description: {
      en: 'A drop-in divider tray designed specifically for the deep under-armrest storage well. It creates a practical upper shelf for sunglasses, keys, and coins while leaving the lower main compartment accessible.',
      sv: 'En insatslåda speciellt utformad för det djupa förvaringsfacket under armstödet. Den skapar en praktisk övre hylla för solglasögon, nycklar och mynt samtidigt som det nedre huvudfacket förblir tillgängligt.',
    },
  },
  {
    id: 'orbit-obd2',
    category: 'diyCoding',
    title: {
      en: 'Orbit Car Configuration Coding',
      sv: 'Bilkonfiguration via Orbit',
    },
    feasibility: 'medium',
    description: {
      en: 'Modify your vehicle Car Configuration File (CCF) using Orbit software. This utility lets you connect your computer to the OBD port to unlock factory features that were disabled in your region, modify lighting patterns, or configure pilot package upgrades.',
      sv: 'Ändra bilens konfigurationsfil (CCF) med programvaran Orbit. Det här verktyget gör det möjligt att ansluta en dator till OBD-uttaget för att låsa upp fabriksfunktioner som inaktiverats i din region, ändra ljusmönster eller konfigurera förarassistentuppgraderingar.',
    },
    steps: {
      en: [
        'Obtain a compatible OBD2 adapter (OBDLink MX+ or an ENET cable with a USB-C Ethernet adapter).',
        'Download Orbit and purchase a subscription license.',
        'Connect the adapter to the OBD2 port located in the driver-side footwell.',
        'Read current CCF configurations and make adjustments carefully. Keep a backup copy of your original configuration file.',
      ],
      sv: [
        'Skaffa en kompatibel OBD2-adapter (OBDLink MX+ eller en ENET-kabel med USB-C-nätverksadapter).',
        'Ladda ner Orbit och köp en prenumerationslicens.',
        'Anslut adaptern till OBD2-uttaget i fotutrymmet på förarsidan.',
        'Läs in aktuella CCF-inställningar och gör ändringar försiktigt. Spara alltid en säkerhetskopia av din ursprungliga konfigurationsfil.',
      ],
    },
  },
  {
    id: 'smartzone-grille',
    category: 'oem',
    title: {
      en: 'Official SmartZone Front Panel Upgrade (Facelift Retrofit)',
      sv: 'Officiell SmartZone Frontpanel-uppgradering (Facelift Retrofit)',
    },
    feasibility: 'expert',
    description: {
      en: 'Replace the pre-facelift grid grille with the body-colored, flat SmartZone sensor panel introduced in the MY24 facelift. Offered in select markets (such as the UK) as an official aftermarket upgrade package, it refreshes the front-end styling while keeping the existing ADAS radar and front camera components functional.',
      sv: 'Ersätt den äldre gallergrillen med den karossfärgade, platta SmartZone-panelen som introducerades i MY24 facelift. Erbjuds på vissa marknader (som Storbritannien) som en officiell eftermonteringsuppgradering för att uppdatera utseendet medan befintlig radar och kamera behålls.',
    },
    warning: {
      en: 'This retrofit requires moving sensitive front camera and mid-range radar sensors into the new panel. If the sensors are misaligned during swap, safety systems (Pilot Assist, Collision Avoidance) will throw faults or fail. Proper professional calibration via VIDA at a certified Polestar Service Point is highly recommended.',
      sv: 'Denna eftermontering kräver att de känsliga främre kamera- och radarsensorerna flyttas till den nya panelen. Om sensorerna hamnar snett under bytet kommer säkerhetssystemen (Pilot Assist, Collision Avoidance) att kasta felkoder eller sluta fungera. Professionell kalibrering via VIDA hos en auktoriserad Polestar-verkstad rekommenderas starkt.',
    },
    partNumbers: [
      {
        label: {
          en: 'SmartZone Front Panel (Facelift Cover)',
          sv: 'SmartZone Frontpanel (Facelift-kåpa)',
        },
        number: '32228862',
        note: {
          en: 'May be superseded. Color-specific variants exist — verify with VIN.',
          sv: 'Kan vara ersatt. Färgspecifika varianter finns — verifiera med VIN.',
        },
      },
      {
        label: {
          en: 'Pre-Facelift Front Grille (Original)',
          sv: 'Före-facelift Frontgrill (Original)',
        },
        number: '31663679',
        note: {
          en: 'Reference only — the part being replaced.',
          sv: 'Endast referens — delen som byts ut.',
        },
      },
      {
        label: {
          en: 'Front Mid-Range Radar Sensor Module',
          sv: 'Främre Mellandistansradarsensor',
        },
        number: '32134966',
        note: {
          en: 'May be superseded by 32315667 on later builds. Always confirm with your VIN.',
          sv: 'Kan vara ersatt av 32315667 på senare byggen. Bekräfta alltid med ditt VIN.',
        },
      },
    ],
    steps: {
      en: [
        'Consult your local Polestar Extras shop or service center to confirm parts availability for your specific VIN.',
        'Remove the front bumper assembly to access the grille mounting clips and sensor brackets.',
        'Carefully disconnect the wiring harness and unbolt the mid-range radar and front parking camera from the original grille.',
        'Install the new body-colored SmartZone cover panel and bolt the sensors into the new mounting bracket array.',
        'Reassemble the front bumper and schedule a safety system calibration (VMCU and ADAS alignment) via Volvo/Polestar VIDA service software.',
      ],
      sv: [
        'Kontakta din lokala Polestar Extras-butik eller verkstad för att bekräfta tillgängligheten av delar för ditt specifika chassinummer (VIN).',
        'Demontera den främre stötfångaren för att komma åt grillens fästklämmor och sensorfästen.',
        'Koppla försiktigt ur kablaget och skruva loss radar- och parkeringskameran från originalgrillen.',
        'Montera den nya karossfärgade SmartZone-panelen och skruva fast sensorerna i de nya fästena.',
        'Montera tillbaka främre stötfångaren och boka tid för kalibrering av säkerhetssystemen (VMCU och ADAS-inriktning) via Volvo/Polestar VIDA-programvaran.',
      ],
    },
  },
  {
    id: 'tow-bar',
    category: 'oem',
    title: {
      en: 'Semi-Electric Folding Tow Bar Retrofit',
      sv: 'Halvautomatisk Fällbar Dragkrok Retrofit',
    },
    feasibility: 'expert',
    description: {
      en: 'Retrofit the OEM semi-electric, retractable tow bar assembly onto vehicles not originally equipped. The system integrates with Trailer Stability Assist (TSA), automated trailer light checks, and dashboard trailer warnings. This is an extensive installation requiring bumper removal, chassis mounting, wiring harness routing from rear to front, and mandatory VIDA software activation at a Polestar Service Point.',
      sv: 'Eftermontera den originala halvautomatiska, infällbara dragkroken på fordon som inte ursprungligen var utrustade. Systemet integreras med Trailer Stability Assist (TSA), automatisk kontroll av släpvagnsbelysning och instrumentpanelsvarningar. Installation kräver demontering av stötfångare, chassimontering, kabeldragning bakifrån och framåt, samt obligatorisk VIDA-mjukvaruaktivering hos en Polestar-verkstad.',
    },
    warning: {
      en: 'This is a safety-critical component. The Trailer Module (TRM) must be activated via VIDA to integrate with the CAN bus — the hardware will not function without this dealer-performed software step. Aftermarket alternatives (e.g. EcoHitch) exist for bike rack use but lack electronic integration, TSA, and the folding mechanism.',
      sv: 'Detta är en säkerhetskritisk komponent. Trailermodulen (TRM) måste aktiveras via VIDA för att integreras med CAN-bussen — hårdvaran fungerar inte utan detta mjukvarusteg som utförs av verkstad. Eftermarknadslösningar (t.ex. EcoHitch) finns för cykelhållare men saknar elektronisk integration, TSA och fällmekanism.',
    },
    partNumbers: [
      {
        label: {
          en: 'Tow Bar Assembly Kit',
          sv: 'Dragkrokssats',
        },
        number: '32414268',
        note: {
          en: 'Latest revision. Earlier revisions include 32207226, 32270344. Always confirm with VIN.',
          sv: 'Senaste revision. Tidigare versioner inkluderar 32207226, 32270344. Bekräfta alltid med VIN.',
        },
      },
      {
        label: {
          en: 'Tow Bar Wiring Harness',
          sv: 'Dragkrok Kablage',
        },
        number: '32386674',
        note: {
          en: 'Harness routes from rear to front. May vary by model year.',
          sv: 'Kablage dras bakifrån och framåt. Kan variera beroende på årsmodell.',
        },
      },
    ],
    steps: {
      en: [
        'Contact your Polestar Service Point with your VIN to order the correct tow bar kit and confirm software activation availability.',
        'Remove the rear bumper fascia, rear diffuser panel, and undertray to access the chassis mounting points.',
        'Install the tow bar frame assembly onto the chassis cross-member using the supplied bolts and torque to specification.',
        'Route the trailer wiring harness from the rear connector through the underbody, interior floor channels, and into the front electrical junction box.',
        'Reinstall the bumper fascia — the lower section may require a factory cutout or trimming to accommodate the folding mechanism.',
        'Have a Polestar Service Point perform the mandatory VIDA software activation to register the Trailer Module (TRM) on the CAN bus and enable TSA and trailer light checks.',
      ],
      sv: [
        'Kontakta din Polestar-verkstad med ditt VIN för att beställa rätt dragkrokssats och bekräfta att mjukvaruaktivering finns tillgänglig.',
        'Ta bort den bakre stötfångarplasten, diffusorpanelen och underplåten för att komma åt chassits monteringspunkter.',
        'Montera dragkroksramen på chassits tvärbalk med medföljande bultar och dra åt till specificerat moment.',
        'Dra släpvagnskablaget från den bakre kontakten genom underdelen av kaross, invändiga golvkanaler och fram till den främre eldosan.',
        'Montera tillbaka stötfångarplasten — den nedre delen kan kräva en fabriksurskärning eller trimning för att passa fällmekanismen.',
        'Låt en Polestar-verkstad utföra den obligatoriska VIDA-mjukvaruaktiveringen för att registrera trailermodulen (TRM) på CAN-bussen och aktivera TSA och kontroll av släpvagnsbelysning.',
      ],
    },
  },
  {
    id: 'fitcamx-dashcam',
    category: 'aftermarket',
    title: {
      en: 'FitCamX Integrated Dash Cam',
      sv: 'FitCamX Integrerad Dashkamera',
    },
    feasibility: 'easy',
    description: {
      en: 'Replace the plastic sensor cover behind the rearview mirror with a FitCamX dash cam module that looks factory-integrated. The unit is designed specifically for the Polestar 2 and connects to the existing wiring harness for a clean, OEM-look installation with no visible cables. An optional rear camera can be added by routing a cable through the headliner.',
      sv: 'Byt ut plastskyddet bakom backspegeln mot en FitCamX-dashkamera som ser fabriksintegrerad ut. Enheten är specifikt designad för Polestar 2 och ansluts till befintligt kablage för en ren, OEM-liknande installation utan synliga kablar. En valfri bakre kamera kan läggas till genom att dra en kabel genom takhimlen.',
    },
    steps: {
      en: [
        'Purchase the FitCamX kit for Polestar 2 (confirm your model year for correct fitment).',
        'Carefully pry off the existing plastic sensor cover behind the rearview mirror using a non-marring trim tool.',
        'Disconnect the factory harness connector and plug in the FitCamX adapter cable.',
        'Snap the FitCamX camera module into place — it replaces the original cover for a seamless look.',
        'Insert a microSD card and configure recording settings via the FitCamX app.',
        '(Optional) Route the rear camera cable along the headliner, through the rubber conduit in the rear hatch, and mount the rear unit on the back glass.',
      ],
      sv: [
        'Köp FitCamX-satsen för Polestar 2 (bekräfta din årsmodell för korrekt passning).',
        'Bänd försiktigt loss det befintliga plastskyddet bakom backspegeln med ett skonsamt bändverktyg.',
        'Koppla bort det ursprungliga kablaget och anslut FitCamX-adapterkabeln.',
        'Klicka fast FitCamX-kameramodulen på plats — den ersätter det ursprungliga skyddet för ett sömlöst utseende.',
        'Sätt i ett microSD-kort och konfigurera inspelningsinställningarna via FitCamX-appen.',
        '(Valfritt) Dra den bakre kamerakabeln längs takhimlen, genom gummikonduiten i bakluckan, och montera den bakre enheten på bakrutan.',
      ],
    },
  },
  {
    id: 'puddle-lights',
    category: 'aftermarket',
    title: {
      en: 'Door Puddle Light Logo Projectors',
      sv: 'Dörrbelysning med Logotypprojektion',
    },
    feasibility: 'easy',
    description: {
      en: 'Swap the standard door puddle lights for custom projector modules that display the Polestar logo on the ground when the door opens. On vehicles equipped with factory door lights, this is a direct plug-and-play replacement — simply pull out the old light module and click in the new projector unit.',
      sv: 'Byt ut de vanliga dörrbelysningarna mot projektorer som visar Polestars logotyp på marken när dörren öppnas. På fordon med fabriksmonterad dörrbelysning är detta en direkt plug-and-play-byte — dra ut den gamla ljusmodulen och klicka i den nya projektorenheten.',
    },
    warning: {
      en: 'If your specific trim did not include factory puddle lights, the necessary wiring may be absent behind the door cards. In that case, installation becomes significantly more complex and may require door panel removal and wiring work.',
      sv: 'Om din specifika utrustningsnivå inte inkluderade fabriksmonterad dörrbelysning kan nödvändigt kablage saknas bakom dörrpanelerna. I så fall blir installationen betydligt mer komplex och kan kräva demontering av dörrpanelen och kabeldragning.',
    },
    steps: {
      en: [
        'Confirm your vehicle has factory door puddle lights by checking under the open door for existing light modules.',
        'Purchase projector units compatible with the Polestar 2 door light socket.',
        'Use a non-marring trim tool to carefully pry out the existing puddle light module from the door card.',
        'Insert the new projector module into the socket — it should click firmly into place.',
        'Open the door to test projection alignment and brightness on the ground.',
      ],
      sv: [
        'Bekräfta att ditt fordon har fabriksmonterad dörrbelysning genom att kontrollera under den öppna dörren efter befintliga ljusmoduler.',
        'Köp projektorenheter som passar Polestar 2:s dörrbelysningssockel.',
        'Använd ett skonsamt bändverktyg för att försiktigt lossa den befintliga dörrbelysningsmodulen från dörrpanelen.',
        'Sätt i den nya projektormodulen i sockeln — den ska klicka fast ordentligt.',
        'Öppna dörren för att testa projiceringens riktning och ljusstyrka mot marken.',
      ],
    },
  },
  {
    id: 'ceramic-tint',
    category: 'aftermarket',
    title: {
      en: 'Ceramic Window Tint',
      sv: 'Keramisk Fönsterfilm',
    },
    feasibility: 'medium',
    description: {
      en: 'Apply professional-grade ceramic window tint to side windows and the panoramic glass roof for superior infrared heat rejection, 99% UV protection, and glare reduction. Ceramic film does not interfere with GPS, cellular, key fob, or Phone-as-Key signals — critical for the Polestar 2. The panoramic roof already has some factory UV filtering, but additional ceramic tint dramatically improves cabin comfort in warm climates and reduces HVAC load, helping preserve range.',
      sv: 'Applicera professionell keramisk fönsterfilm på sidorutor och det panoramiska glastaket för överlägsen infraröd värmeavvisning, 99% UV-skydd och bländningsreducering. Keramisk film stör inte GPS, mobilnät, nyckelbricka eller Phone-as-Key-signaler — avgörande för Polestar 2. Panoramaglastaket har visst fabriksmonterat UV-skydd, men extra keramisk film förbättrar kupékomforten dramatiskt i varma klimat och minskar HVAC-belastningen, vilket bidrar till bättre räckvidd.',
    },
    steps: {
      en: [
        'Choose a reputable ceramic tint brand and shade level (e.g. 35% sides, 70% windshield strip). Check local tint laws for your jurisdiction.',
        'Clean all glass surfaces thoroughly to ensure a lint- and debris-free bonding surface.',
        'Apply the film to side windows and rear glass using a wet application method with a slip solution.',
        'For the panoramic roof, use a single-piece film cut to match the glass dimensions. Work carefully to avoid bubbles and creases.',
        'Allow 3–5 days of curing time before rolling down windows. Avoid car washes during this period.',
      ],
      sv: [
        'Välj ett välrenommerat keramiskt filmvarumärke och mörkningsgrad (t.ex. 35% sidor, 70% vindruta). Kontrollera lokala regler för filmade rutor.',
        'Rengör alla glasytor noggrant för att säkerställa en lintfri och smutsbefriad yta.',
        'Applicera filmen på sidorutor och bakruta med en våtapplikationsmetod och glidsolution.',
        'Använd en enstycksfilm skuren för att matcha glasets dimensioner för panoramaglastaket. Arbeta försiktigt för att undvika bubblor och veck.',
        'Tillåt 3–5 dagars härdningstid innan rutorna fälls ner. Undvik biltvätt under denna period.',
      ],
    },
  },
  {
    id: 'frunk-led',
    category: 'diyCoding',
    title: {
      en: 'Frunk LED Lighting Upgrade',
      sv: 'Frunk LED-belysningsuppgradering',
    },
    feasibility: 'easy',
    description: {
      en: 'The Polestar 2 frunk lacks adequate factory lighting, making it difficult to see contents at night. A self-adhesive LED strip or battery-operated motion-sensing LED bar can be installed in minutes for dramatically improved visibility. For a permanent solution, tap into a switched 12V source using proper automotive connectors.',
      sv: 'Polestar 2:s frunk saknar tillräcklig fabriksbelysning, vilket gör det svårt att se innehållet på natten. En självhäftande LED-list eller batteridriven rörelsestyrd LED-lampa kan monteras på några minuter för dramatiskt förbättrad synlighet. För en permanent lösning, anslut till en switchad 12V-källa med korrekta fordonskontakter.',
    },
    warning: {
      en: "If you splice into the vehicle's 12V wiring, use proper automotive-grade connectors (e.g. TE connectors) rather than bare wire splices. Incorrect wiring in the frunk area could affect warranty coverage. Battery-operated alternatives avoid this risk entirely.",
      sv: 'Om du ansluter till fordonets 12V-kablage, använd korrekta fordonskontakter (t.ex. TE-kontakter) istället för lösa skarvar. Felaktig kabeldragning i frunk-området kan påverka garantin. Batteridrivna alternativ undviker denna risk helt.',
    },
    steps: {
      en: [
        'Choose your lighting method: self-adhesive LED strip (12V wired), USB-powered LED bar, or battery-operated motion-sensor light.',
        'Clean the mounting surface inside the frunk lid or upper lip with isopropyl alcohol.',
        'Peel the adhesive backing and firmly press the LED strip or light bar into place along the upper edge of the frunk opening.',
        'For wired installations: route the power cable to a switched 12V source using proper TE or Posi-Tap connectors. For battery/USB: simply position the unit and ensure a secure mount.',
        'Close and reopen the frunk to verify even illumination coverage.',
      ],
      sv: [
        'Välj belysningsmetod: självhäftande LED-list (12V-ansluten), USB-driven LED-lampa eller batteridriven rörelsesensorlampa.',
        'Rengör monteringsytan inuti frunkluckan eller den övre kanten med isopropylalkohol.',
        'Dra av det självhäftande skyddet och tryck fast LED-listen eller ljusrampen längs överkanten av frunkens öppning.',
        'För kablade installationer: dra strömkabeln till en switchad 12V-källa med korrekta TE- eller Posi-Tap-kontakter. För batteri/USB: placera enheten och säkerställ ett säkert fäste.',
        'Stäng och öppna frunken igen för att verifiera jämn belysning.',
      ],
    },
  },
];

export default function RetrofitsImprovements() {
  const { locale, t } = useLocale();
  const [activeCategory, setActiveCategory] = useState<'all' | 'oem' | 'aftermarket' | 'diyCoding'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPerformanceBoosted, setIsPerformanceBoosted] = useState(false);

  const isSv = locale === 'sv';

  const filteredItems = retrofitsData.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getFeasibilityLabel = (level: string) => {
    switch (level) {
      case 'easy':
        return t('feasibilityEasy');
      case 'medium':
        return t('feasibilityMedium');
      case 'hard':
        return t('feasibilityHard');
      case 'expert':
        return t('feasibilityExpert');
      default:
        return level;
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--ps-border)] pb-4">
        {(
          [
            { id: 'all', label: t('categoryAll') },
            { id: 'oem', label: t('categoryOem') },
            { id: 'aftermarket', label: t('categoryAftermarket') },
            { id: 'diyCoding', label: t('categoryDiyCoding') },
          ] as const
        ).map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 text-[12px] uppercase tracking-wider transition-all duration-150 border rounded-none"
              style={{
                borderColor: isActive ? 'var(--ps-text)' : 'transparent',
                backgroundColor: isActive ? 'var(--ps-pill-active-bg)' : 'transparent',
                color: isActive ? 'var(--ps-pill-active-text)' : 'var(--ps-text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--ps-bg-secondary)';
                  e.currentTarget.style.color = 'var(--ps-text)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--ps-text-secondary)';
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid Layout of Retrofit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const titleText = isSv ? item.title.sv : item.title.en;
          const descText = isSv ? item.description.sv : item.description.en;
          const warningText = item.warning ? (isSv ? item.warning.sv : item.warning.en) : null;
          const stepsList = item.steps ? (isSv ? item.steps.sv : item.steps.en) : null;

          return (
            <div
              key={item.id}
              className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-5 rounded-none flex flex-col justify-between transition-all duration-200 hover:border-[var(--ps-text-secondary)]"
            >
              <div className="space-y-4">
                {/* Badge Category */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 border border-[var(--ps-border)]"
                    style={{
                      color:
                        item.category === 'oem'
                          ? 'var(--ps-gold)'
                          : item.category === 'aftermarket'
                          ? 'var(--ps-text-secondary)'
                          : 'var(--ps-text)',
                      backgroundColor: 'var(--ps-bg-secondary)/10',
                    }}
                  >
                    {item.category === 'oem'
                      ? t('oemUpgrade')
                      : item.category === 'aftermarket'
                      ? t('aftermarket')
                      : t('diyCoding')}
                  </span>

                  {/* Feasibility Difficulty Badge */}
                  <span className="text-[11px]" style={{ color: 'var(--ps-text-tertiary)' }}>
                    {getFeasibilityLabel(item.feasibility)}
                  </span>
                </div>

                <h3 className="text-[17px] font-medium" style={{ color: 'var(--ps-text)' }}>
                  {titleText}
                </h3>

                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                  {descText}
                </p>

                {/* Specific Warning Box */}
                {warningText && (
                  <div className="p-3 bg-[var(--ps-bg-secondary)]/30 border border-[var(--ps-border)] flex gap-2.5 rounded-none">
                    <ShieldAlert size={14} className="text-[var(--ps-gold)] shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
                      {warningText}
                    </p>
                  </div>
                )}

                {/* Expanded content / steps */}
                {isExpanded && stepsList && (
                  <div className="pt-4 border-t border-[var(--ps-border-light)] space-y-2.5">
                    <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                      Instructions / Steps:
                    </h5>
                    <ol className="list-decimal pl-4 text-[12.5px] space-y-2" style={{ color: 'var(--ps-text-secondary)' }}>
                      {stepsList.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Part Numbers Table */}
                {isExpanded && item.partNumbers && item.partNumbers.length > 0 && (
                  <div className="pt-4 border-t border-[var(--ps-border-light)] space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Package size={13} className="text-[var(--ps-text-tertiary)]" />
                      <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
                        {isSv ? 'Referensartikelnummer' : 'Reference Part Numbers'}
                      </h5>
                    </div>
                    <div className="space-y-2">
                      {item.partNumbers.map((pn, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 p-2.5 bg-[var(--ps-bg-secondary)]/20 border border-[var(--ps-border)] rounded-none"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-[12px] font-medium block" style={{ color: 'var(--ps-text)' }}>
                              {isSv ? pn.label.sv : pn.label.en}
                            </span>
                            {pn.note && (
                              <span className="text-[10.5px] leading-snug block mt-0.5" style={{ color: 'var(--ps-text-tertiary)' }}>
                                {isSv ? pn.note.sv : pn.note.en}
                              </span>
                            )}
                          </div>
                          <code
                            className="text-[12px] font-mono font-semibold shrink-0 px-2 py-0.5 border border-[var(--ps-border)] bg-[var(--ps-bg)] select-all"
                            style={{ color: 'var(--ps-gold)' }}
                          >
                            {pn.number}
                          </code>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] leading-relaxed italic" style={{ color: 'var(--ps-text-tertiary)' }}>
                      {isSv
                        ? '⚠ Artikelnummer kan ersättas av nyare versioner utan förvarning. Bekräfta alltid korrekt nummer genom att uppge ditt VIN hos en auktoriserad Polestar-verkstad eller Volvo Parts-portal.'
                        : '⚠ Part numbers may be superseded without notice. Always confirm the correct number by providing your VIN to an authorized Polestar Service Point or Volvo Parts portal.'}
                    </p>
                  </div>
                )}
              </div>

              {stepsList && (
                <div className="mt-5 pt-4 border-t border-[var(--ps-border-light)] flex items-center justify-end">
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[var(--ps-border)] text-[11px] uppercase tracking-wider hover:border-[var(--ps-text)] transition-colors rounded-none"
                    style={{ color: 'var(--ps-text-secondary)' }}
                  >
                    {isExpanded ? (
                      <>
                        Hide steps <ChevronUp size={11} />
                      </>
                    ) : (
                      <>
                        View steps <ChevronDown size={11} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* OEM Performance Software Upgrade OTA Widget */}
      <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-6 rounded-none space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1 md:max-w-2xl">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-[var(--ps-gold)] font-semibold animate-pulse" />
              <h3 className="text-[18px] font-semibold" style={{ color: 'var(--ps-text)' }}>
                {t('perfSoftwareTitle')}
              </h3>
            </div>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
              {t('perfSoftwareDesc')}
            </p>
          </div>

          <div className="shrink-0 flex items-center self-start">
            <button
              onClick={() => setIsPerformanceBoosted((b) => !b)}
              className="px-4 py-2 text-[11px] uppercase tracking-widest font-normal transition-all duration-200 border rounded-none"
              style={{
                backgroundColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'transparent',
                borderColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-border)',
                color: isPerformanceBoosted ? '#000000' : 'var(--ps-text)',
              }}
            >
              {isPerformanceBoosted ? 'Active: +68 HP / +20 Nm' : 'Toggle OTA Upgrade'}
            </button>
          </div>
        </div>

        {/* Visual Bar Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--ps-border-light)]">
          {/* Power comparison */}
          <div className="space-y-3">
            <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
              Total Output Power (kW)
            </h5>
            <div className="space-y-2">
              {/* Standard */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: 'var(--ps-text-secondary)' }}>{t('standardPower')}</span>
                  <span className="font-semibold" style={{ color: 'var(--ps-text)' }}>300 kW (408 hp)</span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="bg-[var(--ps-text-secondary)] h-full transition-all duration-500"
                    style={{ width: '85%' }}
                  />
                </div>
              </div>

              {/* Upgraded */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)' }}>
                    {t('upgradedPower')}
                  </span>
                  <span className="font-semibold" style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text)' }}>
                    350 kW (476 hp)
                  </span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: isPerformanceBoosted ? '100%' : '85%',
                      backgroundColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Torque comparison */}
          <div className="space-y-3">
            <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
              Engine Torque (Nm)
            </h5>
            <div className="space-y-2">
              {/* Standard */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: 'var(--ps-text-secondary)' }}>{t('standardTorque')}</span>
                  <span className="font-semibold" style={{ color: 'var(--ps-text)' }}>660 Nm</span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="bg-[var(--ps-text-secondary)] h-full transition-all duration-500"
                    style={{ width: '91%' }}
                  />
                </div>
              </div>

              {/* Upgraded */}
              <div className="space-y-1">
                <div className="flex justify-between text-[12px] font-light">
                  <span style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)' }}>
                    {t('upgradedTorque')}
                  </span>
                  <span className="font-semibold" style={{ color: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text)' }}>
                    680 Nm
                  </span>
                </div>
                <div className="w-full bg-[var(--ps-bg-secondary)] h-[4px]">
                  <div
                    className="h-full transition-all duration-700 ease-out"
                    style={{
                      width: isPerformanceBoosted ? '100%' : '91%',
                      backgroundColor: isPerformanceBoosted ? 'var(--ps-gold)' : 'var(--ps-text-secondary)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Orbit & Coding Guide block */}
      <div className="border border-[var(--ps-border)] bg-[var(--ps-bg)] p-6 rounded-none space-y-4">
        <div className="flex items-center gap-2">
          <Cpu size={16} className="text-[var(--ps-text-secondary)]" />
          <h3 className="text-[18px] font-semibold" style={{ color: 'var(--ps-text)' }}>
            {t('orbitGuideTitle')}
          </h3>
        </div>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('orbitGuideDesc')}
        </p>

        <ul className="space-y-2 text-[13px] pl-5 list-disc" style={{ color: 'var(--ps-text-secondary)' }}>
          <li>
            <strong style={{ color: 'var(--ps-text)' }}>{t('pixelActivation')}</strong>
          </li>
          <li>
            <strong style={{ color: 'var(--ps-text)' }}>{t('pilotAssistEnable')}</strong>
          </li>
          <li>
            <strong style={{ color: 'var(--ps-text)' }}>{t('regionChange')}</strong>
          </li>
        </ul>

        <div className="bg-[var(--ps-bg-secondary)]/30 p-4 rounded-none space-y-1">
          <h5 className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: 'var(--ps-text-tertiary)' }}>
            {t('obdHardwareTitle')}
          </h5>
          <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
            {t('obdHardwareDesc')}
          </p>
        </div>
      </div>

      {/* Bottom Disclaimer Box */}
      <div
        className="mt-6 rounded-none p-5 border border-[var(--ps-border)] relative overflow-hidden"
        style={{ backgroundColor: 'var(--ps-bg-info)' }}
      >
        {/* Subtle corner design detail */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[var(--ps-border)] opacity-35" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[var(--ps-border)] opacity-35" />

        <h4 className="text-[13px] font-semibold mb-2" style={{ color: 'var(--ps-text)' }}>
          {t('disclaimerTitle')}
        </h4>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--ps-text-secondary)' }}>
          {t('retrofitsDisclaimer')}
        </p>
      </div>
    </div>
  );
}
