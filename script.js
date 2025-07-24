window.onload = async function() {
  await getPkmn();
  addStats();
}

const resultsBox = document.getElementById("results");
const inputBox = document.getElementById("input");
let resistArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let weakArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let coverageArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let excluded = [];

input.onkeyup = function() {
  let result = [];
  let input = inputBox.value;

  if(input.length > 2) {
    result = pkmn.filter(function(k){
      return k.id.toLowerCase().includes(input.toLowerCase()) && !excluded.includes(k.id);
    });

    showResults(result);
    if(result.length === 0) {
      document.getElementById("resultList").remove();
    }
  } else if(document.getElementById("resultList")) {
    document.getElementById("resultList").remove();
  }
}

async function getPkmn(){
	let res = await fetch("https://dazzabound.github.io/pokemon-type-matchup/pkmn.json");
	pkmn = await res.json();
}

function showResults(result){

  resultsBox.innerHTML = "<div id='resultList'></div>";
  for(let c of result) {

    let card = document.createElement("div");
    card.classList.add("searchCard");
    card.onclick = function(){addPkmn(c.id)};

    let types = "";
    c.types.forEach(function(t){
      types += "<div class='text"+t+" typeBox'>"+t.charAt(0).toUpperCase()+t.slice(1)+"</div>"
    });

    card.innerHTML = "<img class='searchIcon' src="+c.imgUrl+"><div class='searchInfo'><div class='searchName'>"+c.name+"</div><div class='searchType'>"+types+"</div></div>"
    document.getElementById("resultList").appendChild(card);
  }

}

function clearSearch() {
	inputBox.value = "";
  if(document.getElementById("resultList")) {
    document.getElementById("resultList").remove();
  }
}

const effectiveness = {
  "normal": {
    "id": 0,
    "weak": [
      "fighting"
    ],
    "immune": [
      "ghost"
    ]
  },
  "fire": {
    "id": 1,
    "weak": [
      "water",
      "ground",
      "rock"
    ],
    "resist": [
      "fire",
      "grass",
      "ice",
      "bug",
      "steel",
      "fairy"
    ]
  },
  "water": {
    "id": 2,
    "weak": [
      "grass",
      "electric"
    ],
    "resist": [
      "fire",
      "water",
      "ice",
      "steel"
    ]
  },
  "electric": {
    "id": 3,
    "weak": [
      "ground"
    ],
    "resist": [
      "electric",
      "flying",
      "steel"
    ]
  },
  "grass": {
    "id": 4,
    "weak": [
      "fire",
      "ice",
      "poison",
      "flying",
      "bug"
    ],
    "resist": [
      "water",
      "grass",
      "electric",
      "ground",
    ]
  },
  "ice": {
    "id": 5,
    "weak": [
      "fire",
      "fighting",
      "rock",
      "steel"
    ],
    "resist": [
      "ice"
    ]
  },
  "fighting": {
    "id": 6,
    "weak": [
      "flying",
      "psychic",
      "fairy"
    ],
    "resist": [
      "bug",
      "rock",
      "dark"
    ]
  },
  "poison": {
    "id": 7,
    "weak": [
      "ground",
      "psychic"
    ],
    "resist": [
      "grass",
      "fighting",
      "poison",
      "bug",
      "fairy"
    ]
  },
  "ground": {
    "id": 8,
    "weak": [
      "water",
      "grass",
      "ice"
    ],
    "resist": [
      "poison",
      "rock"
    ],
    "immune": [
      "electric"
    ]
  },
  "flying": {
    "id": 9,
    "weak": [
      "electric",
      "ice",
      "rock"
    ],
    "resist": [
      "grass",
      "fighting",
      "bug"
    ],
    "immune": [
      "ground"
    ]
  },
  "psychic": {
    "id": 10,
    "weak": [
      "bug",
      "ghost",
      "dark"
    ],
    "resist": [
      "fighting",
      "psychic"
    ]
  },
  "bug": {
    "id": 11,
    "weak": [
      "fire",
      "flying",
      "rock"
    ],
    "resist": [
      "grass",
      "fighting",
      "ground"
    ]
  },
  "rock": {
    "id": 12,
    "weak": [
      "water",
      "grass",
      "fighting",
      "ground",
      "steel"
    ],
    "resist": [
      "normal",
      "fire",
      "poison",
      "flying"
    ]
  },
  "ghost": {
    "id": 13,
    "weak": [
      "ghost",
      "dark"
    ],
    "resist": [
      "poison",
      "bug"
    ],
    "immune": [
      "normal",
      "fighting"
    ]
  },
  "dragon": {
    "id": 14,
    "weak": [
      "ice",
      "dragon",
      "fairy"
    ],
    "resist": [
      "fire",
      "water",
      "grass",
      "electric"
    ]
  },
  "dark": {
    "id": 15,
    "weak": [
      "fighting",
      "bug",
      "fairy"
    ],
    "resist": [
      "ghost",
      "dark"
    ],
    "immune": [
      "psychic"
    ]
  },
  "steel": {
    "id": 16,
    "weak": [
      "fire",
      "fighting",
      "ground"
    ],
    "resist": [
      "normal",
      "grass",
      "ice",
      "flying",
      "psychic",
      "bug",
      "rock",
      "dragon",
      "steel",
      "fairy"
    ],
    "immune": [
      "poison"
    ]
  },
  "fairy": {
    "id": 17,
    "weak": [
      "poison",
      "steel"
    ],
    "resist": [
      "fighting",
      "bug",
      "dark"
    ],
    "immune": [
      "dragon"
    ]
  }
}

