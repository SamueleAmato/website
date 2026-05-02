---
title: "Smetti di scrivere if in Bash"
date: 2026-02-24
lang: it
hn_id: td
---

Non comportarti come se Bash fosse Python o C. Il problema più comune negli script shell è l’uso eccessivo di `if` per controlli semplici. Anche se la logica condizionale serve, Bash ha un modo migliore e più idiomatico per farlo: i codici di uscita e gli operatori logici.

## Le basi

Ogni comando in Bash restituisce un codice di uscita. `0` significa successo, qualsiasi altro valore indica errore. Puoi concatenare comandi usando questi codici con operatori logici, evitando così lunghi blocchi `if`.

- `;` (punto e virgola): esegue il secondo comando indipendentemente dal risultato del primo.
- `&&` (AND): esegue il secondo comando solo se il primo ha avuto successo.
- `||` (OR): esegue il secondo comando solo se il primo ha fallito.

## Assegnazioni condizionali migliori

È comune controllare se una variabile è vuota e assegnarle un valore di default.

### Metodo lungo:

```bash
if [ -z "$EDITOR" ]; then
    EDITOR="vim"
fi
```

Qui `[ -z "$EDITOR" ]` restituisce vero (0) se la variabile è vuota. L’operatore && fa sì che l’assegnazione avvenga solo in quel caso.

Concatenare il flusso dei comandi

Questo approccio funziona bene anche per workflow più complessi. Invece di annidare if, usa catene logiche.

Problema con annidamenti:

```bash
func1
if [ $? -eq 0 ]; then
    func2
    if [ $? -eq 0 ]; then
        func3
    else
        handle_error
    fi
fi
```

## Catena logica

`func1 && func2 && func3 || handle_error`

Qui l’esecuzione è lineare: ogni comando parte solo se il precedente ha avuto successo. Se uno fallisce, la catena si interrompe e viene eseguito il blocco ||.

Conclusione

L’eleganza negli script nasce dallo sfruttare il comportamento nativo della shell.

Usa if quando migliora davvero la leggibilità.

Per tutto il resto, le catene logiche sono spesso la scelta più pulita e idiomatica.
