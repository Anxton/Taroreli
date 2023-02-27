import { Joueur } from "./joueur"

export class Partie {
    id: number = 0
    date: Date = new Date()
    joueurs: Joueur[] = [
        {
            nom: 'Joueur 1',
            score: 0
        },
        {
            nom: 'Joueur 2',
            score: 0
        },
        {
            nom: 'Joueur 3',
            score: 0
        },
        {
            nom: 'Joueur 4',
            score: 0
        }
    ]
}
