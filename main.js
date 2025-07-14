// --------- Fantasy Draft Board Tier & Player Logic ---------

// ---- STATIC PLAYER LIST (edit as needed) ----
let players = [
   { id: 1, name: "Ja'Marr Chase", tag: "WR1", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 2, name: "Bijan Robinson", tag: "RB1", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 3, name: "Saquon Barkley", tag: "RB2", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 4, name: "Justin Jefferson", tag: "WR2", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 5, name: "Jahmyr Gibbs", tag: "RB3", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 6, name: "CeeDee Lamb", tag: "WR3", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 7, name: "Puka Nacua", tag: "WR4", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 8, name: "Malik Nabers", tag: "WR5", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 9, name: "Amon-Ra St. Brown", tag: "WR6", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 10, name: "Nico Collins", tag: "WR7", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 11, name: "Ashton Jeanty", tag: "RB4", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 12, name: "Brian Thomas Jr.", tag: "WR8", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 13, name: "Derrick Henry", tag: "RB5", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 14, name: "De'Von Achane", tag: "RB6", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 15, name: "Christian McCaffrey", tag: "RB7", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 16, name: "Drake London", tag: "WR9", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 17, name: "Brock Bowers", tag: "TE1", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 18, name: "A.J. Brown", tag: "WR10", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 19, name: "Josh Jacobs", tag: "RB8", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 20, name: "Jonathan Taylor", tag: "RB9", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 21, name: "Bucky Irving", tag: "RB10", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 22, name: "Ladd McConkey", tag: "WR11", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 23, name: "Trey McBride", tag: "TE2", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 24, name: "Kyren Williams", tag: "RB11", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 25, name: "Josh Allen", tag: "QB1", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 26, name: "Lamar Jackson", tag: "QB2", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 27, name: "Chase Brown", tag: "RB12", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 28, name: "Tee Higgins", tag: "WR12", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 29, name: "Jaxon Smith-Njigba", tag: "WR13", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 30, name: "Tyreek Hill", tag: "WR14", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 31, name: "Jayden Daniels", tag: "QB3", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 32, name: "Garrett Wilson", tag: "WR15", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 33, name: "Rashee Rice", tag: "WR16", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 34, name: "Breece Hall", tag: "RB13", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 35, name: "George Kittle", tag: "TE3", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 36, name: "Davante Adams", tag: "WR17", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 37, name: "Mike Evans", tag: "WR18", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 38, name: "James Cook", tag: "RB14", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 39, name: "Terry McLaurin", tag: "WR19", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 40, name: "Jalen Hurts", tag: "QB4", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 41, name: "Kenneth Walker III", tag: "RB15", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 42, name: "Alvin Kamara", tag: "RB16", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 43, name: "Marvin Harrison Jr.", tag: "WR20", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 44, name: "DJ Moore", tag: "WR21", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 45, name: "Chuba Hubbard", tag: "RB17", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 46, name: "Joe Burrow", tag: "QB5", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 47, name: "James Conner", tag: "RB18", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 48, name: "DK Metcalf", tag: "WR22", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 49, name: "Joe Mixon", tag: "RB19", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 50, name: "Courtland Sutton", tag: "WR23", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 51, name: "DeVonta Smith", tag: "WR24", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 52, name: "Zay Flowers", tag: "WR25", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 53, name: "Omarion Hampton", tag: "RB20", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 54, name: "Jameson Williams", tag: "WR26", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 55, name: "David Montgomery", tag: "RB21", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 56, name: "Sam LaPorta", tag: "TE4", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 57, name: "D'Andre Swift", tag: "RB22", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 58, name: "RJ Harvey", tag: "RB23", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 59, name: "Patrick Mahomes II", tag: "QB6", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 60, name: "Xavier Worthy", tag: "WR27", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 61, name: "Aaron Jones Sr.", tag: "RB24", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 62, name: "Jaylen Waddle", tag: "WR28", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 63, name: "TreVeyon Henderson", tag: "RB25", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 64, name: "Tetairoa McMillan", tag: "WR29", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 65, name: "Baker Mayfield", tag: "QB7", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 66, name: "Chris Olave", tag: "WR30", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 67, name: "Quinshon Judkins", tag: "RB26", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 68, name: "Tony Pollard", tag: "RB27", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 69, name: "Travis Hunter", tag: "WR31", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 70, name: "Chris Godwin", tag: "WR32", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 71, name: "Calvin Ridley", tag: "WR33", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 72, name: "Isiah Pacheco", tag: "RB28", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 73, name: "Kaleb Johnson", tag: "RB29", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 74, name: "T.J. Hockenson", tag: "TE5", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 75, name: "George Pickens", tag: "WR34", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 76, name: "Jordan Addison", tag: "WR35", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 77, name: "Brian Robinson Jr.", tag: "RB30", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 78, name: "Bo Nix", tag: "QB8", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 79, name: "Jerry Jeudy", tag: "WR36", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 80, name: "Kyler Murray", tag: "QB9", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 81, name: "Rome Odunze", tag: "WR37", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 82, name: "Travis Kelce", tag: "TE6", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 83, name: "Mark Andrews", tag: "TE7", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 84, name: "Jauan Jennings", tag: "WR38", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 85, name: "David Njoku", tag: "TE8", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 86, name: "Evan Engram", tag: "TE9", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 87, name: "Jaylen Warren", tag: "RB31", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 88, name: "Khalil Shakir", tag: "WR39", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 89, name: "Jakobi Meyers", tag: "WR40", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 90, name: "Justin Fields", tag: "QB10", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 91, name: "Tyrone Tracy Jr.", tag: "RB32", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 92, name: "Brock Purdy", tag: "QB11", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 93, name: "Najee Harris", tag: "RB33", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 94, name: "Caleb Williams", tag: "QB12", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 95, name: "Travis Etienne Jr.", tag: "RB34", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 96, name: "Justin Herbert", tag: "QB13", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 97, name: "Deebo Samuel Sr.", tag: "WR41", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 98, name: "Jayden Reed", tag: "WR42", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 99, name: "Dak Prescott", tag: "QB14", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 100, name: "Jared Goff", tag: "QB15", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 101, name: "Tucker Kraft", tag: "TE10", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 102, name: "Stefon Diggs", tag: "WR43", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 103, name: "Javonte Williams", tag: "RB35", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 104, name: "Josh Downs", tag: "WR44", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 105, name: "Rhamondre Stevenson", tag: "RB36", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 106, name: "Zach Charbonnet", tag: "RB37", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 107, name: "Ricky Pearsall", tag: "WR45", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 108, name: "Drake Maye", tag: "QB16", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 109, name: "Jordan Love", tag: "QB17", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 110, name: "Jordan Mason", tag: "RB38", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 111, name: "Michael Pittman Jr.", tag: "WR46", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 112, name: "Cooper Kupp", tag: "WR47", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 113, name: "Brandon Aiyuk", tag: "WR48", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 114, name: "Cam Skattebo", tag: "RB39", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 115, name: "Trevor Lawrence", tag: "QB18", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 116, name: "C.J. Stroud", tag: "QB19", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 117, name: "Tyjae Spears", tag: "RB40", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 118, name: "Dalton Kincaid", tag: "TE11", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 119, name: "Darnell Mooney", tag: "WR49", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 120, name: "Rachaad White", tag: "RB41", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 121, name: "Jake Ferguson", tag: "TE12", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 122, name: "Tank Bigsby", tag: "RB42", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 123, name: "Tyler Warren", tag: "TE13", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 124, name: "Dallas Goedert", tag: "TE14", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 125, name: "Jonnu Smith", tag: "TE15", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 126, name: "J.J. McCarthy", tag: "QB20", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 127, name: "Keon Coleman", tag: "WR50", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 128, name: "Ray Davis", tag: "RB43", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 129, name: "Rashid Shaheed", tag: "WR51", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 130, name: "Matthew Stafford", tag: "QB21", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 131, name: "Matthew Golden", tag: "WR52", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 132, name: "Tua Tagovailoa", tag: "QB22", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 133, name: "Austin Ekeler", tag: "RB44", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 134, name: "Christian Kirk", tag: "WR53", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 135, name: "Trey Benson", tag: "RB45", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 136, name: "Emeka Egbuka", tag: "WR54", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 137, name: "Rico Dowdle", tag: "RB46", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 138, name: "Tyler Allgeier", tag: "RB47", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 139, name: "Colston Loveland", tag: "TE16", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 140, name: "Rashod Bateman", tag: "WR55", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 141, name: "Luther Burden III", tag: "WR56", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 142, name: "J.K. Dobbins", tag: "RB48", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 143, name: "Isaac Guerendo", tag: "RB49", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 144, name: "Hunter Henry", tag: "TE17", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 145, name: "Bryce Young", tag: "QB23", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 146, name: "Marvin Mims Jr.", tag: "WR57", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 147, name: "Bhayshul Tuten", tag: "RB50", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 148, name: "Cedric Tillman", tag: "WR58", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 149, name: "Jaylen Wright", tag: "RB51", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 150, name: "Kyle Pitts", tag: "TE18", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 151, name: "Michael Penix Jr.", tag: "QB24", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 152, name: "Marquise Brown", tag: "WR59", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 153, name: "Jaydon Blue", tag: "RB52", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 154, name: "Zach Ertz", tag: "TE19", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 155, name: "Braelon Allen", tag: "RB53", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 156, name: "Romeo Doubs", tag: "WR60", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 157, name: "Tre Harris", tag: "WR61", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 158, name: "Geno Smith", tag: "QB25", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 159, name: "Isaiah Likely", tag: "TE20", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 160, name: "Adam Thielen", tag: "WR62", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 161, name: "Roschon Johnson", tag: "RB54", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 162, name: "Jalen McMillan", tag: "WR63", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 163, name: "Quentin Johnston", tag: "WR64", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 164, name: "Kyle Williams", tag: "WR65", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 165, name: "MarShawn Lloyd", tag: "RB55", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 166, name: "Blake Corum", tag: "RB56", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 167, name: "Wan'Dale Robinson", tag: "WR66", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 168, name: "Jerome Ford", tag: "RB57", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 169, name: "Broncos D/ST", tag: "DST1", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 170, name: "Jayden Higgins", tag: "WR67", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 171, name: "Xavier Legette", tag: "WR68", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 172, name: "Philadelphia Eagles D/ST", tag: "DST2", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 173, name: "Nick Chubb", tag: "RB58", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 174, name: "Sam Darnold", tag: "QB26", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 175, name: "Pat Freiermuth", tag: "TE21", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 176, name: "Mike Gesicki", tag: "TE22", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 177, name: "Cameron Ward", tag: "QB27", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 178, name: "Joshua Palmer", tag: "WR69", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 179, name: "DeAndre Hopkins", tag: "WR70", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 180, name: "Brenton Strange", tag: "TE23", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 181, name: "Baltimore Ravens D/ST", tag: "DST3", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 182, name: "Minnesota Vikings D/ST", tag: "DST4", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 183, name: "DeMario Douglas", tag: "WR71", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 184, name: "Cade Otton", tag: "TE24", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 185, name: "Pittsburgh Steelers D/ST", tag: "DST5", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 186, name: "Jack Bech", tag: "WR72", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 187, name: "Dylan Sampson", tag: "RB59", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 188, name: "Alec Pierce", tag: "WR73", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 189, name: "Kansas City Chiefs D/ST", tag: "DST6", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 190, name: "Texans D/ST", tag: "DST7", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 191, name: "Buffalo Bills D/ST", tag: "DST8", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 192, name: "Jalen Coker", tag: "WR74", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 193, name: "Brandon Aubrey", tag: "K1", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 194, name: "Kareem Hunt", tag: "RB60", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 195, name: "Jake Bates", tag: "K2", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 196, name: "Chig Okonkwo", tag: "TE25", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 197, name: "Aaron Rodgers", tag: "QB28", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 198, name: "DJ Giddens", tag: "RB61", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 199, name: "Michael Wilson", tag: "WR75", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 200, name: "Justice Hill", tag: "RB62", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 201, name: "Cameron Dicker", tag: "K3", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 202, name: "Mason Taylor", tag: "TE26", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 203, name: "Dontayvion Wicks", tag: "WR76", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 204, name: "Detroit Lions D/ST", tag: "DST9", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 205, name: "Wil Lutz", tag: "K4", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 206, name: "Dalton Schultz", tag: "TE27", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 207, name: "Los Angeles Chargers D/ST", tag: "DST10", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 208, name: "Kendre Miller", tag: "RB63", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 209, name: "Chris Boswell", tag: "K5", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 210, name: "Green Bay Packers D/ST", tag: "DST11", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 211, name: "Los Angeles Rams D/ST", tag: "DST12", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 212, name: "Seahawks D/ST", tag: "DST13", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 213, name: "Chase McLaughlin", tag: "K6", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 214, name: "Adonai Mitchell", tag: "WR77", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 215, name: "Darius Slayton", tag: "WR78", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 216, name: "Ka'imi Fairbairn", tag: "K7", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 217, name: "New York Jets D/ST", tag: "DST14", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 218, name: "Devin Neal", tag: "RB64", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 219, name: "Andrei Iosivas", tag: "WR79", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 220, name: "Jaleel McLaughlin", tag: "RB65", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 221, name: "Harrison Butker", tag: "K8", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 222, name: "Jaylin Noel", tag: "WR80", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 223, name: "Evan McPherson", tag: "K9", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 224, name: "Ja'Tavion Sanders", tag: "TE28", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 225, name: "Miles Sanders", tag: "RB66", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 226, name: "Kyle Monangai", tag: "RB67", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 227, name: "Tyler Bass", tag: "K10", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 228, name: "Juwan Johnson", tag: "TE29", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 229, name: "Anthony Richardson Sr.", tag: "QB29", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 230, name: "Will Shipley", tag: "RB68", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 231, name: "Audric Estime", tag: "RB69", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 232, name: "Jake Elliott", tag: "K11", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 233, name: "Keenan Allen", tag: "WR81", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 234, name: "Raheem Mostert", tag: "RB70", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 235, name: "Cole Kmet", tag: "TE30", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 236, name: "Devaughn Vele", tag: "WR82", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 237, name: "San Francisco 49ers D/ST", tag: "DST15", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 238, name: "Calvin Austin III", tag: "WR83", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 239, name: "Keaton Mitchell", tag: "RB71", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 240, name: "Russell Wilson", tag: "QB30", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 241, name: "Tyler Lockett", tag: "WR84", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 242, name: "Jason Sanders", tag: "K12", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 243, name: "Jalen Tolbert", tag: "WR85", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 244, name: "Pat Bryant", tag: "WR86", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 245, name: "Elijah Mitchell", tag: "RB72", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 246, name: "Elijah Arroyo", tag: "TE31", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 247, name: "Elic Ayomanor", tag: "WR87", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 248, name: "Younghoe Koo", tag: "K13", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 249, name: "Jarquez Hunter", tag: "RB73", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 250, name: "Daniel Jones", tag: "QB31", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 251, name: "Buccaneers D/ST", tag: "DST16", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 252, name: "Brandin Cooks", tag: "WR88", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 253, name: "Cowboys D/ST", tag: "DST17", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 254, name: "Devin Singletary", tag: "RB74", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 255, name: "Ollie Gordon II", tag: "RB75", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 256, name: "Trevor Etienne", tag: "RB76", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 257, name: "Diontae Johnson", tag: "WR89", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 258, name: "Antonio Gibson", tag: "RB77", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 259, name: "Joshua Karty", tag: "K14", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 260, name: "Kenneth Gainwell", tag: "RB78", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 261, name: "Roman Wilson", tag: "WR90", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 262, name: "Brashard Smith", tag: "RB79", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 263, name: "Nick Westbrook-Ikhine", tag: "WR91", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 264, name: "Kayshon Boutte", tag: "WR92", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 265, name: "Dyami Brown", tag: "WR93", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 266, name: "Tahj Brooks", tag: "RB80", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 267, name: "Amari Cooper", tag: "WR94", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 268, name: "Noah Gray", tag: "TE32", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 269, name: "Matt Gay", tag: "K15", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 270, name: "Khalil Herbert", tag: "RB81", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 271, name: "Cleveland Browns D/ST", tag: "DST18", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 272, name: "Elijah Moore", tag: "WR95", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 273, name: "Ty Johnson", tag: "RB82", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 274, name: "Mike Williams", tag: "WR96", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 275, name: "Sean Tucker", tag: "RB83", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 276, name: "Noah Fant", tag: "TE33", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 277, name: "Zack Moss", tag: "RB84", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 278, name: "Jalen Royals", tag: "WR97", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 279, name: "Jordan James", tag: "RB85", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 280, name: "Malik Washington", tag: "WR98", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 281, name: "Tyler Shough", tag: "QB32", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 282, name: "Woody Marks", tag: "RB86", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 283, name: "Isaiah Davis", tag: "RB87", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 284, name: "Harold Fannin Jr.", tag: "TE34", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 285, name: "Joe Flacco", tag: "QB33", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 286, name: "Tre Tucker", tag: "WR99", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 287, name: "Chicago Bears D/ST", tag: "DST19", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 288, name: "Tim Patrick", tag: "WR100", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 289, name: "Theo Johnson", tag: "TE35", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 290, name: "Taysom Hill", tag: "TE36", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 291, name: "Alexander Mattison", tag: "RB88", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 292, name: "Kimani Vidal", tag: "RB89", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 293, name: "Jaxson Dart", tag: "QB34", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 294, name: "Sincere McCormick", tag: "RB90", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 295, name: "Dameon Pierce", tag: "RB91", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 296, name: "Terrance Ferguson", tag: "TE37", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 297, name: "Daniel Carlson", tag: "K16", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 298, name: "Xavier Restrepo", tag: "WR101", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 299, name: "Parker Washington", tag: "WR102", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 300, name: "Jalen Nailor", tag: "WR103", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 301, name: "Darren Waller", tag: "TE38", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 302, name: "Christian Watson", tag: "WR104", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 303, name: "Damien Martinez", tag: "RB92", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 304, name: "Gabe Davis", tag: "WR105", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 305, name: "Jason Myers", tag: "K17", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 306, name: "Tory Horton", tag: "WR106", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 307, name: "Luke McCaffrey", tag: "WR107", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 308, name: "Phil Mafah", tag: "RB93", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 309, name: "Ty Chandler", tag: "RB94", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 310, name: "Emanuel Wilson", tag: "RB95", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 311, name: "Isaac TeSlaa", tag: "WR108", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 312, name: "Oronde Gadsden II", tag: "TE39", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 313, name: "Ben Sinnott", tag: "TE40", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 314, name: "Chris Brooks", tag: "RB96", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 315, name: "Tyler Higbee", tag: "TE41", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 316, name: "Tez Johnson", tag: "WR109", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 317, name: "Shedeur Sanders", tag: "QB35", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 318, name: "Jermaine Burton", tag: "WR110", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 319, name: "Tyler Conklin", tag: "TE42", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 320, name: "Chris Rodriguez Jr.", tag: "RB97", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 321, name: "Dolphins D/ST", tag: "DST20", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 322, name: "Raheim Sanders", tag: "RB98", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 323, name: "Tutu Atwell", tag: "WR111", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 324, name: "Will Dissly", tag: "TE43", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 325, name: "Dont'e Thornton Jr.", tag: "WR112", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 326, name: "Will Reichard", tag: "K18", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 327, name: "Gus Edwards", tag: "RB99", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 328, name: "Zamir White", tag: "RB100", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 329, name: "Jacory Croskey-Merritt", tag: "RB101", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 330, name: "New England Patriots D/ST", tag: "DST21", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 331, name: "Cardinals D/ST", tag: "DST22", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 332, name: "Jordan Whittington", tag: "WR113", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 333, name: "Tai Felton", tag: "WR114", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 334, name: "Ray-Ray McCloud III", tag: "WR115", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 335, name: "Tyler Loop", tag: "K19", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 336, name: "A.J. Dillon", tag: "RB102", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 337, name: "Samaje Perine", tag: "RB103", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 338, name: "John Metchie III", tag: "WR116", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 339, name: "Cam Akers", tag: "RB104", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 340, name: "Jalen Milroe", tag: "QB36", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 341, name: "Justin Tucker", tag: "K20", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 342, name: "Marquez Valdes-Scantling", tag: "WR117", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 343, name: "Savion Williams", tag: "WR118", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 344, name: "Josh Reynolds", tag: "WR119", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 345, name: "Troy Franklin", tag: "WR120", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 346, name: "Dawson Knox", tag: "TE44", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 347, name: "Michael Mayer", tag: "TE45", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 348, name: "Demarcus Robinson", tag: "WR121", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 349, name: "Noah Brown", tag: "WR122", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 350, name: "KaVontae Turpin", tag: "WR123", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 351, name: "New York Giants D/ST", tag: "DST23", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 352, name: "Jake Moody", tag: "K21", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 353, name: "Cam Little", tag: "K22", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 354, name: "Donovan Edwards", tag: "RB105", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 355, name: "Jameis Winston", tag: "QB37", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 356, name: "Spencer Rattler", tag: "QB38", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 357, name: "Austin Hooper", tag: "TE46", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 358, name: "Chimere Dike", tag: "WR124", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 359, name: "Luke Musgrave", tag: "TE47", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 360, name: "Tank Dell", tag: "WR125", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 361, name: "Mack Hollins", tag: "WR126", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 362, name: "LeQuint Allen Jr.", tag: "RB106", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 363, name: "Brandon McManus", tag: "K23", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 364, name: "Kirk Cousins", tag: "QB39", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 365, name: "Allen Lazard", tag: "WR127", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 366, name: "Greg Dortch", tag: "WR128", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 367, name: "Gunnar Helm", tag: "TE48", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 368, name: "Isaiah Bond", tag: "WR129", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 369, name: "Jaylin Lane", tag: "WR130", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 370, name: "Curtis Samuel", tag: "WR131", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 371, name: "Kenny Pickett", tag: "QB40", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 372, name: "Foster Moreau", tag: "TE49", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 373, name: "Tommy Tremble", tag: "TE50", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 374, name: "Commanders D/ST", tag: "DST24", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 375, name: "Van Jefferson", tag: "WR132", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 376, name: "Trey Sermon", tag: "RB107", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 377, name: "Robert Woods", tag: "WR133", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 378, name: "Emari Demercado", tag: "RB108", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 379, name: "Jahan Dotson", tag: "WR134", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 380, name: "Ameer Abdullah", tag: "RB109", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 381, name: "Dillon Gabriel", tag: "QB41", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 382, name: "Arian Smith", tag: "WR135", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 383, name: "Kendrick Bourne", tag: "WR136", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 384, name: "Eddy Pineiro", tag: "K24", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 385, name: "Mason Rudolph", tag: "QB42", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 386, name: "Kalel Mullings", tag: "RB110", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 387, name: "Jeremy McNichols", tag: "RB111", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 388, name: "Luke Schoonmaker", tag: "TE51", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 389, name: "Falcons D/ST", tag: "DST25", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 390, name: "Will Levis", tag: "QB43", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 391, name: "Craig Reynolds", tag: "RB112", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 392, name: "Jacob Cowing", tag: "WR137", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 393, name: "Antwane Wells Jr.", tag: "WR138", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 394, name: "Theo Wease Jr.", tag: "WR139", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 395, name: "Ja'Lynn Polk", tag: "WR140", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 396, name: "Matt Prater", tag: "K25", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 397, name: "Olamide Zaccheaus", tag: "WR141", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 398, name: "Blake Grupe", tag: "K26", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 399, name: "Cairo Santos", tag: "K27", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 400, name: "Ja'Quinden Jackson", tag: "RB113", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 401, name: "Chad Ryland", tag: "K28", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 402, name: "JuJu Smith-Schuster", tag: "WR142", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 403, name: "Josh Oliver", tag: "TE52", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 404, name: "Cordarrelle Patterson", tag: "RB114", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 405, name: "Zay Jones", tag: "WR143", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 406, name: "Jalin Hyatt", tag: "WR144", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 407, name: "Cade Stover", tag: "TE53", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 408, name: "Malachi Corley", tag: "WR145", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 409, name: "Graham Gano", tag: "K29", position: "K", drafted: false, draftedBy: null, pickNumber: null },
  { id: 410, name: "Kenny McIntosh", tag: "RB115", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 411, name: "Jeremy Ruckert", tag: "TE54", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 412, name: "D'Ernest Johnson", tag: "RB116", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 413, name: "Joe Milton III", tag: "QB44", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 414, name: "Hunter Luepke", tag: "RB117", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 415, name: "Jonathon Brooks", tag: "RB118", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 416, name: "Josh Whyle", tag: "TE55", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 417, name: "Grant Calcaterra", tag: "TE56", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 418, name: "Elijah Higgins", tag: "TE57", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 419, name: "Kyle Juszczyk", tag: "RB119", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 420, name: "Stone Smartt", tag: "TE58", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 421, name: "Marcus Yarns", tag: "RB120", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 422, name: "Javon Baker", tag: "WR146", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 423, name: "Indianapolis Colts D/ST", tag: "DST26", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 424, name: "Kalif Raymond", tag: "WR147", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 425, name: "AJ Barner", tag: "TE59", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 426, name: "KeAndre Lambert-Smith", tag: "WR148", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 427, name: "Clyde Edwards-Helaire", tag: "RB121", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 428, name: "Cincinnati Bengals D/ST", tag: "DST27", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 429, name: "Zach Wilson", tag: "QB45", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 430, name: "Las Vegas Raiders D/ST", tag: "DST28", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 431, name: "Darnell Washington", tag: "TE60", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 432, name: "New Orleans Saints D/ST", tag: "DST29", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 433, name: "Hassan Haskins", tag: "RB122", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 434, name: "Marcus Mariota", tag: "QB46", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 435, name: "Tyler Goodson", tag: "RB123", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 436, name: "KhaDarel Hodge", tag: "WR149", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 437, name: "Aidan O'Connell", tag: "QB47", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 438, name: "Colby Parkinson", tag: "TE61", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 439, name: "Will Howard", tag: "QB48", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 440, name: "Alec Ingold", tag: "RB124", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 441, name: "Treylon Burks", tag: "WR150", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 442, name: "Deuce Vaughn", tag: "RB125", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 443, name: "Carson Steele", tag: "RB126", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 444, name: "Brevin Jordan", tag: "TE62", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 445, name: "Mitchell Evans", tag: "TE63", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 446, name: "Julian Hill", tag: "TE64", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 447, name: "Jamari Thrash", tag: "WR151", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 448, name: "Jake Bobo", tag: "WR152", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 449, name: "Jake Browning", tag: "QB49", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 450, name: "Greg Dulcich", tag: "TE65", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 451, name: "Kaden Prather", tag: "WR153", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 452, name: "Tanner Hudson", tag: "TE66", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 453, name: "Sam Howell", tag: "QB50", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 454, name: "Efton Chism III", tag: "WR154", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 455, name: "Julius Chestnut", tag: "RB127", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 456, name: "Pharaoh Brown", tag: "TE67", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 457, name: "Michael Carter", tag: "RB128", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 458, name: "Tyrod Taylor", tag: "QB51", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 459, name: "Chris Tyree", tag: "RB129", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 460, name: "Malik Willis", tag: "QB52", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 461, name: "Tyler Johnson", tag: "WR155", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 462, name: "Pierre Strong Jr.", tag: "RB130", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 463, name: "Daniel Bellinger", tag: "TE68", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 464, name: "Jonathan Mingo", tag: "WR156", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 465, name: "Brock Wright", tag: "TE69", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 466, name: "Rondale Moore", tag: "WR157", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 467, name: "Bub Means", tag: "WR158", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 468, name: "Dare Ogunbowale", tag: "RB131", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 469, name: "Ezekiel Elliott", tag: "RB132", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 470, name: "Luke Lachey", tag: "TE70", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 471, name: "Johnny Mundt", tag: "TE71", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 472, name: "Jimmy Horn Jr.", tag: "WR159", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 473, name: "Jordan Watkins", tag: "WR160", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 474, name: "Jacksonville Jaguars D/ST", tag: "DST30", position: "DST", drafted: false, draftedBy: null, pickNumber: null },
  { id: 475, name: "Derius Davis", tag: "WR161", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 476, name: "Drew Sample", tag: "TE72", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 477, name: "Dylan Laube", tag: "RB133", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 478, name: "C.J. Ham", tag: "RB134", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 479, name: "Harrison Bryant", tag: "TE73", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 480, name: "Michael Gallup", tag: "WR162", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 481, name: "Michael Burton", tag: "RB135", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 482, name: "Patrick Taylor Jr.", tag: "RB136", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 483, name: "Tyler Badie", tag: "RB137", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 484, name: "Hunter Renfrow", tag: "WR163", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 485, name: "Devontez Walker", tag: "WR164", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 486, name: "DeAndre Carter", tag: "WR165", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 487, name: "Adam Trautman", tag: "TE74", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 488, name: "David Moore", tag: "WR166", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 489, name: "Kylen Granson", tag: "TE75", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 490, name: "Cooper Rush", tag: "QB53", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 491, name: "Jared Wiley", tag: "TE76", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 492, name: "Justin Watson", tag: "WR167", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 493, name: "Payne Durham", tag: "TE77", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 494, name: "Brevyn Spann-Ford", tag: "TE78", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 495, name: "Mac Jones", tag: "QB54", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 496, name: "Jacoby Brissett", tag: "QB55", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 497, name: "Mecole Hardman Jr.", tag: "WR168", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 498, name: "Ricky White III", tag: "WR169", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 499, name: "Luke Farrell", tag: "TE79", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 500, name: "Rasheen Ali", tag: "RB138", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 501, name: "Patrick Ricard", tag: "RB139", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 502, name: "Charlie Woerner", tag: "TE80", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 503, name: "Jimmy Garoppolo", tag: "QB56", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 504, name: "Michael Woods II", tag: "WR170", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 505, name: "Ronnie Rivers", tag: "RB140", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 506, name: "Xavier Smith", tag: "WR171", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 507, name: "Mo Alie-Cox", tag: "TE81", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 508, name: "Travis Homer", tag: "RB141", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 509, name: "Cedrick Wilson Jr.", tag: "WR172", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 510, name: "Gardner Minshew II", tag: "QB57", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 511, name: "Troy Hairston II", tag: "RB142", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 512, name: "Johnny Wilson", tag: "WR173", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 513, name: "Jelani Woods", tag: "TE82", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 514, name: "Nick Nash", tag: "WR174", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 515, name: "Hendon Hooker", tag: "QB58", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 516, name: "John Bates", tag: "TE83", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 517, name: "Lan Larison", tag: "RB143", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 518, name: "Deshaun Watson", tag: "QB59", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 519, name: "David Bell", tag: "WR175", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 520, name: "Velus Jones Jr.", tag: "WR176", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 521, name: "DeeJay Dallas", tag: "RB144", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 522, name: "Tyson Bagent", tag: "QB60", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 523, name: "Sione Vaki", tag: "RB145", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 524, name: "Israel Abanikanda", tag: "RB146", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 525, name: "Jakob Johnson", tag: "RB147", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 526, name: "Ainias Smith", tag: "WR177", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 527, name: "Tanner Conner", tag: "TE84", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 528, name: "Frank Gore Jr.", tag: "RB148", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 529, name: "Teagan Quitoriano", tag: "TE85", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 530, name: "Tylan Wallace", tag: "WR178", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 531, name: "Simi Fehoko", tag: "WR179", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 532, name: "Darrynton Evans", tag: "RB149", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 533, name: "Eric Gray", tag: "RB150", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 534, name: "Bo Melton", tag: "WR180", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 535, name: "Trent Sherfield Sr.", tag: "WR181", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  // ...add more players as needed, matching your old file format
];

let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

let tierBreaks = [];
let editingTiers = false;
let addingTierMode = false;
let addTierIdx = null;

const searchInput = document.getElementById("searchInput");
const tableBody = document.querySelector("#playerTable tbody");
const teamCountSelect = document.getElementById("teamCount");
const yourTeamSelect = document.getElementById("yourTeamSelect");
const myPickSelect = document.getElementById("myPickIndex");
const startDraftBtn = document.getElementById("startDraftBtn");
const currentPickDisplay = document.getElementById("currentPickDisplay");
const teamNamesContainer = document.getElementById("teamNames");

// -------- Render Table ----------
function getVisiblePlayers() {
  const keyword = searchInput.value.toLowerCase();
  const hidePicked = document.getElementById("hidePickedCheckbox").checked;
  return players.filter(player => {
    const matchesFilter = currentFilter === "ALL" || player.position === currentFilter;
    const matchesSearch = player.name.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch && (!hidePicked || !player.drafted);
  });
}

function renderTable() {
  const visiblePlayers = getVisiblePlayers();
  // On first render or player count change, break into even tiers of 5
  if (!Array.isArray(tierBreaks) || tierBreaks.length === 0 || tierBreaks[tierBreaks.length-1] !== visiblePlayers.length) {
    const n = visiblePlayers.length;
    let breaks = [0];
    for (let i = 5; i < n; i += 5) breaks.push(i);
    breaks.push(n);
    tierBreaks = breaks;
  }
  tierBreaks = tierBreaks.filter(b => b >= 0 && b <= visiblePlayers.length);
  if (tierBreaks[0] !== 0) tierBreaks.unshift(0);
  if (tierBreaks[tierBreaks.length-1] !== visiblePlayers.length) tierBreaks.push(visiblePlayers.length);

  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";
document.getElementById("myK").innerHTML = "";
document.getElementById("myDST").innerHTML = "";
  for (let t = 0; t < tierBreaks.length - 1; t++) {
    // ---- Slim blue tier line ----
    let tierLabel = `Tier ${t + 1}`;
    // Blue slim line with left label
    const trDivider = document.createElement("tr");
    trDivider.className = "tier-divider-tr";
    const tdDivider = document.createElement("td");
    tdDivider.className = "tier-divider-td";
    tdDivider.colSpan = 6;
    const tierLine = document.createElement("div");
    tierLine.className = "tier-divider-line";
    // Label ON the line, left
    const label = document.createElement("span");
    label.className = "tier-divider-label";
    label.textContent = tierLabel;
    tierLine.appendChild(label);
    // Controls: only in edit mode, not for Tier 1 (locked)
    if (editingTiers && t > 0) {
      const controls = document.createElement("span");
      controls.className = "tier-divider-controls";
      // Up
      const upBtn = document.createElement("button");
      upBtn.title = "Move tier up";
      upBtn.innerHTML = "↑";
      upBtn.onclick = e => { e.stopPropagation(); moveTier(t, -1); };
      upBtn.disabled = tierBreaks[t] <= tierBreaks[t-1] + 1;
      controls.appendChild(upBtn);
      // Down
      const downBtn = document.createElement("button");
      downBtn.title = "Move tier down";
      downBtn.innerHTML = "↓";
      downBtn.onclick = e => { e.stopPropagation(); moveTier(t, 1); };
      downBtn.disabled = tierBreaks[t] >= tierBreaks[t+1] - 1;
      controls.appendChild(downBtn);
      // Remove (cannot remove if only 2 breaks remain)
      if (tierBreaks.length > 3) {
        const rmBtn = document.createElement("button");
        rmBtn.className = "remove-tier-btn";
        rmBtn.title = "Remove tier";
        rmBtn.innerHTML = "×";
        rmBtn.onclick = e => { e.stopPropagation(); removeTier(t); };
        controls.appendChild(rmBtn);
      }
      tierLine.appendChild(controls);
    }
    tdDivider.appendChild(tierLine);
    trDivider.appendChild(tdDivider);
    tableBody.appendChild(trDivider);

    // --- Add tier insert bar (in add-tier mode, edit only) ---
    if (editingTiers && addingTierMode && t < tierBreaks.length - 2) {
      const trAddBar = document.createElement("tr");
      trAddBar.className = "add-tier-bar-row";
      const tdAddBar = document.createElement("td");
      tdAddBar.className = "add-tier-bar";
      tdAddBar.colSpan = 6;
      const greyLine = document.createElement("div");
      greyLine.className = "add-tier-line";
      tdAddBar.appendChild(greyLine);
      const plus = document.createElement("span");
      plus.className = "add-tier-plus";
      plus.innerHTML = "+";
      tdAddBar.appendChild(plus);
      trAddBar.onmouseenter = () => {
        addTierIdx = t + 1;
        tdAddBar.style.background = "#f5f7fa";
        greyLine.style.background = "#1976d2";
        plus.style.background = "#1976d2";
        plus.style.color = "#fff";
        plus.style.borderColor = "#1976d2";
      };
      trAddBar.onmouseleave = () => {
        addTierIdx = null;
        tdAddBar.style.background = "";
        greyLine.style.background = "#bbb";
        plus.style.background = "#fff";
        plus.style.color = "#1976d2";
        plus.style.borderColor = "#1976d2";
      };
      tdAddBar.onclick = () => {
        insertTier(t + 1);
        addTierIdx = null;
      };
      trAddBar.appendChild(tdAddBar);
      tableBody.appendChild(trAddBar);
    }

    // ---- Player rows for this tier ----
    for (let i = tierBreaks[t]; i < tierBreaks[t+1]; i++) {
      const player = visiblePlayers[i];
      const tr = document.createElement("tr");
      tr.classList.add(player.position);

      if (player.drafted) tr.classList.add("strikethrough");
      if (player.draftedBy === teamNames[myTeamIndex]) tr.classList.add("highlight");
      if (player.pickNumber === currentPick && player.draftedBy !== teamNames[myTeamIndex]) tr.classList.add("recent-pick");

      // Checkbox cell
      const cbCell = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = player.drafted;
      cb.dataset.id = player.id;
      cb.addEventListener("change", () => { toggleDrafted(player.id); });
      cbCell.appendChild(cb);

      // Number cell (ranking, 1-based by visiblePlayers)
      const numCell = document.createElement("td");
      numCell.textContent = i + 1;

      // Edit controls (edit only, move up/down)
      const controlCell = document.createElement("td");
      if (editingTiers) {
        // up/down arrows
        const up = document.createElement("button");
        up.className = "player-tier-arrow";
        up.innerHTML = "▲";
        up.title = "Move player up";
        up.disabled = i === 0 || i === tierBreaks[t];
        up.onclick = e => { e.stopPropagation(); movePlayer(i, -1); };
        controlCell.appendChild(up);
        const down = document.createElement("button");
        down.className = "player-tier-arrow";
        down.innerHTML = "▼";
        down.title = "Move player down";
        down.disabled = i === visiblePlayers.length - 1 || i === tierBreaks[t+1] - 1;
        down.onclick = e => { e.stopPropagation(); movePlayer(i, 1); };
        controlCell.appendChild(down);
      }

      // Name cell
      const nameCell = document.createElement("td");
      nameCell.textContent = player.name;

      // Position, Drafted By
      const posCell = document.createElement("td");
      posCell.textContent = player.position;
      const draftedByCell = document.createElement("td");
      draftedByCell.textContent = player.draftedBy || "";

      tr.appendChild(cbCell);
      tr.appendChild(numCell);
      tr.appendChild(controlCell);
      tr.appendChild(nameCell);
      tr.appendChild(posCell);
      tr.appendChild(draftedByCell);

      tableBody.appendChild(tr);

      if (player.draftedBy === teamNames[myTeamIndex]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.tag})`;
        document.getElementById("my" + player.position).appendChild(li);
      }
    }
  }
}

// -------- Tier Move/Insert/Remove --------
function moveTier(idx, direction) {
  if (idx <= 0 || idx >= tierBreaks.length - 1) return; // Tier 1 stuck
  const newBreak = tierBreaks[idx] + direction;
  if (newBreak <= tierBreaks[idx - 1] + 1 || newBreak >= tierBreaks[idx + 1] - 1) return;
  tierBreaks[idx] = newBreak;
  saveAll();
  renderTable();
}
function insertTier(idx) {
  if (idx <= 0 || idx >= tierBreaks.length) return;
  const prev = tierBreaks[idx - 1];
  const next = tierBreaks[idx];
  if (next - prev < 2) return;
  const newBreak = prev + Math.ceil((next - prev) / 2);
  if (!tierBreaks.includes(newBreak)) {
    tierBreaks.push(newBreak);
    tierBreaks.sort((a, b) => a - b);
    saveAll();
    renderTable();
  }
}
function removeTier(idx) {
  if (idx <= 0 || idx >= tierBreaks.length - 1) return;
  tierBreaks.splice(idx, 1);
  saveAll();
  renderTable();
}
function movePlayer(i, dir) {
  const visiblePlayers = getVisiblePlayers();
  if (i + dir < 0 || i + dir >= visiblePlayers.length) return;
  const idx = players.findIndex(p => p.id === visiblePlayers[i].id);
  if (idx < 0 || idx + dir < 0 || idx + dir >= players.length) return;
  const temp = players[idx];
  players[idx] = players[idx + dir];
  players[idx + dir] = temp;
  saveAll();
  renderTable();
}

// --------- Edit Toggle -----------
document.getElementById('editTiersBtn').addEventListener('click', function() {
  editingTiers = !editingTiers;
  addingTierMode = false;
  this.textContent = editingTiers ? "Done Editing" : "Edit Tiers";
  renderTable();
});
document.getElementById('addTierModeBtn').addEventListener('click', function() {
  addingTierMode = !addingTierMode;
  renderTable();
});

// ------------- Fantasy Draft Board Core Functions -------------

function populateTeamCountOptions() {
  const options = [10, 8, 12, 14];
  teamCountSelect.innerHTML = "";
  options.forEach(num => {
    const option = document.createElement("option");
    option.value = num;
    option.textContent = num;
    teamCountSelect.appendChild(option);
  });
}

function generateTeamNameInputs() {
  const teamCount = parseInt(teamCountSelect.value, 10);
  teamNamesContainer.innerHTML = "";
  for (let i = 0; i < teamCount; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.id = `teamName${i}`;
    input.placeholder = `Team ${i + 1}`;
    input.value = teamNames[i] || "";
    input.addEventListener("input", () => {
      teamNames[i] = input.value.trim();
      syncYourTeamSelectOptions();
      saveAll();
      validateStartDraftButton();
    });
    teamNamesContainer.appendChild(input);
    teamNamesContainer.appendChild(document.createElement("br"));
  }
}

function syncYourTeamSelectOptions() {
  const prevValue = yourTeamSelect.value;
  yourTeamSelect.innerHTML = '<option value="" disabled selected>-- Select Team --</option>';
  teamNames = teamNames.map(name => name.trim());
  const teamCount = parseInt(teamCountSelect.value, 10);

  for (let i = 0; i < teamCount; i++) {
    const name = teamNames[i] || "";
    if (name) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = name;
      yourTeamSelect.appendChild(option);
    }
  }

  if (!yourTeamSelect.querySelector(`option[value="${prevValue}"]`)) {
    yourTeamSelect.value = "";
    myTeamIndex = -1;
    myPickSelect.innerHTML = "";
    myPickSelect.disabled = true;
  } else {
    yourTeamSelect.value = prevValue;
    if (prevValue !== "") {
      myTeamIndex = parseInt(prevValue, 10);
      myPickSelect.innerHTML = "";
      const option = document.createElement("option");
      option.value = myTeamIndex + 1;
      option.textContent = myTeamIndex + 1;
      myPickSelect.appendChild(option);
      myPickSelect.value = option.value;
      myPickSelect.disabled = true;
    }
  }
}

yourTeamSelect.addEventListener("change", () => {
  const val = yourTeamSelect.value;
  if (val === "") {
    myTeamIndex = -1;
    myPickSelect.innerHTML = "";
    myPickSelect.disabled = true;
  } else {
    myTeamIndex = parseInt(val, 10);
    myPickSelect.innerHTML = "";
    const option = document.createElement("option");
    option.value = myTeamIndex + 1;
    option.textContent = myTeamIndex + 1;
    myPickSelect.appendChild(option);
    myPickSelect.value = option.value;
    myPickSelect.disabled = true;
  }
  saveAll();
  renderTable();
  validateStartDraftButton();
});

teamCountSelect.addEventListener("change", () => {
  saveAll();
  generateTeamNameInputs();
  syncYourTeamSelectOptions();
  validateStartDraftButton();
});

function validateStartDraftButton() {
  let valid = true;
  startDraftBtn.classList.remove("error");
  yourTeamSelect.classList.remove("error");

  const teamCount = parseInt(teamCountSelect.value, 10);
  let teamsValid = true;
  for (let i = 0; i < teamCount; i++) {
    const input = document.getElementById(`teamName${i}`);
    if (!input || input.value.trim() === "") {
      input?.classList.add("error");
      teamsValid = false;
      valid = false;
    } else {
      input.classList.remove("error");
    }
  }
  if (!teamsValid) valid = false;

  if (yourTeamSelect.value === "" || yourTeamSelect.value === null) {
    yourTeamSelect.classList.add("error");
    valid = false;
  } else {
    yourTeamSelect.classList.remove("error");
  }
  if (players.length === 0) {
    valid = false;
  }
  startDraftBtn.disabled = !valid;
}

function setupDraft() {
  validateStartDraftButton();
  if (startDraftBtn.disabled) {
    alert("Please fix the highlighted errors before starting the draft.");
    return;
  }
  const namesSet = new Set();
  for (const name of teamNames) {
    if (!name) {
      alert("All teams must have a name.");
      return;
    }
    if (namesSet.has(name.toLowerCase())) {
      alert("Team names must be unique.");
      return;
    }
    namesSet.add(name.toLowerCase());
  }
  const teamCount = parseInt(teamCountSelect.value, 10);
  draftOrder = [];
  let forward = true;
  for (let round = 0; round < 20; round++) {
    const roundOrder = Array.from({ length: teamCount }, (_, i) => i);
    draftOrder.push(...(forward ? roundOrder : roundOrder.reverse()));
    forward = !forward;
  }
  if (currentPick >= draftOrder.length) currentPick = 0;
  updateCurrentPickDisplay();
  saveAll();
  renderTable();
}

function updateCurrentPickDisplay() {
  if (currentPick >= draftOrder.length) {
    currentPickDisplay.textContent = "Draft Complete!";
    startDraftBtn.disabled = true;
    return;
  }
  const teamIndex = draftOrder[currentPick];
  const teamName = teamNames[teamIndex] || "";
  currentPickDisplay.textContent = `Pick ${currentPick + 1} - ${teamName}`;
}

function toggleDrafted(id) {
  const player = players.find(p => p.id === id);
  if (!player) return;
  if (!player.drafted) {
    if (currentPick >= draftOrder.length) {
      alert("All picks completed!");
      return;
    }
    player.drafted = true;
    const teamIndex = draftOrder[currentPick];
    player.draftedBy = teamNames[teamIndex];
    player.pickNumber = currentPick + 1;
    currentPick++;
  } else {
    if (player.pickNumber === currentPick) {
      player.drafted = false;
      player.draftedBy = null;
      player.pickNumber = null;
      currentPick--;
    } else if (player.pickNumber < currentPick) {
      alert("You can only undo the most recent pick.");
      return;
    }
  }
  updateCurrentPickDisplay();
  saveAll();
  renderTable();
}

function saveAll() {
  localStorage.setItem("players", JSON.stringify(players));
  localStorage.setItem("teamNames", JSON.stringify(teamNames));
  localStorage.setItem("draftOrder", JSON.stringify(draftOrder));
  localStorage.setItem("currentPick", currentPick);
  localStorage.setItem("myTeamIndex", myTeamIndex);
  localStorage.setItem("teamCount", teamCountSelect.value);
  localStorage.setItem("yourTeamSelect", yourTeamSelect.value);
  localStorage.setItem("tierBreaks", JSON.stringify(tierBreaks));
}

function loadAll() {
  const storedPlayers = localStorage.getItem("players");
  if (storedPlayers) players = JSON.parse(storedPlayers);

  const storedTeamNames = localStorage.getItem("teamNames");
  if (storedTeamNames) teamNames = JSON.parse(storedTeamNames);

  const storedDraftOrder = localStorage.getItem("draftOrder");
  if (storedDraftOrder) draftOrder = JSON.parse(storedDraftOrder);

  const storedCurrentPick = localStorage.getItem("currentPick");
  if (storedCurrentPick) currentPick = parseInt(storedCurrentPick, 10);

  const storedMyTeamIndex = localStorage.getItem("myTeamIndex");
  if (storedMyTeamIndex) myTeamIndex = parseInt(storedMyTeamIndex, 10);

  const storedTeamCount = localStorage.getItem("teamCount");
  if (storedTeamCount) teamCountSelect.value = storedTeamCount;
  else teamCountSelect.value = "10";

  const storedTierBreaks = localStorage.getItem("tierBreaks");
  if (storedTierBreaks) tierBreaks = JSON.parse(storedTierBreaks);

  generateTeamNameInputs();

  for (let i = 0; i < teamNames.length; i++) {
    const input = document.getElementById(`teamName${i}`);
    if (input) input.value = teamNames[i] || "";
  }

  syncYourTeamSelectOptions();

  if (myTeamIndex >= 0 && yourTeamSelect.querySelector(`option[value="${myTeamIndex}"]`)) {
    yourTeamSelect.value = myTeamIndex;
    myPickSelect.innerHTML = "";
    const option = document.createElement("option");
    option.value = myTeamIndex + 1;
    option.textContent = myTeamIndex + 1;
    myPickSelect.appendChild(option);
    myPickSelect.value = option.value;
    myPickSelect.disabled = true;
    startDraftBtn.disabled = false;
  } else {
    yourTeamSelect.value = "";
    myTeamIndex = -1;
    myPickSelect.innerHTML = "";
    myPickSelect.disabled = true;
    startDraftBtn.disabled = true;
  }
}

function filterByPosition(pos) {
  currentFilter = pos;
  renderTable();
}

function resetAll() {
  if (!confirm("Are you sure you want to reset everything?")) return;
  players = players.map(p => ({
    ...p,
    drafted: false,
    draftedBy: null,
    pickNumber: null,
  }));
  currentPick = 0;
  draftOrder = [];
  teamNames = [];
  myTeamIndex = -1;
  teamCountSelect.value = "10";
  yourTeamSelect.value = "";
  myPickSelect.innerHTML = "";
  myPickSelect.disabled = true;
  startDraftBtn.disabled = true;
  localStorage.clear();
  generateTeamNameInputs();
  renderTable();
  updateCurrentPickDisplay();
}

// --------- INIT -----------
populateTeamCountOptions();
generateTeamNameInputs();
loadAll();
renderTable();
updateCurrentPickDisplay();
validateStartDraftButton();

searchInput.addEventListener("input", renderTable);

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type === "DRAFTED_PLAYERS") {
    const picks = event.data.payload;
    picks.forEach(pickedName => {
      const rows = document.querySelectorAll("#playerTable tbody tr");
      for (const row of rows) {
        const nameCell = row.cells[3];
        if (nameCell && nameCell.textContent.trim().toLowerCase().includes(pickedName.toLowerCase())) {
          const checkbox = row.querySelector("input[type='checkbox']");
          if (checkbox && !checkbox.checked) {
            checkbox.click();
          }
          break;
        }
      }
    });
  }
});
