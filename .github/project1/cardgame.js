// FUTURE RESULT GENERATOR (ONCE)
class FutureResultEngine {
  constructor(seed = 12345) {
    this.seed = seed;
    this.pointer = 0;
    this.results = this.generateFuture(500); // next 500 rounds
  }

  seededRandom() {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  generateFuture(count) {
    const arr = []; // initial known values for testing
    for (let i = 0; i < count; i++) {
      arr.push(Math.floor(this.seededRandom() * 49) + 1);
    }
    return arr;
  }

  nextCard() {
    return this.results[this.pointer++];
  }
}

// HOUSE MAPPING (FIXED, NEVER CHANGES)
function getHouse(card) {
  if (card <= 5) return 1;
  if (card <= 10) return 2;
  if (card <= 15) return 3;
  if (card <= 25) return 4;
  if (card <= 30) return 5;
  if (card <= 35) return 6;
  if (card <= 40) return 7;
  return 8;
}

// SPIN FUNCTION (NO RNG HERE)
class AndarBaharDeterministicGame {
  constructor() {
    this.future = new FutureResultEngine(99999);
  }

  spin(playerBets = []) {
    const card = this.future.nextCard();
    const house = getHouse(card);

    return {
      card,
      winningHouse: house,
      status: "LOCKED",
      note: "Result was pre-decided"
    };
  }
}

// CARD → NUMBER STRATEGY (LOCKED)
function getRawCardNumber(rank, suit) {
  // Step 1: Rank Value
  const rankValue = rank;

  // Step 2: Suit Offset
  const suitOffset = {
    Spades: 0,
    Hearts: 13,
    Diamonds: 26,
    Clubs: 39
  }[suit];

  // Step 3: Raw Card Number
  let raw = rankValue + suitOffset; // range 1–52

  // 52 → 49 COMPRESSION
  if (raw > 49) {
    raw = raw - 49; // fold 50, 51, 52 → 1, 2, 3
  }

  return raw; // final result range 1–49
}

// Example usage of getRawCardNumber
console.log(getRawCardNumber(1, 'Spades')); // Ace of Spades → 1
console.log(getRawCardNumber(13, 'Clubs')); // King of Clubs → 3

// USAGE
const game = new AndarBaharDeterministicGame();

console.log(game.spin([{ houseId: 4, amount: 100 }]));
console.log(game.spin([{ houseId: 2, amount: 200 }]));