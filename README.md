# Prima versione del tour virtuale
Ingresso in una stanza rettangolare (il soffitto viene tagliato sopra per avere un feedback sulla luminosita,
in futuro sarebbe figo avere luce filtrante gia' dalla prima sezione)
Dopo l'ingresso arriviamo al *Pantheon* dove ci saranno tutte le statue.

Mi piacerebbe mettere luce filtrante da un oculus in alto, altrimenti giochiamo con le luci.

***
## Issues
Il movimento *lerpato* tra la prima sezione e la seconda ha rotto la possibilita' di fare panning con il mouse. Devo risolverlo.
Le pareti della prima stanza rettangolare entrano nel *Pantheon*. Dobbiamo trovare un modo per rendere carina la transizione da stanza rettangolare a Pantheon, magari una stanza purgatorio?
**Le pareti laterali del Pantheon e la cupola non fanno un seal perfetto**, anche quello va rivisto

*** 
Versione pre-alfa, fa schifo ma potrebbe essere una base di partenza.
*** 

## TODO futuro
- Composizione "volante" della scena


***

# Tour Update (11/05)

Ho creato i modelli con Blender, per poi importarli nella scena. 
Ancora non sono felice di alcuni dettagli, devono essere curati meglio.
Ho aggiunto un effetto noise, se non siete convinti l'effetto e' governato da `<EffectComposer>`, in `MainScene.jsx`.
## Issues
- Non ho curato il comportamento con il mouse, e' ancora da vedere (non funziona in questa implementazione)

## TODO
- Implementazione composizione "volante";
- Migliorare le luci (vorrei un effetto realistico).
