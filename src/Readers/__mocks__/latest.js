let latest = `@prefix dcterms: <http://purl.org/dc/terms/>.
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>.
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>.
@prefix skos: <http://www.w3.org/2004/02/skos/core#>.
@prefix skos-thes: <http://purl.org/iso25964/skos-thes#>.
@prefix void: <http://rdfs.org/ns/void#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix otl: <https://w3id.org/opentrafficlights#>.

<https://lodi.ilabt.imec.be/opentrafficlights/rawdata#Dataset> rdfs:type void:Dataset;
    dcterms:subject <http://dbpedia.org/resource/Signal_timing>, <http://dbpedia.org/resource/Traffic_light>.
_:b0_connection1 a otl:Connection;
    otl:departureLane _:b0_lane1;
    otl:arrivalLane _:b0_lane11;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/6>.
_:b0_connection2 a otl:Connection;
    otl:departureLane _:b0_lane2;
    otl:arrivalLane _:b0_lane9;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/7>.
_:b0_connection3 a otl:Connection;
    otl:departureLane _:b0_lane2;
    otl:arrivalLane _:b0_lane7;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/7>.
_:b0_connection4 a otl:Connection;
    otl:departureLane _:b0_lane2;
    otl:arrivalLane _:b0_lane5;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/7>.
_:b0_connection5 a otl:Connection;
    otl:departureLane _:b0_lane8;
    otl:arrivalLane _:b0_lane3;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/5>.
_:b0_connection6 a otl:Connection;
    otl:departureLane _:b0_lane8;
    otl:arrivalLane _:b0_lane5;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/5>.
_:b0_connection7 a otl:Connection;
    otl:departureLane _:b0_lane8;
    otl:arrivalLane _:b0_lane7;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/5>.
_:b0_connection8 a otl:Connection;
    otl:departureLane _:b0_lane8;
    otl:arrivalLane _:b0_lane11;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/5>.
_:b0_connection9 a otl:Connection;
    otl:departureLane _:b0_lane6;
    otl:arrivalLane _:b0_lane5;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/4>.
_:b0_connection10 a otl:Connection;
    otl:departureLane _:b0_lane6;
    otl:arrivalLane _:b0_lane3;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/4>.
_:b0_connection11 a otl:Connection;
    otl:departureLane _:b0_lane6;
    otl:arrivalLane _:b0_lane11;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/4>.
_:b0_connection12 a otl:Connection;
    otl:departureLane _:b0_lane6;
    otl:arrivalLane _:b0_lane9;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/4>.
_:b0_connection13 a otl:Connection;
    otl:departureLane _:b0_lane4;
    otl:arrivalLane _:b0_lane3;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/3>.
_:b0_connection14 a otl:Connection;
    otl:departureLane _:b0_lane4;
    otl:arrivalLane _:b0_lane11;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/3>.
_:b0_connection15 a otl:Connection;
    otl:departureLane _:b0_lane4;
    otl:arrivalLane _:b0_lane9;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/3>.
_:b0_connection16 a otl:Connection;
    otl:departureLane _:b0_lane4;
    otl:arrivalLane _:b0_lane7;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/3>.
_:b0_connection17 a otl:Connection;
    otl:departureLane _:b0_lane10;
    otl:arrivalLane _:b0_lane3;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/1>.
_:b0_connection18 a otl:Connection;
    otl:departureLane _:b0_lane10;
    otl:arrivalLane _:b0_lane5;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/1>.
_:b0_connection19 a otl:Connection;
    otl:departureLane _:b0_lane10;
    otl:arrivalLane _:b0_lane7;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/1>.
_:b0_connection20 a otl:Connection;
    otl:departureLane _:b0_lane10;
    otl:arrivalLane _:b0_lane9;
    otl:signalGroup <https://opentrafficlights.org/id/signalgroup/K648/1>.
_:b0_lane1 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2120579 4.3974731, 51.2118214 4.3991321)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Kronenburgstraat (> nr. 48)".
_:b0_lane2 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2120361 4.3974671, 51.2120058 4.3976971, 51.2120184 4.3977501)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Kronenburgstraat (> nr. 48)".
_:b0_lane3 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2118379 4.3970829, 51.2111054 4.3961904)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Volkstraat".
_:b0_lane4 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2117840 4.3972854, 51.2107036 4.3974678)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Geuzenstraat".
_:b0_lane5 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2117896 4.3972204, 51.2114204 4.3973075, 51.2106996 4.3974309)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Geuzenstraat".
_:b0_lane6 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2118379 4.3970829, 51.2111054 4.3961904)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Volkstraat".
_:b0_lane7 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2118758 4.3970172, 51.2111339 4.3961220)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Volkstraat".
_:b0_lane8 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2120563 4.3969880, 51.2121071 4.3965394, 51.2123772 4.3942387)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Kronenburgstraat (< nr. 48)".
_:b0_lane9 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2121009 4.3969997, 51.2124223 4.3942465)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Kronenburgstraat (< nr. 48)".
_:b0_lane10 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2122527 4.3973091, 51.2127026 4.3975384)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Nationalestraat".
_:b0_lane11 a otl:Lane;
    <http://www.opengis.net/#geosparql/wktLiteral> "LINESTRING (51.2122440 4.3973510, 51.2126980 4.3975804)";
    <http://dbpedia.org/ontology/width> "100";
    dcterms:description "Nationalestraat".
<https://opentrafficlights.org/id/signalgroup/K648/1> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/2> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/3> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/4> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/5> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/6> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/7> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/8> rdfs:type otl:Signalgroup.
<https://opentrafficlights.org/id/signalgroup/K648/9> rdfs:type otl:Signalgroup.
<https://w3id.org/opentrafficlights/thesauri/signalphase> a skos:ConceptScheme;
    dcterms:identifier "SIGNAL PHASE";
    skos:hasTopConcept <https://w3id.org/opentrafficlights/thesauri/signalphase/0>, <https://w3id.org/opentrafficlights/thesauri/signalphase/1>, <https://w3id.org/opentrafficlights/thesauri/signalphase/2>, <https://w3id.org/opentrafficlights/thesauri/signalphase/3>, <https://w3id.org/opentrafficlights/thesauri/signalphase/4>, <https://w3id.org/opentrafficlights/thesauri/signalphase/5>, <https://w3id.org/opentrafficlights/thesauri/signalphase/6>, <https://w3id.org/opentrafficlights/thesauri/signalphase/7>, <https://w3id.org/opentrafficlights/thesauri/signalphase/8>, <https://w3id.org/opentrafficlights/thesauri/signalphase/9>;
    skos:prefLabel "Signal phase"@en, "Signaal fase"@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/0> a skos:Concept;
    dcterms:identifier "0"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Unavailable"@en, "Niet beschikbaar"@nl;
    skos:note "This phase is used for unknown or error."@en, "Duidt aan dat er een probleem is gedetecteerd of de fase is onbekend."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/1> a skos:Concept;
    dcterms:identifier "1"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Unlit (DARK)"@en, "Onverlicht (DONKER)"@en;
    skos:note "Stop vehicle at stop line. Do not proceed until it's safe."@en, "Stop het voertuig aan de stoplijn. Wacht tot het veilig is."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/2> a skos:Concept;
    dcterms:identifier "2"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Stop Then Proceed (flashing)"@en, "Stop-dan-verdergaan (knipperlicht)"@nl;
    skos:note "Stop vehicle at stop line. Do not proceed until it's safe."@en, "Stop het voertuig aan de stoplijn. Wacht tot het veilig is."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/3> a skos:Concept;
    dcterms:identifier "3"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Stop And Remain"@en, "Stop-En-Wacht"@nl;
    skos:note "Stop vehicle at stop line. Do not proceed."@en, "Stop het voertuig aan de stoplijn. Wacht."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/4> a skos:Concept;
    dcterms:identifier "4"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Pre-Movement"@en, "Voor-vertrek"@nl;
    skos:note "Stop vehicle. Prepare to proceed."@en, "Stop het voertuig. Maak klaar om te vertrekken."@nl, "Stop het voertuig. Maak klaar om te vertrekken."@nl;
    skos:editorialNote "Used in the European Union."@en, "Van toepassing in Europese Unie."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/5> a skos:Concept;
    dcterms:identifier "5"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Permissive Movement Allowed"@en, "Verdergaan is toegelaten onder voorwaarden."@nl;
    skos:note "Proceed with caution. Must yield to all conflicting traffic."@en, "Ga verder onder voorwaarde dat voorrang gegeven wordt bij conflict."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/6> a skos:Concept;
    dcterms:identifier "6"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Protected Movement Allowed"@en, "Ga verder met voorrang-garantie."@nl;
    skos:note "Proceed in direction indicated."@en, "Ga verder in de aangeduide richting."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/7> a skos:Concept;
    dcterms:identifier "7"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Permissive Clearance"@en, "Kruispunt vrijmaken zonder voorrang."@nl;
    skos:note "Prepare to stop. Proceed if unable to stop. Conflicting traffic may be present."@en, "Stop indien mogelijk. Anders maak kruispunt vrij. Conflicterend verkeer kan aanwezig zijn."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/8> a skos:Concept;
    dcterms:identifier "8"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Protected Clearance"@en, "Kruispunt vrijmaken met voorrang-garantie."@nl;
    skos:note "Prepare to stop. Proceed if unable to stop in direction indicated."@en, "Stop indien mogelijk. Anders maak kruispunt vrij."@nl.
<https://w3id.org/opentrafficlights/thesauri/signalphase/9> a skos:Concept;
    dcterms:identifier "9"^^xsd:integer;
    skos:inScheme <https://w3id.org/opentrafficlights/thesauri/signalphase>;
    skos:prefLabel "Caution Conflicting Traffic (Flashing)"@en, "Pas op voor conflicterend verkeer."@nl;
    skos:note "Proceed with caution. Conflicting traffic may be present at intersection conflict area."@en, "Ga opgelet verder. Mogelijk is er conflicterend verkeer op het kruispunt."@nl.


<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:55.928Z> {
_:b3157705_b10085624 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085624.
_:b3157705_b10085625 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085625.
_:b3157705_b10085626 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085626.
_:b3157705_b10085627 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:42.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085627.
_:b3157705_b10085628 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085628.
_:b3157705_b10085629 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:42.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085629.
_:b3157705_b10085630 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085630.
_:b3157705_b10085631 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085631.
_:b3157705_b10085632 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085632.
_:b3157705_b10085633 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085633.
_:b3157705_b10085634 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157705_b10085634
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:55.928Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:55.928Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:55.534Z> {
_:b3157702_b10085623 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.334Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:42.334Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157702_b10085623
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:55.534Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:55.534Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:54.929Z> {
_:b3157699_b10085612 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085612.
_:b3157699_b10085613 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085613.
_:b3157699_b10085614 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085614.
_:b3157699_b10085615 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:42.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085615.
_:b3157699_b10085616 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085616.
_:b3157699_b10085617 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/0>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:26:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085617.
_:b3157699_b10085618 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085618.
_:b3157699_b10085619 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085619.
_:b3157699_b10085620 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085620.
_:b3157699_b10085621 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085621.
_:b3157699_b10085622 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157699_b10085622
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:54.929Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:54.929Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:53.928Z> {
_:b3157696_b10085601 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085601.
_:b3157696_b10085602 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085602.
_:b3157696_b10085603 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085603.
_:b3157696_b10085604 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:42.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085604.
_:b3157696_b10085605 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085605.
_:b3157696_b10085606 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/0>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:55.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:26:55.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085606.
_:b3157696_b10085607 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085607.
_:b3157696_b10085608 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085608.
_:b3157696_b10085609 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085609.
_:b3157696_b10085610 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085610.
_:b3157696_b10085611 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157696_b10085611
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:53.928Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:53.928Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:52.928Z> {
_:b3157693_b10085590 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085590.
_:b3157693_b10085591 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085591.
_:b3157693_b10085592 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085592.
_:b3157693_b10085593 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:42.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085593.
_:b3157693_b10085594 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085594.
_:b3157693_b10085595 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/0>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:55.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:26:55.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085595.
_:b3157693_b10085596 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085596.
_:b3157693_b10085597 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085597.
_:b3157693_b10085598 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085598.
_:b3157693_b10085599 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085599.
_:b3157693_b10085600 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157693_b10085600
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:52.928Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:52.928Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:52.529Z> {
_:b3157690_b10085579 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085579.
_:b3157690_b10085580 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085580.
_:b3157690_b10085581 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085581.
_:b3157690_b10085582 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:42.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085582.
_:b3157690_b10085583 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085583.
_:b3157690_b10085584 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/0>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:26:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085584.
_:b3157690_b10085585 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085585.
_:b3157690_b10085586 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085586.
_:b3157690_b10085587 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085587.
_:b3157690_b10085588 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085588.
_:b3157690_b10085589 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:27:36.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157690_b10085589
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:52.529Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:52.529Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:51.928Z> {
_:b3157687_b10085568 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/0>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:52.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:26:52.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085568.
_:b3157687_b10085569 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085569.
_:b3157687_b10085570 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085570.
_:b3157687_b10085571 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:29:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085571.
_:b3157687_b10085572 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085572.
_:b3157687_b10085573 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:52.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:11.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085573.
_:b3157687_b10085574 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085574.
_:b3157687_b10085575 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085575.
_:b3157687_b10085576 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:20.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085576.
_:b3157687_b10085577 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085577.
_:b3157687_b10085578 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.328Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.328Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157687_b10085578
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:51.928Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:51.928Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:50.929Z> {
_:b3157684_b10085557 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/0>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:52.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:26:52.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085557.
_:b3157684_b10085558 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085558.
_:b3157684_b10085559 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085559.
_:b3157684_b10085560 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:29:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085560.
_:b3157684_b10085561 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085561.
_:b3157684_b10085562 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:52.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:11.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085562.
_:b3157684_b10085563 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085563.
_:b3157684_b10085564 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085564.
_:b3157684_b10085565 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:20.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085565.
_:b3157684_b10085566 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085566.
_:b3157684_b10085567 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157684_b10085567
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:50.929Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:50.929Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:49.929Z> {
_:b3157681_b10085546 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/0>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:52.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:26:52.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/6> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085546.
_:b3157681_b10085547 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/7> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085547.
_:b3157681_b10085548 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/5> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085548.
_:b3157681_b10085549 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:29:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085549.
_:b3157681_b10085550 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/3> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085550.
_:b3157681_b10085551 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/6>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:26:52.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:11.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/1> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085551.
_:b3157681_b10085552 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/8> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085552.
_:b3157681_b10085553 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/12> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085553.
_:b3157681_b10085554 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:20.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/9> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085554.
_:b3157681_b10085555 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:00.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:19.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/10> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085555.
_:b3157681_b10085556 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:18.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:28:55.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/11> <https://w3id.org/opentrafficlights#signalState> _:b3157681_b10085556
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:49.929Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:49.929Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:49.529Z> {
_:b3157678_b10085545 <http://www.w3.org/2000/01/rdf-schema#type> <https://w3id.org/opentrafficlights#SignalState>;
    <https://w3id.org/opentrafficlights#signalPhase> <https://w3id.org/opentrafficlights/thesauri/signalphase/3>;
    <https://w3id.org/opentrafficlights#minEndTime> "2019-04-11T13:27:24.329Z"^^<http://www.w3.org/2001/XMLSchema#date>;
    <https://w3id.org/opentrafficlights#maxEndTime> "2019-04-11T13:29:01.329Z"^^<http://www.w3.org/2001/XMLSchema#date>.
<https://opentrafficlights.org/id/signalgroup/K648/4> <https://w3id.org/opentrafficlights#signalState> _:b3157678_b10085545
}
<https://opentrafficlights.org/spat/K648?time=2019-04-11T13:26:49.529Z> <http://www.w3.org/ns/prov#generatedAtTime> "2019-04-11T13:26:49.529Z"^^<http://www.w3.org/2001/XMLSchema#date>.

<#Metadata> {
<https://lodi.ilabt.imec.be/observer/rawdata/latest> <http://www.w3.org/ns/hydra/core#search> <https://lodi.ilabt.imec.be/observer/rawdata/latest#search>.
<https://lodi.ilabt.imec.be/observer/rawdata/latest#search> a <http://www.w3.org/ns/hydra/core#IriTemplate>;
    <http://www.w3.org/ns/hydra/core#template> "https://lodi.ilabt.imec.be/observer/rawdata{?time}";
    <http://www.w3.org/ns/hydra/core#variableRepresentation> <http://www.w3.org/ns/hydra/core#BasicRepresentation>;
    <http://www.w3.org/ns/hydra/core#mapping> <https://lodi.ilabt.imec.be/observer/rawdata/latest#mapping>.
<https://lodi.ilabt.imec.be/observer/rawdata/latest#mapping> a <http://www.w3.org/ns/hydra/core#IriTemplateMapping>;
    <http://www.w3.org/ns/hydra/core#variable> "time";
    <http://www.w3.org/ns/hydra/core#required> "true"^^<http://www.w3.org/2001/XMLSchema#boolean>.
<https://lodi.ilabt.imec.be/observer/rawdata/latest> <http://rdfs.org/ns/void#inDataset> <https://lodi.ilabt.imec.be/observer/rawdata#Dataset>;
    <http://creativecommons.org/ns#license> <https://creativecommons.org/publicdomain/zero/1.0/>;
    <http://www.w3.org/ns/hydra/core#previous> <https://lodi.ilabt.imec.be/observer/rawdata/fragments?time=2019-04-11T13:26:37.727Z>
}
`;

module.exports = latest;