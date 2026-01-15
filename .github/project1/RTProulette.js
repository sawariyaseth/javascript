// rouletteGenerator.js

class RouletteEngine {
  // Improve the constructor to allow dynamic initialization of history
  constructor(history = [21,10,30,27,34,35,4,14,25,20,31,1,9,8,26,11,31,9,15,25,32,14,11,36,28,2,36,5,4,10,20,16,1,36,25,12,1,19,17,31,4,1,11,31,7,29,10,9,20,22,10,19,10,19,10,19,36,30,14,1,0,15,19,7,20,27,35,33,3,2,8,22,14,30,27,11,35,26,36,23,5,17,15,14,13,33,32,29,33,15,24,1,1,3,8,34,2,3,19,19,1,33,26,24,4,12,21,12,0,27,4,5,34,21,0,17,15,1,9,21,8,17
    
     ]) {
    this.history = history;
    this.targetRTP = 0.94; // adjustable
    this.houseBias = 0.03; // subtle control
  }

  spin() {
    const last = this.history.slice(-5);
    let number = this.weightedSpin(last);
    this.history.push(number);
    return number;
  }

  weightedSpin(lastSpins) {
    let weights = Array(37).fill(1);

    // 🔁 Anti-streak control
    if (lastSpins.length >= 3) {
      const streak = lastSpins.every(n => n === lastSpins[0]);
      if (streak) weights[lastSpins[0]] = 0.2;
    }

    // 🎛 RTP shaping (favor house slightly)
    for (let i = 1; i <= 36; i++) {
      if (i % 2 === 0) weights[i] -= this.houseBias;
    }

    return this.pickWeighted(weights);
  }

  pickWeighted(weights) {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;

    for (let i = 0; i < weights.length; i++) {
      if (r < weights[i]) return i;
      r -= weights[i];
    }
    return 0;
  }

  // Add a function to calculate parity probabilities
  calculateParityProbabilities() {
    let evenCount = 0;
    let oddCount = 0;
    let zeroCount = 0;

    // Count occurrences of even, odd, and zero in the history
    for (const number of this.history) {
      if (number === 0) {
        zeroCount++;
      } else if (number % 2 === 0) {
        evenCount++;
      } else {
        oddCount++;
      }
    }

    const total = evenCount + oddCount + zeroCount || 1; // Avoid division by zero

    return {
      evenProbability: evenCount / total,
      oddProbability: oddCount / total,
      zeroProbability: zeroCount / total
    };
  }

  // Add a function to calculate house probabilities
  calculateHouseProbabilities() {
    let firstTwelve = 0;
    let secondTwelve = 0;
    let thirdTwelve = 0;
    let zeroCount = 0;

    // Count occurrences in each house
    for (const number of this.history) {
      if (number === 0) {
        zeroCount++;
      } else if (number >= 1 && number <= 12) {
        firstTwelve++;
      } else if (number >= 13 && number <= 24) {
        secondTwelve++;
      } else if (number >= 25 && number <= 36) {
        thirdTwelve++;
      }
    }

    const total = firstTwelve + secondTwelve + thirdTwelve + zeroCount || 1; // Avoid division by zero

    return {
      firstTwelveProbability: firstTwelve / total,
      secondTwelveProbability: secondTwelve / total,
      thirdTwelveProbability: thirdTwelve / total,
      zeroProbability: zeroCount / total
    };
  }

  // Add a function to calculate the range probabilities
  calculateRangeProbabilities() {
    let firstRangeCount = 0;
    let secondRangeCount = 0;
    let zeroCount = 0;

    // Count occurrences in each range
    for (const number of this.history) {
      if (number === 0) {
        zeroCount++;
      } else if (number >= 1 && number <= 18) {
        firstRangeCount++;
      } else if (number >= 19 && number <= 36) {
        secondRangeCount++;
      }
    }

    const total = firstRangeCount + secondRangeCount + zeroCount || 1; // Avoid division by zero

    return {
      firstRangeProbability: firstRangeCount / total,
      secondRangeProbability: secondRangeCount / total,
      zeroProbability: zeroCount / total
    };
  }

  // Add a function to determine which range has the highest probability
  determineHighestRange() {
    const rangeProbabilities = this.calculateRangeProbabilities();

    if (rangeProbabilities.firstRangeProbability > rangeProbabilities.secondRangeProbability) {
      return 'First Range (1-18)';
    } else if (rangeProbabilities.secondRangeProbability > rangeProbabilities.firstRangeProbability) {
      return 'Second Range (19-36)';
    } else {
      return 'Equal Probability';
    }
  }

  // Add a function to determine the highest probability outcome
  determineHighestProbability() {
    const parityProbabilities = this.calculateParityProbabilities();
    const houseProbabilities = this.calculateHouseProbabilities();

    const outcomes = [
      { category: 'Even', probability: parityProbabilities.evenProbability },
      { category: 'Odd', probability: parityProbabilities.oddProbability },
      { category: 'First Twelve', probability: houseProbabilities.firstTwelveProbability },
      { category: 'Second Twelve', probability: houseProbabilities.secondTwelveProbability }
    ];

    // Find the outcome with the highest probability
    const highestOutcome = outcomes.reduce((max, outcome) => outcome.probability > max.probability ? outcome : max, outcomes[0]);

    return highestOutcome;
  }

