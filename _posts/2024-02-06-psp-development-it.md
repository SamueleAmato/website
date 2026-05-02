---
layout: post
title: "La mia esperienza con lo sviluppo per PSP"
lang: it
date: 2024-02-06
image: https://samueleamato.xyz/assets/images/pspfetch.jpeg
---


La console che è rimasta con me anche **vent’anni** dopo è la **PlayStation Portable**.  
Amo ancora questo dispositivo portatile per diversi motivi. La PSP è abbastanza piccola da stare in tasca e può essere utilizzata in movimento, il che la rende incredibilmente comoda.  
Inoltre, dispone di uscite audio e di eccellenti funzionalità multimediali. Può essere utilizzata come lettore MP3, diventando così un dispositivo di intrattenimento versatile.  
Dal punto di vista hardware, il dispositivo è notevole grazie al suo schermo luminoso, alla batteria di lunga durata e alla memoria espandibile tramite Memory Stick Duo.  
Tutte queste caratteristiche fanno sì che la PSP si distingua ancora oggi.

## Perché?

Scrivere software per PSP è stato soprattutto **divertente**. Non si trattava solo del desiderio di creare qualcosa che non girasse su PC o smartphone: la PSP era perfetta per offrirmi questa opportunità.  
Sviluppare per PSP rappresenta una sfida unica che richiede creatività e competenza tecnica, e il risultato è più gratificante rispetto a quello che si ottiene su piattaforme più comuni.

La prospettiva di comprendere il funzionamento dell’hardware della PSP e di ottimizzare il codice affinché girasse in modo efficiente su questo dispositivo è stata allo stesso tempo entusiasmante ed educativa.  
Inoltre, mi ha permesso di comprendere le basi del linguaggio di programmazione Lua. Lua è un linguaggio di scripting ad alto livello, leggero e facile da imparare, con applicazioni molto potenti soprattutto nello sviluppo di videogiochi.  
Usare Lua sulla mia PSP mi ha fatto apprezzare la sua semplicità e flessibilità, aprendo la strada a progetti futuri.

Al di là della programmazione, questo progetto mirava anche a spingere i limiti di ciò che si può fare con questo sistema portatile classico.

## Cosa ho fatto

Il primo progetto su cui ho lavorato è stato un lettore MP3 leggero, progettato per garantire una buona autonomia della batteria supportando al contempo funzionalità non normalmente presenti sulla PSP,  
come lo spegnimento dello schermo durante la riproduzione musicale. Il risultato è stato un software senza interfaccia grafica, ma con una TUI (Text User Interface). Questo è fondamentale per il risparmio energetico.

Puoi vedere il risultato [qui](https://github.com/rdWei/UMusic).

### Il secondo tentativo

Il mio secondo progetto è stato un programma in stile Neofetch per PSP. Mostra varie informazioni, tra cui la RAM disponibile, lo spazio della microSD e i dettagli del firmware: numero di versione e tipologia.

<p align="center">
  <img src="/assets/images/pspfetch.jpeg" alt="psp neofetch" width="600" />
</p>

## Come?

Per creare questi due software ho utilizzato un interprete chiamato ONELua, che supporta PSP/PSVita/PS1/PS2/PS3. È stato piuttosto semplice, dato che Lua è un linguaggio molto intuitivo.  

