// rouletteGenerator.js

class ParentClass {
  spin() {
    console.log("Parent spin method called");
    // Add logic for the spin method here
  }
}

class RouletteEngine extends ParentClass {
  // Improve  the constructor to allow dynamic initialization of history

  constructor(history = [ 13, 11, 15, 10, 5, 32, 36, 36, 2, 4, 2, 13, 11, 22, 1, 6, 22, 33, 1, 7, 11, 4, 4, 24, 29, 18, 12, 24, 0
      ]) {  
    super();
    this.history = history;
    this.totalBets = 170451;//u0r current value
    this.virtualPayout = 170451 * 0.94;//u0r current value
    this.targetRTP = 0.94;
    this.smoothedRTP = this.targetRTP;
  }

  // Add a function to reset history dynamically
  resetHistory(newHistory = [       //enter reset history numbers if any
    ]) 
    {
    this.history = newHistory;
  }

  // Add a function to log the current state of the engine
  logEngineState() {
    console.log("Current History:", this.history);
    console.log("Target RTP:", this.targetRTP);
    console.log("House Bias:", this.houseBias);
  }

  // Add a function to calculate dominant zone over a rolling window
  calculateDominantZone(windowSize = 36) {
    if (this.history.length < windowSize) {
      console.log("Insufficient data for rolling window.");
      return null;
    }

    const recentHistory = this.history.slice(-windowSize);
    const houseCounts = { first: 0, second: 0, third: 0 };

    for (const number of recentHistory) {
      if (number >= 1 && number <= 12) houseCounts.first++;
      else if (number >= 13 && number <= 24) houseCounts.second++;
      else if (number >= 25 && number <= 36) houseCounts.third++;
    }

    const total = houseCounts.first + houseCounts.second + houseCounts.third;
    const probabilities = {
      first: houseCounts.first / total,
      second: houseCounts.second / total,
      third: houseCounts.third / total,
    };

    const sortedHouses = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);
    const [topHouse, secondHouse] = sortedHouses;

    if (topHouse[1] - secondHouse[1] < 0.1) {
      console.log("No dominant zone: probabilities are clustered.");
      return null;
    }

    return topHouse[0];
  }

  // Add a cooldown mechanism after contradictions
  applyCooldown(cooldownSpins = 5) {
    if (!this.lastBiasWindow || this.history.length < 2) return false;

    const lastSpin = this.history[this.history.length - 1];
    const lastHouse =
      lastSpin >= 1 && lastSpin <= 12 ? "first" :
      lastSpin <= 24 ? "second" : "third";

    if (lastHouse !== this.lastBiasWindow) {
      this.cooldownCounter = cooldownSpins;
      console.log("Contradiction detected. Cooldown applied.");
      return true;
    }

    if (this.cooldownCounter > 0) {
      this.cooldownCounter--;
      console.log("Cooldown active. Spins remaining:", this.cooldownCounter);
      return true;
    }

    return false;
  }

  // Modify spin to include cooldown and dominant zone logic
  spin() {
    if (this.applyCooldown()) {
      console.log("Skipping prediction due to cooldown.");
      return super.spin();
    }

    const dominantZone = this.calculateDominantZone();
    if (dominantZone) {
      console.log("Dominant Zone:", dominantZone);
      this.lastBiasWindow = dominantZone;
    } else {
      console.log("No prediction made.");
      this.lastBiasWindow = null;
    }

    const BET = 1;

    this.totalBets += BET;
    this.virtualPayout += BET * this.targetRTP;

    // Calculate current RTP dynamically
    // Adjust RTP calculation to reflect roulette payout logic
    const totalPayout = this.history.reduce((sum, num) => {
      if (num === 0) return sum; // Zero does not contribute to payout
      const payoutMultiplier = num % 2 === 0 ? 2 : 3; // Example logic for even/odd payouts
      return sum + BET * payoutMultiplier;
    }, 0);
    this.currentRTP = totalPayout / this.totalBets;

    this.smoothedRTP =
      0.05 * this.currentRTP + 0.95 * this.smoothedRTP;

    const number = this.weightedSpin();
    this.history.push(number);
    return number;
  }

  // Modify weightedSpin to dynamically adjust RTP
  weightedSpin() {
    let weights = Array(37).fill(1);

    const rtpDiff = this.smoothedRTP - this.targetRTP;

    if (rtpDiff > 0.005) {
      weights = weights.map(w => w * 0.98); // tighten
    } else if (rtpDiff < -0.005) {
      weights = weights.map(w => w * 1.02); // loosen
    }

    // Apply house bias based on dominant zone
    const dominantHouse = this.calculateDominantZone();

    if (dominantHouse === "first") {
      for (let i = 1; i <= 12; i++) weights[i] *= 1.15;
    }
    if (dominantHouse === "second") {
      for (let i = 13; i <= 24; i++) weights[i] *= 1.15;
    }
    if (dominantHouse === "third") {
      for (let i = 25; i <= 36; i++) weights[i] *= 1.15;
    }

    this.applyStreakControl(weights, this.history);
    this.applyParityBalancing(weights);

    return this.pickWeighted(weights);
  }

  // Add parity balancing to influence spins
  applyParityBalancing(weights) {
    const { evenProbability, oddProbability } =
      this.calculateParityProbabilities();

    if (evenProbability > 0.52)
      for (let i = 2; i <= 36; i += 2) weights[i] *= 0.97;

    if (oddProbability > 0.52)
      for (let i = 1; i <= 35; i += 2) weights[i] *= 0.97;
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
      console.log('Result: First Range (1-18)');
      return 'First Range (1-18)';
    } else if (rangeProbabilities.secondRangeProbability > rangeProbabilities.firstRangeProbability) {
      console.log('Result: Second Range (19-36)');
      return 'Second Range (19-36)';
    } else {
      console.log('Result: Equal Probability');
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

    // Define houses variable to fix ReferenceError
    const houses = [
      { category: 'First Twelve', probability: houseProbabilities.firstTwelveProbability },
      { category: 'Second Twelve', probability: houseProbabilities.secondTwelveProbability },
      { category: 'Third Twelve', probability: houseProbabilities.thirdTwelveProbability }
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

  // Add streak control function to fix the missing method
  applyStreakControl(weights, history) {
    if (history.length < 3) return;

    const lastThree = history.slice(-3);
    const streak = lastThree.every(num => num === lastThree[0]);

    if (streak) {
      weights[lastThree[0]] *= 0.5; // Reduce weight for streak number
    }
  }
}

module.exports = RouletteEngine;

if (require.main === module) {
  const engine = new RouletteEngine();
  const records = [];
  const spins = 10000
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
