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

class MontyHall {
  private doors: DoorEntity[] = [];
  private doorsCount = 0;
  private countOfWin = 0;
  private countOfLose = 0;
  private iterationCount: number;

  constructor(iterationCount: number, doorsCount: number) {
    this.doorsCount = doorsCount;
    this.iterationCount = iterationCount;
  }

  private getRandom(min: number = 0, max: number = this.doorsCount - 1) {
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
    this.doors = [...new Array(this.doorsCount)].map(
      (_, index) => ({ id: index.toString(), win: false } as DoorEntity)
    );

    const winningIndex = this.getRandom();
    this.doors[winningIndex].win = true;
  }

  private doorCheck() {
    this.generateDoors();

    const firstCheckDoor = this.getCopy(this.doors[this.getRandom()]);

    const montyHallAvailableDoors = this.doors.filter(
      (door) => firstCheckDoor.id !== door.id
    );

    return (
      montyHallAvailableDoors.find((door) => door.win) ??
      montyHallAvailableDoors[
        this.getRandom(0, montyHallAvailableDoors.length - 1)
      ]
    );
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
