interface DoorEntity {
  win: boolean;
  id: string;
}

export interface MontyHallResult {
  iterationCount: number;
  countOfLose: number;
  countOfWin: number;
  percentOfWinning: string;
}

type DoorsEntity = DoorEntity[];

const initialDoors: DoorsEntity = [
  {
    id: 'A',
    win: false
  },
  {
    id: 'B',
    win: false
  },
  {
    id: 'C',
    win: false
  }
];

class MontyHall {
  private doors: DoorsEntity;
  private countOfWin = 0;
  private countOfLose = 0;
  private iterationCount: number;

  constructor(iterationCount: number) {
    this.doors = this.getCopy(initialDoors);
    this.iterationCount = iterationCount;
  }

  private getRandom(min: number = 0, max: number = 2) {
    min = Math.ceil(min);
    max = Math.floor(max);

    const array = new Uint32Array(1);
    const upperMargin = Math.pow(2, 32) - 1;
    const randomValue = window.crypto.getRandomValues(array)[0] / upperMargin;

    return Math.floor(randomValue * (max - min + 1) + min);
  }

  private getCopy<T>(value: T) {
    return JSON.parse(JSON.stringify(value)) as T;
  }

  private generateDoors() {
    this.doors = this.getCopy(initialDoors);
    const winningIndex = this.getRandom();
    this.doors[winningIndex].win = true;
  }

  private doorCheck() {
    this.generateDoors();
    const firstCheckDoor = this.getCopy(this.doors[this.getRandom()]);

    const montyHallDoors = this.doors.filter(
      (door) => !door.win && firstCheckDoor.id !== door.id
    );

    const montyHallSelectedDoor =
      montyHallDoors[this.getRandom(0, montyHallDoors.length - 1)];

    const montyHallFreeDoors = montyHallDoors.filter(
      (door) => door.id !== montyHallSelectedDoor.id
    );

    const availableDoors = [firstCheckDoor, ...montyHallFreeDoors];

    const secondCheckDoor =
      this.getCopy(availableDoors)[
        this.getRandom(0, montyHallFreeDoors.length)
      ];

    return secondCheckDoor;
  }

  public init(): MontyHallResult {
    let currentIteration = 0;

    while (currentIteration < this.iterationCount) {
      const check = this.doorCheck();

      if (check.win) ++this.countOfWin;
      else ++this.countOfLose;

      currentIteration++;
    }

    const percentOfWinning = (this.countOfWin * 100) / this.iterationCount;

    return {
      iterationCount: this.iterationCount,
      countOfLose: this.countOfLose,
      countOfWin: this.countOfWin,
      percentOfWinning: `${percentOfWinning.toFixed(2)}%`
    };
  }
}

export default MontyHall;
