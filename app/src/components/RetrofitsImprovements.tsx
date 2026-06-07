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
      sv: 'Mjukvaruaktivering av Pixel-helljus (USA/Kanada)',
    },
    feasibility: 'hard',
    description: {
      en: 'Enable steering-responsive adaptive headlights that dynamically dim individual pixel sections to prevent glare for oncoming drivers. This software deactivation was specific to North American (US/Canada) vehicles due to old FMVSS 108 regulatory bans. Note that the physical Pixel LED hardware must be present (MY21 Launch Edition or MY22-MY23 Pilot pack). Cars with Pilot Lite packages lack the hardware arrays.',
      sv: 'Aktivera adaptiva strålkastare (kurvljus) som dynamiskt släcker enskilda pixel-sektioner för att inte blända mötande fordon. Mjukvaran deaktiverades för den nordamerikanska marknaden (USA/Kanada) på grund av dåvarande FMVSS 108-regler. Obs: Strålkastarna måste ha fysisk Pixel LED-hårdvara installerad (standard på MY21 Launch Edition samt ingår i Pilot-paketet på MY22–MY23). Bilar med Pilot Lite-paket saknar denna hårdvara.',
    },
    warning: {
      en: 'Adaptive beam functions were disabled by default on US/Canadian cars. Enabling this feature via CCF modification will be overwritten whenever the vehicle receives an official OTA software update from Polestar, requiring you to re-apply the coding change.',
      sv: 'Adaptiva helljusfunktioner var avaktiverade från fabrik på bilar för USA/Kanada. Om funktionen aktiveras via CCF-kodning kommer den att skrivas över och återställas varje gång bilen får en officiell mjukvaruuppdatering (OTA) från Polestar, vilket innebär att kodningen måste göras om.',
    },
    steps: {
      en: [
        'Verify physical headlamps feature the "Polestar Pixel Technology" lettering on the inner bezel.',
        'Connect an OBD2 cable/adapter to the vehicle OBD port.',
        'Use third-party Car Configuration File (CCF) editing tools (like Orbit) to change the Headlight Configuration value to Pixel Adaptive.',
        'Perform an ECU reset (CEM and VMCU) to apply and index the new headlight settings.',
      ],
      sv: [
        'Kontrollera att strålkastarhusen har texten "Polestar Pixel Technology" präglad på den inre ramen.',
        'Anslut en OBD2-kabel eller adapter till bilens OBD-port.',
        'Använd ett tredjepartsverktyg för CCF-modifiering (Car Configuration File), exempelvis Orbit, och ändra värdet för strålkastarkonfiguration till "Pixel Adaptive".',
        'Utför en omstart (reset) av styrenheterna CEM och VMCU för att tillämpa och spara de nya strålkastarinställningarna.',
      ],
    },
  },
  {
    id: 'kick-sensor',
    category: 'oem',
    title: {
      en: 'Power Tailgate Kick Sensor Retrofit (FMDM)',
      sv: 'Eftermontering av kicksensor för baklucka (FMDM)',
    },
    feasibility: 'hard',
    description: {
      en: 'Retrofit the Foot Movement Detection Module (FMDM) that was omitted from select late MY22 and early MY23 Polestar 2 vehicles due to the global semiconductor shortage. Some affected vehicles have the rear bumper wiring harness pre-installed with a dummy connector, but many do not — the harness may lack the required Power, Ground, and LIN bus lines. After hardware installation, the Central Electronic Module (CEM) must be software-configured to recognize the new sensor before the kick-to-open function will activate.',
      sv: 'Eftermontering av Foot Movement Detection Module (FMDM), en sensor som togs bort på vissa sent producerade MY22- och tidiga MY23-bilar på grund av den globala halvledarbristen. En del av dessa bilar har kablaget i den bakre stötfångaren förberett med en blindkontakt, men många saknar anslutningar för ström, jord och LIN-buss. Efter att hårdvaran installerats måste bilens centrala styrenhet (CEM) konfigureras för att känna igen den nya sensorn innan öppning med fotrörelse kan fungera.',
    },
    warning: {
      en: 'This is not a simple plug-and-play installation. The FMDM communicates over the LIN bus with the CEM, and incorrect wiring can cause tailgate system faults or interfere with other vehicle modules. Modifying CEM configuration may affect your warranty. Check with your Polestar Service Point first — many affected vehicles are eligible for a free official retrofit under an open service campaign.',
      sv: 'Detta är inte en ren plug-and-play-installation. FMDM-modulen kommunicerar via LIN-buss med CEM. Felaktig inkoppling kan störa bakluckans styrsystem eller andra styrdon i bilen. Modifiering av CEM-konfigurationen kan påverka garantin. Kontrollera med en auktoriserad Polestar-verkstad först, då många drabbade bilar omfattas av en kostnadsfri eftermonteringskampanj från fabriken.',
    },
    partNumbers: [
      {
        label: {
          en: 'Foot Movement Detection Module (FMDM)',
          sv: 'Styrenhet för fotrörelsesensor (FMDM)',
        },
        number: '32337498',
        note: {
          en: 'Primary OEM part. May be superseded — verify with VIN.',
          sv: 'Originalartikelnummer (OEM). Kan ha ersatts av nyare nummer — kontrollera mot chassinummer (VIN).',
        },
      },
      {
        label: {
          en: 'FMDM Module (Alternate / Earlier Revision)',
          sv: 'FMDM-modul (Alternativ / Tidigare utförande)',
        },
        number: '32252119',
        note: {
          en: 'Earlier revision number referenced in some service bulletins.',
          sv: 'Tidigare artikelnummer som kan förekomma i äldre tekniska servicemeddelanden.',
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
        'Kontakta en auktoriserad Polestar-verkstad och uppge ditt chassinummer (VIN) för att kontrollera om bilen omfattas av gratis fabriksåtgärd innan du påbörjar ett eget eftermonteringsförsök.',
        'Köp FMDM-modulen samt de två tillhörande antennsensorerna. Kontrollera att bilens 12V-batteri är fulladdat eller anslutet till en underhållsladdare under arbetet.',
        'Demontera den nedre plastpanelen på bakre stötfångaren för att komma åt monteringsplatsen och stötfångarens kablage.',
        'Kontrollera om kablaget har en förberedd blindkontakt. Om kontakt saknas måste du själv dra ström-, jord- och LIN-busskablar från bakre säkringsboxen till stötfångaren. Se bilens kopplingsschema för respektive årsmodell.',
        'Montera sensorns antennrör i fästklämmorna på insidan av stötfångarhöljet och anslut modulen till kablaget.',
        'Aktivera kicksensorn i CEM med hjälp av ett CCF-verktyg (t.ex. Orbit via OBD2) eller låt en verkstad göra det via VIDA. Hårdvaran fungerar inte innan mjukvarukonfigurationen är uppdaterad.',
        'Montera tillbaka stötfångarpanelerna och testa funktionen genom att stå ca 1 meter bakom bilen med nyckeln på dig och göra en svepande fotrörelse under mitten av stötfångaren.',
      ],
    },
  },
  {
    id: 'magsafe-charging',
    category: 'aftermarket',
    title: {
      en: 'MagSafe Console Wireless Charger Upgrade',
      sv: 'Trådlös MagSafe-laddare för mittkonsol',
    },
    feasibility: 'easy',
    description: {
      en: 'The standard OEM wireless charging pad is slow, generates significant heat, and allows devices to slide off on turns. Upgrading to a custom 3D-printed MagSafe tray mount provides fast, stable charging and holds the phone securely.',
      sv: 'Bilen har en trådlös laddplatta som standard, men den laddar långsamt, alstrar mycket värme och telefonen glider lätt ur läge vid svängar. En uppgradering till ett modellanpassat, 3D-utskrivet MagSafe-fack ger snabbare och mer stabil laddning samtidigt som magneterna håller telefonen säkert på plats.',
    },
    steps: {
      en: [
        'Print or purchase a custom center console wireless charging replacement insert.',
        'Insert a standard 15W MagSafe magnetic puck into the designated circular cutout.',
        'Route the USB-C power wire under the trim to the console USB ports.',
        'Place the assembly in the wireless charging slot for a flush, OEM-like look.',
      ],
      sv: [
        'Skriv ut eller köp en modellanpassad insats för mittkonsolens laddfack.',
        'Montera en standard 15 W MagSafe-laddare i det runda urtaget i insatsen.',
        'Dra USB-kabeln dolt under mittkonsolens sidopaneler fram till USB-portarna.',
        'Lägg ned hela insatsen i laddfacket för en sömlös och fabriksliknande integration.',
      ],
    },
  },
  {
    id: 'mudflaps',
    category: 'aftermarket',
    title: {
      en: 'Fitted Contoured Mud Guards',
      sv: 'Formanpassade stänkskydd',
    },
    feasibility: 'easy',
    description: {
      en: 'Polestar 2 paint is susceptible to stone chips and road debris damage along the lower sills and rear wheel arches due to the flared body styling. Fitted aftermarket mud guards offer subtle, functional protection.',
      sv: 'Polestar 2 har en utställd karossform som gör att lacken på trösklar och bakre skärmar är mycket utsatt för stenskott och stänk från framhjulen. Modellanpassade eftermarknadsstänkskydd ger ett diskret och effektivt skydd för lacken.',
    },
  },
  {
    id: 'console-insert',
    category: 'diyCoding',
    title: {
      en: 'Dual-Tier Center Armrest Organizer',
      sv: 'Insatslåda till armstödsfack',
    },
    feasibility: 'easy',
    description: {
      en: 'A drop-in divider tray designed specifically for the deep under-armrest storage well. It creates a practical upper shelf for sunglasses, keys, and coins while leaving the lower main compartment accessible.',
      sv: 'Ett förvaringsfack (insats) speciellt framtaget för det djupa utrymmet under mittarmstödet. Det skapar en praktisk övre hylla för solglasögon, nycklar och mynt samtidigt som det undre huvudfacket förblir lättåtkomligt.',
    },
  },
  {
    id: 'orbit-obd2',
    category: 'diyCoding',
    title: {
      en: 'Orbit Car Configuration Coding',
      sv: 'Programmering och CCF-ändringar via Orbit',
    },
    feasibility: 'medium',
    description: {
      en: 'Modify your vehicle Car Configuration File (CCF) using Orbit software. This utility lets you connect your computer to the OBD port to unlock factory features that were disabled in your region, modify lighting patterns, or configure pilot package upgrades.',
      sv: 'Modifiera bilens konfigurationsfil (CCF) med programvaran Orbit. Detta verktyg låter dig ansluta en dator till OBD-porten för att låsa upp fabriksfunktioner som kan vara inaktiverade för din marknad, ändra belysningsmönster eller konfigurera eftermonterade förarassistanspaket.',
    },
    steps: {
      en: [
        'Obtain a compatible OBD2 adapter (OBDLink MX+ or an ENET cable with a USB-C Ethernet adapter).',
        'Download Orbit and purchase a subscription license.',
        'Connect the adapter to the OBD2 port located in the driver-side footwell.',
        'Read current CCF configurations and make adjustments carefully. Keep a backup copy of your original configuration file.',
      ],
      sv: [
        'Införskaffa en kompatibel OBD2-adapter (exempelvis OBDLink MX+ eller en ENET-kabel ansluten via en USB-till-Ethernet-adapter).',
        'Ladda ner Orbit-mjukvaran och skaffa en prenumerationslicens.',
        'Anslut adaptern till OBD2-porten som sitter i fotutrymmet på förarsidan (ovanför pedalerna).',
        'Läs av bilens nuvarande CCF-konfiguration och utför ändringar med stor försiktighet. Spara alltid en säkerhetskopia av din originalkonfiguration innan du skriver nya värden.',
      ],
    },
  },
  {
    id: 'smartzone-grille',
    category: 'oem',
    title: {
      en: 'Official SmartZone Front Panel Upgrade (Facelift Retrofit)',
      sv: 'Uppgradering till SmartZone-front (eftermontering av facelift)',
    },
    feasibility: 'expert',
    description: {
      en: 'Replace the pre-facelift grid grille with the body-colored, flat SmartZone sensor panel introduced in the MY24 facelift. Offered in select markets (such as the UK) as an official aftermarket upgrade package, it refreshes the front-end styling while keeping the existing ADAS radar and front camera components functional.',
      sv: 'Ersätt den äldre ribbade grillen med den släta, karossfärgade SmartZone-panelen som introducerades vid ansiktslyftet för modellår 2024 (MY24). Detta erbjuds på vissa marknader (t.ex. Storbritannien) som ett officiellt tillbehörspaket för att ge bilen det nyare utseendet utan att påverka funktionen hos befintlig radar och framkamera.',
    },
    warning: {
      en: 'This retrofit requires moving sensitive front camera and mid-range radar sensors into the new panel. If the sensors are misaligned during swap, safety systems (Pilot Assist, Collision Avoidance) will throw faults or fail. Proper professional calibration via VIDA at a certified Polestar Service Point is highly recommended.',
      sv: 'Denna uppgradering kräver att den främre kameran samt radarsensorn flyttas över till den nya panelen. Om sensorerna hamnar utanför sina toleranser under flytten kommer bilens säkerhetssystem (t.ex. Pilot Assist och nödbromsassistent) att sätta felkoder eller sluta fungera. En professionell kalibrering via VIDA på en auktoriserad verkstad rekommenderas starkt efter montering.',
    },
    partNumbers: [
      {
        label: {
          en: 'SmartZone Front Panel (Facelift Cover)',
          sv: 'SmartZone frontpanel (facelift-kåpa)',
        },
        number: '32228862',
        note: {
          en: 'May be superseded. Color-specific variants exist — verify with VIN.',
          sv: 'Kan ha ersatts av nyare artikelnummer. Finns i olika lackfärger — kontrollera mot VIN.',
        },
      },
      {
        label: {
          en: 'Pre-Facelift Front Grille (Original)',
          sv: 'Frontgrill pre-facelift (originalgrill)',
        },
        number: '31663679',
        note: {
          en: 'Reference only — the part being replaced.',
          sv: 'Endast referens — den del som demonteras och ersätts.',
        },
      },
      {
        label: {
          en: 'Front Mid-Range Radar Sensor Module',
          sv: 'Främre radarsensor (mellandistans)',
        },
        number: '32134966',
        note: {
          en: 'May be superseded by 32315667 on later builds. Always confirm with your VIN.',
          sv: 'Kan ha ersatts av 32315667 på senare tillverkade bilar. Verifiera alltid med chassinummer.',
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
        'Kontakta en auktoriserad verkstad för att kontrollera tillgänglighet och rätt artikelnummer för ditt specifika chassinummer (VIN).',
        'Demontera främre stötfångarhöljet för att komma åt grillens clips och sensorfästen.',
        'Koppla ur kablaget och skruva försiktigt loss radarsensorn och framkameran från originalgrillen.',
        'Montera den nya SmartZone-panelen i stötfångaren och skruva fast sensorerna i de nya monteringsfästena.',
        'Montera tillbaka stötfångaren på bilen och boka tid för en fullständig kalibrering av radarsensor och kamera via VIDA.',
      ],
    },
  },
  {
    id: 'tow-bar',
    category: 'oem',
    title: {
      en: 'Semi-Electric Folding Tow Bar Retrofit',
      sv: 'Eftermontering av halv elektrisk infällbar dragkrok',
    },
    feasibility: 'expert',
    description: {
      en: 'Retrofit the OEM semi-electric, retractable tow bar assembly onto vehicles not originally equipped. The system integrates with Trailer Stability Assist (TSA), automated trailer light checks, and dashboard trailer warnings. This is an extensive installation requiring bumper removal, chassis mounting, wiring harness routing from rear to front, and mandatory VIDA software activation at a Polestar Service Point.',
      sv: 'Eftermontera Polestars semielektriska, infällbara dragkrok på bilar som saknar detta från fabrik. Systemet integreras fullt ut med bilens släpvagnsstabilisering (TSA), automatiska belysningstester samt instrumenteringens varningar. Detta är en omfattande installation som kräver demontering av bakre stötfångare, mekanisk montering i chassit, kabeldragning samt en obligatorisk mjukvaruaktivering via VIDA på en auktoriserad verkstad.',
    },
    warning: {
      en: 'This is a safety-critical component. The Trailer Module (TRM) must be activated via VIDA to integrate with the CAN bus — the hardware will not function without this dealer-performed software step. Aftermarket alternatives (e.g. EcoHitch) exist for bike rack use but lack electronic integration, TSA, and the folding mechanism.',
      sv: 'Detta är en säkerhetskritisk komponent. Styrenheten för släpvagnen (TRM) måste programmeras och aktiveras via VIDA för att kommunicerar på bilens CAN-buss — utan detta mjukvarusteg fungerar inte dragkrokens eluttag eller fällmekanism. Eftermarknadsdragkrokar (t.ex. från Brink eller EcoHitch) förekommer men saknar ofta samma djupa elektroniska integration och TSA-stöd.',
    },
    partNumbers: [
      {
        label: {
          en: 'Tow Bar Assembly Kit',
          sv: 'Infällbar dragkrok (komplett mekanisk sats)',
        },
        number: '32414268',
        note: {
          en: 'Latest revision. Earlier revisions include 32207226, 32270344. Always confirm with VIN.',
          sv: 'Senaste artikelnumret. Äldre versioner (t.ex. 32207226, 32270344) kan förekomma. Kontrollera alltid mot VIN.',
        },
      },
      {
        label: {
          en: 'Tow Bar Wiring Harness',
          sv: 'Kablage och styrenhet (TRM) för dragkrok',
        },
        number: '32386674',
        note: {
          en: 'Harness routes from rear to front. May vary by model year.',
          sv: 'Inkluderar kabelsats samt monteringsdetaljer. Kan variera beroende på modellår.',
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
        'Kontakta en auktoriserad verkstad med ditt chassinummer för att beställa rätt dragkrokssats samt boka tid för mjukvaruaktivering.',
        'Demontera bakre stötfångarhöljet, diffusorn och underredets skyddsplåtar för att frilägga monteringspunkterna i chassit.',
        'Skruva fast dragkroksbalken i bilens ramsidomedlemmar med föreskrivna bultar och dra åt med rätt åtdragningsmoment.',
        'Dra släpvagnskablaget från bakre stötfångaren in i kupén och vidare fram till elcentralen under instrumentbrädan enligt monteringsanvisningen.',
        'Montera tillbaka stötfångaren. Den nedre diffusorpanelen kan behöva skäras ut eller bytas till en panel förberedd för dragkrok.',
        'Låt en auktoriserad verkstad utföra mjukvaruprogrammeringen i VIDA för att driftsätta släpvagnsmodulen (TRM) på CAN-bussen, vilket aktiverar TSA samt instrumenteringens släpvagnsfunktioner.',
      ],
    },
  },
  {
    id: 'fitcamx-dashcam',
    category: 'aftermarket',
    title: {
      en: 'FitCamX Integrated Dash Cam',
      sv: 'FitCamX integrerad färdkamera (dashcam)',
    },
    feasibility: 'easy',
    description: {
      en: 'Replace the plastic sensor cover behind the rearview mirror with a FitCamX dash cam module that looks factory-integrated. The unit is designed specifically for the Polestar 2 and connects to the existing wiring harness for a clean, OEM-look installation with no visible cables. An optional rear camera can be added by routing a cable through the headliner.',
      sv: 'Ersätt plastkåpan bakom innerbackspegeln med en FitCamX-kamera som ser helt fabriksmonterad ut. Kameran är modellanpassad för Polestar 2 och kopplas in med en medföljande Y-kabelsplitt på bilens befintliga regnsensorkablage (ingen synlig kabeldragning krävs). En bakre kamera kan monteras som tillval genom att dra en medföljande kabel dolt längs taklinjen.',
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
        'Köp FitCamX-satsen som matchar din bils modellår (det finns skillnader på kåporna mellan olika årsmodeller).',
        'Bänd försiktigt loss den befintliga plastkåpan bakom innerbackspegeln med ett plasthandtag eller demonteringsverktyg.',
        'Koppla ur kontakten till regnsensorn och anslut FitCamX Y-kablage emellan.',
        'Klicka fast den nya kamerakåpan på plats där originalkåpan satt.',
        'Sätt i ett kompatibelt microSD-kort och anslut till kamerans Wi-Fi för att göra inställningar i FitCamX-appen.',
        'Dra (om tillämpligt) kabeln till den bakre kameran dolt under takhimlen, trä den genom bakluckans gummigenomföring och montera kameran på bakrutan.',
      ],
    },
  },
  {
    id: 'puddle-lights',
    category: 'aftermarket',
    title: {
      en: 'Door Puddle Light Logo Projectors',
      sv: 'Dörrbelysning med logoprojektion (puddle lights)',
    },
    feasibility: 'easy',
    description: {
      en: 'Swap the standard door puddle lights for custom projector modules that display the Polestar logo on the ground when the door opens. On vehicles equipped with factory door lights, this is a direct plug-and-play replacement — simply pull out the old light module and click in the new projector unit.',
      sv: 'Ersätt bilens standardmonterade markbelysning under dörrarna med projektorer som projicerar Polestar-logotypen på marken när dörren öppnas. På bilar som har markbelysning installerad från fabrik är detta ett enkelt plug-and-play-byte där du bara petar ut originalmodulen och klickar i den nya.',
    },
    warning: {
      en: 'If your specific trim did not include factory puddle lights, the necessary wiring may be absent behind the door cards. In that case, installation becomes significantly more complex and may require door panel removal and wiring work.',
      sv: 'Om din bil saknar fabriksmonterad markbelysning under dörrarna (vilket beror på utrustningsnivå/modellår) saknas ofta kablaget bakom dörrsidorna. Eftermontering kräver då att dörrsidorna demonteras samt att kablar dras manuellt.',
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
        'Kontrollera under nederkanten på de öppna dörrarna att det sitter belysningsmoduler där.',
        'Köp LED-projektorer som är kompatibla med Polestar 2:s dörrpanelsuttag.',
        'Använd ett platt plastverktyg för att bända ut den befintliga belysningsmodulen ur dörrsidan.',
        'Koppla in kontakten och tryck upp den nya projektormodulen så att den snäpper fast i dörrsidan.',
        'Öppna dörren i mörker för att kontrollera att logotypen projiceras åt rätt håll och är skarp.',
      ],
    },
  },
  {
    id: 'ceramic-tint',
    category: 'aftermarket',
    title: {
      en: 'Ceramic Window Tint',
      sv: 'Keramisk solfilm (toning)',
    },
    feasibility: 'medium',
    description: {
      en: 'Apply professional-grade ceramic window tint to side windows and the panoramic glass roof for superior infrared heat rejection, 99% UV protection, and glare reduction. Ceramic film does not interfere with GPS, cellular, key fob, or Phone-as-Key signals — critical for the Polestar 2. The panoramic roof already has some factory UV filtering, but additional ceramic tint dramatically improves cabin comfort in warm climates and reduces HVAC load, helping preserve range.',
      sv: 'Montering av professionell keramisk solfilm på bilens rutor och panoramaglastaket för att effektivt stänga ute infraröd värmestrålning och ge 99 % UV-skydd. Keramisk film stör inte GPS, mobilnät eller Phone-as-Key-signaler, vilket är avgörande på Polestar 2. Glastaket har ett inbyggt UV-skydd från fabrik, men en extra keramisk solfilm förbättrar kupékomforten markant under varma sommardagar och sänker klimatanläggningens energiförbrukning, vilket sparar räckvidd.',
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
        'Välj en högkvalitativ keramisk solfilm och önskad toningsgrad (kontrollera gällande regler för solfilm på främre sidorutor och vindruta).',
        'Rengör rutorna extremt noggrant för att undvika att damm eller smuts stängs in under filmen.',
        'Skär till och applicera solfilmen på rutorna med hjälp av våtmontering och monteringsskrapa.',
        'För panoramaglastaket rekommenderas att filmen skärs till i ett enda stycke för att undvika skarvar. Arbeta metodiskt för att pressa ut allt monteringsvatten.',
        'Låt filmen torka och härda i 3–5 dagar innan du hissar ner rutorna eller tvättar bilen.',
      ],
    },
  },
  {
    id: 'frunk-led',
    category: 'diyCoding',
    title: {
      en: 'Frunk LED Lighting Upgrade',
      sv: 'Extra LED-belysning i frunken',
    },
    feasibility: 'easy',
    description: {
      en: 'The Polestar 2 frunk lacks adequate factory lighting, making it difficult to see contents at night. A self-adhesive LED strip or battery-operated motion-sensing LED bar can be installed in minutes for dramatically improved visibility. For a permanent solution, tap into a switched 12V source using proper automotive connectors.',
      sv: 'Bilens främre bagageutrymme (frunk) saknar belysning från fabrik, vilket gör det mörkt och svåråtkomligt på kvällen. En självhäftande LED-slinga eller en batteridriven rörelsestyrd LED-lampa kan installeras på bara några minuter. För en permanent installation kan belysningen kopplas in på bilens 12V-system med säkra anslutningar.',
    },
    warning: {
      en: "If you splice into the vehicle's 12V wiring, use proper automotive-grade connectors (e.g. TE connectors) rather than bare wire splices. Incorrect wiring in the frunk area could affect warranty coverage. Battery-operated alternatives avoid this risk entirely.",
      sv: 'Om du skarvar in dig på bilens 12V-system bör du använda fukttäta fordonskontakter av hög kvalitet istället för enkla strömtjuvar. Felaktiga elinstallationer i frunkutrymmet kan påverka garantin. Batteridrivna eller uppladdningsbara lampor är ett säkert alternativ som helt eliminerar denna risk.',
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
        'Välj belysningskälla: 12V LED-slinga, USB-laddningsbar LED-bar eller en batteridriven lampa med rörelsesensor.',
        'Rengör monteringsytan under frunkkåpan eller längs kanten noga med isopropylalkohol (IPA).',
        'Dra av skyddsplasten på LED-lampans tejp och tryck fast den ordentligt längs kanten av frunköppningen.',
        'Koppla in strömmen (vid 12V-installation) via en avsäkrad krets med fukttäta kontakter. Vid batteridrift är det bara att placera lampan i sitt fäste.',
        'Testa att stänga och öppna frunken för att kontrollera belysningens funktion och spridning.',
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