  // Add a function to determine the highest probability house
  determineHighestProbabilityHouse() {
    const houseProbabilities = this.calculateHouseProbabilities();

    const houses = [
      { category: 'First Twelve', probability: houseProbabilities.firstTwelveProbability },
      { category: 'Second Twelve', probability: houseProbabilities.secondTwelveProbability },
      { category: 'Third Twelve', probability: houseProbabilities.thirdTwelveProbability }
    ];

    // Find the house with the highest probability
    const highestHouse = houses.reduce((max, house) => house.probability > max.probability ? house : max, houses[0]);

    return highestHouse.category;
  }

  // Refine the highest probability house determination with noise filtering
  determineHighestProbabilityHouseWithNoiseFiltering() {
    const houseProbabilities = this.calculateHouseProbabilities();

    // Apply a smoothing factor to filter noise
    const smoothingFactor = 0.03// Adjusted smoothing factor
    const houses = [
      { category: 'First Twelve', probability: houseProbabilities.firstTwelveProbability + smoothingFactor },
      { category: 'Second Twelve', probability: houseProbabilities.secondTwelveProbability + smoothingFactor },
      { category: 'Third Twelve', probability: houseProbabilities.thirdTwelveProbability + smoothingFactor }
    ];

    // Find the house with the highest probability after filtering
    const highestHouse = houses.reduce((max, house) => house.probability > max.probability ? house : max, houses[0]);

    return highestHouse.category;
  }

  // Add a function to determine both the highest and lowest probability houses
  determineHouseProbabilitiesExtremes() {
    const houseProbabilities = this.calculateHouseProbabilities();

    const houses = [
      { category: 'First Twelve', probability: houseProbabilities.firstTwelveProbability },
      { category: 'Second Twelve', probability: houseProbabilities.secondTwelveProbability },
      { category: 'Third Twelve', probability: houseProbabilities.thirdTwelveProbability }
    ];

    // Find the house with the highest probability
    const highestHouse = houses.reduce((max, house) => house.probability > max.probability ? house : max, houses[0]);

    // Find the house with the lowest probability
    const lowestHouse = houses.reduce((min, house) => house.probability < min.probability ? house : min, houses[0]);

    return {
      highest: highestHouse.category,
      lowest: lowestHouse.category
    };
  }

  // Add a function to reset history dynamically
  resetHistory(newHistory = []) {
    this.history = newHistory;
  }

  // Add a function to log the current state of the engine
  logEngineState() {
    console.log("Current History:", this.history);
    console.log("Target RTP:", this.targetRTP);
    console.log("House Bias:", this.houseBias);
  }
}

module.exports = RouletteEngine;

if (require.main === module) {
  const engine = new RouletteEngine();
  const records = [];
  const spins = 20000000
; // Updated to 1000 spins
  for (let i = 1; i <= spins; i++) {
    const num = engine.spin();
    records.push({
      spin: i,
      number: num,
      parity: num === 0 ? 'zero' : (num % 2 === 0 ? 'even' : 'odd')
    });
  }

  // Display parity probabilities after 1000 spins
  const probabilities = engine.calculateParityProbabilities();
  console.log("Parity Probabilities after 1000 spins:", probabilities);

  // Display house probabilities after 1000 spins
  const houseProbabilities = engine.calculateHouseProbabilities();
  console.log("House Probabilities after 1000 spins:", houseProbabilities);

  // Display the highest probability outcome after 1000 spins
  const highestOutcome = engine.determineHighestProbability();
  console.log("Highest Probability Outcome after 1000 spins:", highestOutcome);

  // Display the highest probability house after 1000 spins
  const highestHouse = engine.determineHighestProbabilityHouse();
  console.log("Highest Probability House after 1000 spins:", highestHouse);

  // Display the highest probability house with noise filtering after 1000 spins
  const highestHouseWithNoiseFiltering = engine.determineHighestProbabilityHouseWithNoiseFiltering();
  console.log("Highest Probability House with Noise Filtering after 1000 spins:", highestHouseWithNoiseFiltering);

  // Display the highest and lowest probability houses after 1000 spins
  const { highest, lowest } = engine.determineHouseProbabilitiesExtremes();
  console.log("Highest Probability House after 1000 spins:", highest);
  console.log("Lowest Probability House after 1000 spins:", lowest);

  // Display range probabilities after 1000 spins
  const rangeProbabilities = engine.calculateRangeProbabilities();
  console.log("Range Probabilities after 1000 spins:", rangeProbabilities);

  // Display the highest probability range after 1000 spins
  const highestRange = engine.determineHighestRange();
  console.log("Highest Probability Range after 1000 spins:", highestRange);
}