function addPkmn(p) {
  let i = pkmn.find(function(a){
    return a.id === p;
  });
  let tableCard = document.createElement("div");
  tableCard.id = i.id;
  tableCard.classList.add("tableGrid","pokeRow");
  tableCard.setAttribute("onclick","removePkmn('"+i.id+"')")

  let types = "";
  i.types.forEach(function(t){
    types += "<div class='text"+t+" typeBox'>"+t.charAt(0).toUpperCase()+t.slice(1)+"</div>"
  });

// FIGURE OUT SCORE

let typeScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

i.types.forEach(function(t){
  coverageArray[effectiveness[t].id] += 1;

  if(effectiveness[t].weak){
    effectiveness[t].weak.forEach(function(w){
      if(typeScore[effectiveness[w].id] !== -3){
      typeScore[effectiveness[w].id] += 1;
      }
    });
  };

  if(effectiveness[t].resist){
    effectiveness[t].resist.forEach(function(r){
      if(typeScore[effectiveness[r].id] !== -3){
      typeScore[effectiveness[r].id] += -1;
      }
    });
  };

  if(effectiveness[t].immune){
    effectiveness[t].immune.forEach(function(i){
      typeScore[effectiveness[i].id] = -3;
    });
  };
});

// ADD ROW TO TABLE

  tableCard.innerHTML = "<div class='tableCard'><img class='tableIcon' src="+i.imgUrl+"><div class='tableInfo'><div class='tableName'>"+i.name+"</div><div class='tableType'>"+types+"</div></div><div class='stat push'><b>TOTAL<br>"+i.stats[0]+"</b></div><div class='stat'>HP<br>"+i.stats[1]+"</div><div class='stat'>Atk<br>"+i.stats[2]+"</div><div class='stat'>Def<br>"+i.stats[3]+"</div><div class='stat'>SpA<br>"+i.stats[4]+"</div><div class='stat'>SpD<br>"+i.stats[5]+"</div><div class='stat'>Spe<br>"+i.stats[6]+"</div></div>";
  typeScore.forEach(function(s, index){
      if( s=== -3){tableCard.innerHTML += "<div class='typeEff eff-3'>X</div>"; resistArray[index] += 1}
      if( s=== -2){tableCard.innerHTML += "<div class='typeEff eff-2'>¼</div>"; resistArray[index] += 1}
      if( s=== -1){tableCard.innerHTML += "<div class='typeEff eff-1'>½</div>"; resistArray[index] += 1}
      if( s=== 0){tableCard.innerHTML += "<div></div>"}
      if( s=== 1){tableCard.innerHTML += "<div class='typeEff eff1'>x2</div>"; weakArray[index] += 1}
      if( s=== 2){tableCard.innerHTML += "<div class='typeEff eff2'>x4</div>"; weakArray[index] += 1}
  });
  
  document.getElementById("tableContent").appendChild(tableCard);
// RESET EXCLUDED LIST

  excluded = [];
  for(let i of document.querySelectorAll("#tableContent > div")) {
    excluded.push(i.id)
  };
  addStats();
  clearSearch();
}

