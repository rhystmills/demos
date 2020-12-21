interface GameObject { id: string }
interface GamePosition {
    x: number,
    y: number
}
interface Wall extends GameObject {
    position: GamePosition,
}
interface Player extends Wall {
    hp: number
}

class GameObject implements GameObject{
    constructor(id: string){
        this.id = id;
    }
}

class Wall extends GameObject implements Wall {
    constructor(id: string, position: GamePosition){
        super(id);
        this.position = position;
    }
}

class Player extends GameObject {
    constructor(id: string, hp: number){
        super(id);
        this.hp = hp;
    }
    announceHP(){
        console.log(`${this.id} has ${this.hp} health remaining.`)
    }
}

let wall1 = new Wall(
    "wall1",
    {x:1, y:2}
)

let player1 = new Player("Jeff",10)
console.log(wall1.position.x)
player1.announceHP()
