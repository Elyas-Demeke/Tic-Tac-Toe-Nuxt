<script setup lang="ts">
/*
 *
 * Next create a single player AI (In progress)
 *     - Make slashing work when a game is won by someone
 *     - Finalize the AI
 *
 * Next make this playable multiplayer online
 *
 */

const game = ref(newGame());
const handleClick = (i: number) => {
  if (game.value[Math.floor(i / 3)][i % 3] !== -1 || gameOver.value) return;
  game.value[Math.floor(i / 3)][i % 3] = turn.value % 2 ? 1 : 0;
  turn.value += 1;

  // simulate AI move
  setTimeout(aiMove, 500);
};

const aiMove = () => {
  let x = -1,
    y = -1;

  game.value.find((row, i) =>
    row.find((val, j) => {
      if (val === -1) {
        x = i;
        y = j;
        return true;
      }
      return false;
    })
  );
  if (x !== -1 && y !== -1 && !gameOver.value)
    game.value[x][y] = turn.value % 2 ? 1 : 0;
  turn.value += 1;
};

const turn = ref(0);
const gameStatus = ref("");
const gameOver = ref(false);
const winningWay = ref<
  | {
      direction: "row" | "column" | "diagonal" | "reverseDiagonal";
      rowIndices: Array<number>;
    }
  | undefined
>();

watch(
  game,
  () => {
    for (let i = 0; i < 3; i++) {
      // check rows
      let val = checkRow(game.value[i]);
      if (val) {
        gameOver.value = true;
        winningWay.value = {
          direction: "row",
          rowIndices: [3 * i, 3 * i + 1, 3 * i + 2],
        };
        return (gameStatus.value = `${val} has won!!`);
      }

      // check columns
      val = checkRow([game.value[0][i], game.value[1][i], game.value[2][i]]);
      if (val) {
        gameOver.value = true;
        winningWay.value = {
          direction: "column",
          rowIndices: [0 + i, 3 + i, 6 + i],
        };
        return (gameStatus.value = `${val} has won!!`);
      }
    }

    // check diagonals
    let val = checkRow([game.value[0][0], game.value[1][1], game.value[2][2]]);
    if (val) {
      gameOver.value = true;
      winningWay.value = {
        direction: "diagonal",
        rowIndices: [0, 4, 8],
      };
      return (gameStatus.value = `${val} has won!!`);
    }
    val = checkRow([game.value[0][2], game.value[1][1], game.value[2][0]]);
    if (val) {
      gameOver.value = true;
      winningWay.value = {
        direction: "reverseDiagonal",
        rowIndices: [2, 4, 6],
      };
      return (gameStatus.value = `${val} has won!!`);
    }
    if (turn.value === 9) {
      gameStatus.value = "It's a tie!!";
    }
  },
  { deep: true }
);

const getAngle = (i: number) => {
  if (winningWay.value?.rowIndices.includes(i)) {
    return winningWay.value.direction;
  }
};

const restartGame = () => {
  game.value = newGame();
  turn.value = 0;
  gameStatus.value = "";
  gameOver.value = false;
  winningWay.value = undefined;
};
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-y-8">
    <div class="flex gap-x-8 pt-8 items-center">
      <h1 class="text-xl">Tic Tac Toe</h1>
      <button
        class="rounded-md bg-neutral-600 transition-colors hover:bg-neutral-500 text-white px-4 py-2"
        @click="restartGame"
      >
        Restart
      </button>
    </div>
    <div v-if="gameStatus" class="flex w-48 bg-green-400 rounded-md px-3 py-2">
      <p>{{ gameStatus }}</p>
    </div>
    <div class="grid grid-cols-3 w-36">
      <BoxCell
        v-for="(_, index) in 9"
        :key="index"
        @click="handleClick(index)"
        v-model="game[Math.floor(index / 3)][index % 3]"
        :gameOver="gameOver"
        :angle="getAngle(index)"
      />
    </div>
  </div>
</template>
