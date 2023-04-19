export type MontyHallResult = {
  playerChoice: number;
  hostChoice: number;
  playerFinalChoice?: number;
  finalResult: boolean;
  doors: number[];
};

const NUMBER_OF_DOORS = 3;
const CAR_DOOR = 1;
const GOAT_DOOR = 0;

export default class MontyHall {
  async simulate(numberOfGamesValue: number, changeValue: boolean) {
    const results = [];
    for (let i = 0; i < numberOfGamesValue; i++) {
      results.push(this.montyHall(changeValue));
    }

    return Promise.all(results);
  }

  private createDoors(): number[] {
    const doors: number[] = [GOAT_DOOR, GOAT_DOOR, GOAT_DOOR];
    const carDoor = Math.floor(Math.random() * NUMBER_OF_DOORS);
    doors[carDoor] = CAR_DOOR;
    return doors;
  }

  private getHostChoice(doors: number[], playerChoice: number) {
    const doorsWithGoat = doors
      .map((door, index) => ({ door, index }))
      .filter(({ door, index }) => door === GOAT_DOOR && index !== playerChoice)
      .map(({ index }) => index);

    return doorsWithGoat[Math.floor(Math.random() * doorsWithGoat.length)];
  }

  private checkWin(doors: number[], playerChoice: number) {
    return doors[playerChoice] === CAR_DOOR;
  }

  private changePlayerChoice(
    doors: number[],
    playerChoice: number,
    hostChoice: number
  ) {
    const doorsToChooseFrom = doors
      .map((door, index) => ({ door, index }))
      .filter(({ index }) => index !== playerChoice && index !== hostChoice)
      .map(({ index }) => index);

    return doorsToChooseFrom[0];
  }

  private async montyHall(change: boolean): Promise<MontyHallResult> {
    const doors = this.createDoors();
    const playerChoice = Math.floor(Math.random() * NUMBER_OF_DOORS);
    const hostChoice = this.getHostChoice(doors, playerChoice);
    let playerFinalChoice = playerChoice;
    if (change) {
      playerFinalChoice = this.changePlayerChoice(
        doors,
        playerChoice,
        hostChoice
      );
    }
    const finalResult = this.checkWin(doors, playerFinalChoice);
    const result: MontyHallResult = {
      doors,
      playerChoice,
      hostChoice,
      finalResult,
    };

    if (change) {
      result.playerFinalChoice = playerFinalChoice;
    }

    return result;
  }
}
