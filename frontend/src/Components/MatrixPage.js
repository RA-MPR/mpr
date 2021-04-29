import { Grid, Paper} from "@material-ui/core";
// eslint-disable-next-line

import "./MatrixPage.css";

function MatrixPage() {
  return (
    <div className="root">
      <Grid container justify="center" spacing={2} style={{ width: "100%" }}>
        <Grid item xs={8}>
          <Paper style={{ padding: 16 }}>
            <div className="matrix-main-screen">
              <table className="tg">
                <thead>
                  <tr>
                    <th className="tg-0pky" />
                    <th className="tg-2xbj" colSpan={6}>
                      Dopad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tg-fymr" rowSpan={6}>
                      P<br />a<br />v<br />d<br />ě<br />p<br />o<br />d<br />o
                      <br />b<br />n<br />o<br />s<br />t
                    </td>
                    <td className="tg-zllo" />
                    <td className="tg-zllo"> Velmi nízký </td>
                    <td className="tg-zllo"> &nbsp;&nbsp;Nízký </td>
                    <td className="tg-zllo"> Střední </td>
                    <td className="tg-zllo"> Vysoký </td>
                    <td className="tg-zllo">Velmi vysoký</td>
                  </tr>
                  <tr>
                    <td className="tg-225m">Velmi vysoká</td>
                    <td className="tg-n451" />
                    <td className="tg-z73n">30</td>
                    <td className="tg-b14c" />
                    <td className="tg-b14c" />
                    <td className="tg-b14c" />
                  </tr>
                  <tr>
                    <td className="tg-225m">Vysoká</td>
                    <td className="tg-n451" />
                    <td className="tg-z73n">3,26,29</td>
                    <td className="tg-z73n">22,23,25</td>
                    <td className="tg-b14c">27</td>
                    <td className="tg-b14c" />
                  </tr>
                  <tr>
                    <td className="tg-225m">Střední</td>
                    <td className="tg-n451">38</td>
                    <td className="tg-n451">1,2,6,40</td>
                    <td className="tg-z73n">4,11,12,42</td>
                    <td className="tg-z73n">14,21,46</td>
                    <td className="tg-b14c" />
                  </tr>
                  <tr>
                    <td className="tg-225m">Nízká</td>
                    <td className="tg-n451">18,19</td>
                    <td className="tg-n451">10,15,31,34,37</td>
                    <td className="tg-n451">5,17,32,35</td>
                    <td className="tg-z73n">7,20,24,39</td>
                    <td className="tg-z73n" />
                  </tr>
                  <tr>
                    <td className="tg-225m">Velmi nízká</td>
                    <td className="tg-n451">41,44,47,48,49</td>
                    <td className="tg-n451">16,33,50</td>
                    <td className="tg-n451">13,51</td>
                    <td className="tg-n451">9,36,43</td>
                    <td className="tg-n451">8,45</td>
                  </tr>
                </tbody>
              </table>
              <table
                className="c7"
                style={{ marginLeft: "8px", marginTop: "10px" }}
              >
                <tbody>
                  <tr className="c13">
                    <td className="c12" colSpan={4} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">RIZIKA ŘÍZENÍ PROJEKTU</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c10 c8">
                        <span className="c9"></span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Riziko</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Možný dopad</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Opatření</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c12" colSpan={4} rowSpan={1}>
                      <p className="c10">
                        <span className="c0">RIZIKA V ORGANIZACI TÝMU</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">1</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">&nbsp;Odchod člena z týmu</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpomalení prací, nutnost přerozdělení činností
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Pravidelná komunikace, rozdělení činností na menší
                          části
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">2</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Krátkodobá indispozice člena týmu (např. nemoc)
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zastavení provádění některých činností
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zastoupení chybějícího jiným členem týmu
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">3</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Krátkodobá indispozice vedoucího týmu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Chaos v&nbsp;organizaci prací, zastavení některých
                          činností
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zvolení jiného členu týmu jako zástupce
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">4</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Člen nemá předpokládané znalosti/schopnosti
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpomalení některých činností, případné přerozdělení
                          prací
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Úvodní analýza schopností členů, diskutování
                          schopností členů na začátku projektu
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">5</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nevyvážené rozdělení prací v týmu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Stagnace některých členů, velké vytížení jiných členů
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Důkladná analýza prací pro rovnoměrné rozdělení &nbsp;
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">6</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Osobní konflikty mezi členy týmu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Odchod členů týmu, zpomalení prací
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Úzkou spolupráci členů zadávat podle osobních
                          preferencí členů
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2 c8">
                        <span className="c0"></span>
                      </p>
                      <p className="c2">
                        <span className="c0">7</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Neparalelizovatelné rozdělení práce v týmu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Každý člen týmu musí čekat až svoji práci dokončí jiný
                          člen před ním =&gt; zpomalení vývoje produktu
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Rozdělení práce takovým způsobem, aby na svých úkolech
                          mohlo pracovat co nejvíce členů zároveň.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">8</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nepřesné stanovení časového plánu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Členové nevidí jednotlivé dílčí deadliny, ale až
                          konečný deadline a neví jestli projekt stíhají nebo
                          ne.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Rozdělit projekt na etapy s datem dokončení a
                          specifikací toho, co má být hotovo.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">9</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Syndrom 90 %</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Vývojáři mají pocit, že stačí dokončit pár drobností a
                          produkt bude hotový. Vede k prodloužení práce a
                          nejistému stanovení data dokončení produktu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Rozdělit projekt na etapy s datem dokončení a
                          specifikací toho, co má být hotovo.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">10</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Neznalost aktuálního stavu projektu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Členové týmu mohou být nemotivovaní, pokud nejsou
                          informování o tom, v jakém stavu se projekt nachází
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Pravidelné schůzky, kde se odprezentuje provedená
                          práce od schůzky poslední.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c12" colSpan={4} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">RIZIKA KOMUNIKACE</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">11</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nedostatečná komunikace v&nbsp;týmu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Neznalost aktuálního stavu projektu, zpomalení, chaos
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Pravidelné schůzky, kontrola komunikační kanálů
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">12</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Špatná komunikace mezi dílčími týmy
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zastavení prací některých týmů, problémy při integraci
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Pravidelné schůzky, kontrola komunikační kanálů
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">13</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Nepravidelné schůzky</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpomalení/zastavení některých prací, chaos
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Stanovení konkrétního dne a času pro schůzky
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">14</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nedostatečná komunikace se zákazníkem
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nemožnost ověřování správnosti dílčích prací
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zavedení pravidelné komunikace se zákazníkem
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">15</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Neznalost aktuálního stavu</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpomalení práce, nezájem zapojit se do týmové práce
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Pravidelné schůzky týmu, komunikace stavu projektu
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">16</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Vedoucí dílčích týmů nefungují jako prostředníci pro
                          komunikaci s vedením celého projektu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zahlcení vedoucího celého projektu, jelikož musí
                          komunikovat s každým členem týmy zvlášť.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Vedoucí projektu komunikuje pouze s vedoucími týmů,
                          číž šetří čas sobě i pracovníkům.
                        </span>
                      </p>
                      <p className="c2 c8">
                        <span className="c0"></span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2 c8">
                        <span className="c0"></span>
                      </p>
                      <p className="c2">
                        <span className="c0">17</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          <br />
                          Nedostatečné záznamy ze schůzek
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2 c8">
                        <span className="c0"></span>
                      </p>
                      <p className="c2">
                        <span className="c0">
                          Členové týmu mají pocit že je vše domluveno, ale
                          nemožnost ověření rozdělení úkolů vede ke sporům.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2 c8">
                        <span className="c0"></span>
                      </p>
                      <p className="c2">
                        <span className="c0">Důkladné zápisy ze schůzí</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">18</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nedostatečná autonomie dílčích týmů
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nutnost schvalování každého rozhodnutí vedoucím týmu
                          zpomaluje vývoj a vytěžuje vedoucího
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Vedoucí cílčích týmů mají pravomoce dělat operativní
                          rozhodnutí.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">19</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Strukturování členů na dílčí týmy
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpoždění při schvalování možných řešení vedoucím.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Vedoucí by měl být k dispozici ihned ve své pracovní
                          době.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">20</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Neúplná znalost projektu</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Úpravy projektu – přidávání činností, prodlevy
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Minimálně vedoucí dílčích týmů by měli být plně
                          seznámeni s projektem a dle znalostí o projektu řídit
                          a informovat své pracovníky.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c12" colSpan={4} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">RIZIKA V PLÁNOVÁNÍ</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">21</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nereálný odhad trvání dané činnosti
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpoždění projektu, větší investice.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Důkladné zamyšlení a propojení složitosti a časové
                          náročnosti činnosti a schopností zdrojů činnostem
                          přiřazených.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">22</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Nedodržení plánu</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Razantní zpoždění projektu.</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Průběžné kontroly odvedené práce jednotlivých členů.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">23</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Neúplný plán – chybějící činnosti
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nutná investice do zdrojů navíc. Zpoždění projektu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Dle specifikace vytvořit kvalitní plán projektu.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">24</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nesprávně naplánovaná posloupnost činností
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Prodlevy, čekání, investice navíc.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Konzultování plánu s odpovídajícími členy týmu za dané
                          činnosti, zjistit návaznosti mezi činnostmi.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">25</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nerealistický termín dodání projektu.
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nespokojenost zákazníka, ztráty na projektu, při
                          velkém prodloužení.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Vytvoření kvalitního plánu projektu, průběžná kontrola
                          dodržování tohoto plánu.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">26</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          V případě obecnějších paralelních činností se pracuje
                          na méně důležitých.
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Prodlevy kvůli nemožnosti testování a následné
                          integraci.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Kvalitní plán projektu, kde jsou činnosti rozděleny na
                          co nejmenší úkoly a správně poskládány za sebou.
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="c7"
                style={{ marginLeft: "8px", marginTop: "10px" }}
              >
                <tbody>
                  <tr className="c13">
                    <td className="c12" colSpan={4} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">TECHNICKÁ RIZIKA</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c10 c8">
                        <span className="c9"></span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Riziko</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Možný dopad</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Opatření</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c8">
                    <td className="c12" colSpan={4} rowSpan={1}>
                      <p className="c10">
                        <span className="c0">
                          RIZIKA VE SPECIFIKACI POŽADAVKŮ
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">27</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nepochopení požadavků zákazníka
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Tvorba nesprávného produktu</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Dostatečná komunikace, analýza potřeb, komunikace
                          dílčích výsledků projektu
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">28</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Změna požadavků zákazníka během projektu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpomalení prací, návrat k předchozím fázím, zdražení
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Odsouhlasení specifikace požadavků zákazníkem
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">29</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Špatná definice případů užití výsledného produktu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Tvorba nesprávného produktu</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Detailní analýza požadavků zákazníka, průběžná
                          konzultace
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">30</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Požadavky specifikované nad rámec potřeb zákazníka
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Tvorba zbytečně složitého, neočekávaného produktu
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Dostatečná komunikace požadavků zákazníka
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">31</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Nesprávný design</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Negativní vliv na spokojenost zákazníka.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Provést zkoumání potřeb zákazníka a cílové skupiny
                          uživatelů pro vhodnou specifikaci designu.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">32</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Neúplný popis, za jakých podmínek bude software
                          fungovat
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zákazník bude muset navíc investovat do hardwaru,
                          prostředí.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Bádání po aktuálních hardwarových možnostech
                          zákazníka, případné schválení vylepšení cílového
                          prostředí.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">33</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Neznalí uživatelé</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nespokojenost zákazníka, špatné recenze.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Dohodnout a řádně naplánovat školení uživatelů.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c21">
                    <td className="c12" colSpan={4} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">RIZIKA NÁVRHU</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">34</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Špatné rozdělení na části</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zpomalení implementace, problémy při integraci
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Komunikace se zkušenými členy týmu
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">35</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Špatný návrh rozhraní dílčích částí
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Problémy při integraci</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Předchozí shoda dílčích týmů na rozhraní částí
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">36</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Nevhodný výběr platformy</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Produkt nefunkční u zákazníka
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Komunikace platformy se zákazníkem
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">37</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Nevhodně zvolený designu</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zákazník výsledný produkt nepřijme
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Komunikace návrhu designu na začátku projektu
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">38</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Návrh neintuitivního designu</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Dlouhé učení uživatelů s produktem, nespokojenost
                          zákazníka
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Testování grafického rozhraní na reálných uživatelích
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">39</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Špatný návrh rozhraní výsledného produktu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Problém zavedení produktu u zákazníka
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Komunikace podmínek fungování produktu se zákazníkem
                          dopředu
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">40</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Příliš vágní popis funkcí v návrhu.
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nutnost programátorů opakovaně se dotazovat člena
                          zodpovědného za komunikaci se zákazníkem.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Důkladná specifikace všech funkcí systému.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">41</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Výběr jazyka</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zákazník by mohl při expandování / přesunu vyžadovat
                          jiný jazyk produktu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Grafické rozhraní v anglickém jazyce, pokud to není
                          problémem pro cílovou skupinu uživatelů.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">42</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Výsledný produkt má velké množství chyb
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Zachybovaný produkt vede k nespokojenosti zákazníka,
                          další náklady na úpravy softwaru.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Navržení průběžných a akceptačních testů.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c3" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">43</span>
                      </p>
                    </td>
                    <td className="c1" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Nesprávná volba technologie</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Změna technologie vyžaduje až předělání projektu jinou
                          technologií. Až neakceptovatelné prodloužení projektu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Na základě úplné specifikace požadavků zvolit vhodnou
                          technologii.
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="c7"
                style={{ marginLeft: "8px", marginTop: "10px" }}
              >
                <tbody>
                  <tr className="c13">
                    <td className="c16" colSpan={4} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">OBCHODNÍ RIZIKA</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c19" colSpan={1} rowSpan={1}>
                      <p className="c10 c8">
                        <span className="c9"></span>
                      </p>
                    </td>
                    <td className="c17" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Riziko</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Možný dopad</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Opatření</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c19" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">44</span>
                      </p>
                    </td>
                    <td className="c17" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Špatné stanovení ceny produktu
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Prodělek</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Důkladný výpočet ceny projektu, nadsazení výsledné
                          ceny.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c19" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">45</span>
                      </p>
                    </td>
                    <td className="c17" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Špatné stanovení deadlinu projektu.
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Projekt nelze dokončit včas, sankce za pozdní dodání.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Důkladný výpočet trvání projektu, oddálení výsledného
                          data.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c19" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">46</span>
                      </p>
                    </td>
                    <td className="c17" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Přetížení týmu více projekty než je možné zvládnout
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Projektu se začnou zpožďovat, vývojáři ztrácejí
                          produktivitu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Znalost možností vývojářů, přijetí dalších pracovníků.
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="c7"
                style={{ marginLeft: "8px", marginTop: "10px" }}
              >
                <tbody>
                  <tr className="c13">
                    <td className="c16" colSpan={4} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">EXTERNÍ RIZIKA</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c13">
                    <td className="c18" colSpan={1} rowSpan={1}>
                      <p className="c10 c8">
                        <span className="c9"></span>
                      </p>
                    </td>
                    <td className="c20" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Riziko</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Možný dopad</span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c10">
                        <span className="c9">Opatření</span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c18" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">47</span>
                      </p>
                    </td>
                    <td className="c20" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Bankrot klienta</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Konec projektu, nemožnost klienta splácet.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Navazovat obchodní vztahy pouze s důvěryhodnými
                          firmami.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c18" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">48</span>
                      </p>
                    </td>
                    <td className="c20" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Klient přestane produkt potřebovat před jeho
                          dokončením
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Konec projektu, klient nebude chtít zaplatit plnou
                          cenu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Ošetřit odstoupení od smlouvy sankcemi, které pokryjí
                          naše náklady.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c18" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">49</span>
                      </p>
                    </td>
                    <td className="c20" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Změny v legislativě</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Nové požadavky na zabezpečení/ukládání dat a tím pádem
                          možné překročení rozpočtu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Ošetření vzniku nových legislativních nařízení ve
                          smlouvě s klientem.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c18" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">50</span>
                      </p>
                    </td>
                    <td className="c20" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">Změna vedení klientské firmy</span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Přechod ke konkurenci, škrty v rozpočtu na námi
                          vyvíjený produkt
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Navázání přátelských vztahů s majiteli firmy, ne pouze
                          se středním managementem odpovědným za poptání
                          produktu.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr className="c14">
                    <td className="c18" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">51</span>
                      </p>
                    </td>
                    <td className="c20" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Náhodné rozbití cílového hardwaru.
                        </span>
                      </p>
                    </td>
                    <td className="c5" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Investice ze strany zákazníka, odložení předání
                          projektu.
                        </span>
                      </p>
                    </td>
                    <td className="c6" colSpan={1} rowSpan={1}>
                      <p className="c2">
                        <span className="c0">
                          Dedikované místnosti pro server, oddělená kuchyňka od
                          pracoviště.
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default MatrixPage;
