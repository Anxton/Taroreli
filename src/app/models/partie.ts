import { Joueur } from "./joueur"

export class Partie {
    id: number = 0
    date: Date = new Date()
    joueurs: Joueur[] = [
        new Joueur("Joueur 1"),
        new Joueur("Joueur 2"),
        new Joueur("Joueur 3"),
        new Joueur("Joueur 4")
    ]
}