function addStats(){
  if(document.getElementById("tableStats")){
    document.getElementById("tableStats").remove();
  };

  document.getElementById("tableContent").innerHTML += "<div id='tableStats'></div>"

  let resistRow = document.createElement("div");
  let weakRow = document.createElement("div");
  let typesUsed = document.createElement("div");
  resistRow.innerHTML = "<div class='footerText'>Total Resisted</div>";
  weakRow.innerHTML = "<div class='footerText'>Total Weak</div>";
  typesUsed.innerHTML = "<div class='footerText'>Types Used</div>";

  for(let r of resistArray) {
    let rBold = "";
    if( r > 3 ){rBold = ";font-weight:bold"}
    if( r > 0 ){resistRow.innerHTML += "<div class='statIcon' style='background:rgba(0,128,0,"+(0.15*r)+")"+rBold+"'>"+r+"</div>"} else {resistRow.innerHTML += "<div class='statIcon'></div>"}
  }
  for(let w of weakArray) {
    let wBold = "";
    if( w > 3 ){wBold = ";font-weight:bold"}
    if( w > 0 ){weakRow.innerHTML += "<div class='statIcon' style='background:rgba(256,0,0,"+(0.15*w)+")"+wBold+"'>"+w+"</div>"} else {weakRow.innerHTML += "<div class='statIcon'></div>"}
  }
  for(let c of coverageArray) {
    if ( c > 0){typesUsed.innerHTML += "<div class='statIcon' style='background:rgba(0,128,0,0.8)'>✔</div>"} else {typesUsed.innerHTML += "<div class='statIcon'></div>"}
  }
  
  document.getElementById("tableStats").append(resistRow);
  document.getElementById("tableStats").append(weakRow);
  document.getElementById("tableStats").append(typesUsed);

}

function removePkmn(r) {
  document.getElementById(r).remove();

  excluded = [];
  for(let i of document.querySelectorAll("#tableContent > div")) {
    excluded.push(i.id)
  };

  let i = pkmn.find(function(a){
    return a.id === r;
  });

  let typeScore = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  i.types.forEach(function(t){
    coverageArray[effectiveness[t].id] -= 1;
  
    if(effectiveness[t].weak){
      effectiveness[t].weak.forEach(function(w){
        if(typeScore[effectiveness[w].id] !== -3){
        typeScore[effectiveness[w].id] += 1;
        }
      });
    };
  
    if(effectiveness[t].resist){
      effectiveness[t].resist.forEach(function(r){
        if(typeScore[effectiveness[r].id] !== -3){
        typeScore[effectiveness[r].id] += -1;
        }
      });
    };
  
    if(effectiveness[t].immune){
      effectiveness[t].immune.forEach(function(i){
        typeScore[effectiveness[i].id] = -3;
      });
    };
  });

  typeScore.forEach(function(s, index){
    if( s < 0){resistArray[index] += -1}
    if( s > 0){weakArray[index] += -1}
});

  addStats();
}