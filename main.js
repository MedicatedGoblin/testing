// --------- Fantasy Draft Board Tier & Player Logic ---------

// ---- STATIC PLAYER LIST (edit as needed) ----
let players = [
    { id: 1, name: "Ja'Marr Chase", tag: "1", position: "WR1", drafted: false, draftedBy: null, pickNumber: null },
  { id: 2, name: "Bijan Robinson", tag: "2", position: "RB1", drafted: false, draftedBy: null, pickNumber: null },
  { id: 3, name: "Saquon Barkley", tag: "3", position: "RB2", drafted: false, draftedBy: null, pickNumber: null },
  { id: 4, name: "Justin Jefferson", tag: "4", position: "WR2", drafted: false, draftedBy: null, pickNumber: null },
  { id: 5, name: "Jahmyr Gibbs", tag: "5", position: "RB3", drafted: false, draftedBy: null, pickNumber: null },
  { id: 6, name: "CeeDee Lamb", tag: "6", position: "WR3", drafted: false, draftedBy: null, pickNumber: null },
  { id: 7, name: "Puka Nacua", tag: "7", position: "WR4", drafted: false, draftedBy: null, pickNumber: null },
  { id: 8, name: "Malik Nabers", tag: "8", position: "WR5", drafted: false, draftedBy: null, pickNumber: null },
  { id: 9, name: "Amon-Ra St. Brown", tag: "9", position: "WR6", drafted: false, draftedBy: null, pickNumber: null },
  { id: 10, name: "Nico Collins", tag: "10", position: "WR7", drafted: false, draftedBy: null, pickNumber: null },
  { id: 11, name: "Ashton Jeanty", tag: "11", position: "RB4", drafted: false, draftedBy: null, pickNumber: null },
  { id: 12, name: "Brian Thomas Jr.", tag: "12", position: "WR8", drafted: false, draftedBy: null, pickNumber: null },
  { id: 13, name: "Derrick Henry", tag: "13", position: "RB5", drafted: false, draftedBy: null, pickNumber: null },
  { id: 14, name: "De'Von Achane", tag: "14", position: "RB6", drafted: false, draftedBy: null, pickNumber: null },
  { id: 15, name: "Christian McCaffrey", tag: "15", position: "RB7", drafted: false, draftedBy: null, pickNumber: null },
  { id: 16, name: "Drake London", tag: "16", position: "WR9", drafted: false, draftedBy: null, pickNumber: null },
  { id: 17, name: "Brock Bowers", tag: "17", position: "TE1", drafted: false, draftedBy: null, pickNumber: null },
  { id: 18, name: "A.J. Brown", tag: "18", position: "WR10", drafted: false, draftedBy: null, pickNumber: null },
  { id: 19, name: "Josh Jacobs", tag: "19", position: "RB8", drafted: false, draftedBy: null, pickNumber: null },
  { id: 20, name: "Jonathan Taylor", tag: "20", position: "RB9", drafted: false, draftedBy: null, pickNumber: null },
  { id: 21, name: "Bucky Irving", tag: "21", position: "RB10", drafted: false, draftedBy: null, pickNumber: null },
  { id: 22, name: "Ladd McConkey", tag: "22", position: "WR11", drafted: false, draftedBy: null, pickNumber: null },
  { id: 23, name: "Trey McBride", tag: "23", position: "TE2", drafted: false, draftedBy: null, pickNumber: null },
  { id: 24, name: "Kyren Williams", tag: "24", position: "RB11", drafted: false, draftedBy: null, pickNumber: null },
  { id: 25, name: "Josh Allen", tag: "25", position: "QB1", drafted: false, draftedBy: null, pickNumber: null },
  { id: 26, name: "Lamar Jackson", tag: "26", position: "QB2", drafted: false, draftedBy: null, pickNumber: null },
  { id: 27, name: "Chase Brown", tag: "27", position: "RB12", drafted: false, draftedBy: null, pickNumber: null },
  { id: 28, name: "Tee Higgins", tag: "28", position: "WR12", drafted: false, draftedBy: null, pickNumber: null },
  { id: 29, name: "Jaxon Smith-Njigba", tag: "29", position: "WR13", drafted: false, draftedBy: null, pickNumber: null },
  { id: 30, name: "Tyreek Hill", tag: "30", position: "WR14", drafted: false, draftedBy: null, pickNumber: null },
  { id: 31, name: "Jayden Daniels", tag: "31", position: "QB3", drafted: false, draftedBy: null, pickNumber: null },
  { id: 32, name: "Garrett Wilson", tag: "32", position: "WR15", drafted: false, draftedBy: null, pickNumber: null },
  { id: 33, name: "Rashee Rice", tag: "33", position: "WR16", drafted: false, draftedBy: null, pickNumber: null },
  { id: 34, name: "Breece Hall", tag: "34", position: "RB13", drafted: false, draftedBy: null, pickNumber: null },
  { id: 35, name: "George Kittle", tag: "35", position: "TE3", drafted: false, draftedBy: null, pickNumber: null },
  { id: 36, name: "Davante Adams", tag: "36", position: "WR17", drafted: false, draftedBy: null, pickNumber: null },
  { id: 37, name: "Mike Evans", tag: "37", position: "WR18", drafted: false, draftedBy: null, pickNumber: null },
  { id: 38, name: "James Cook", tag: "38", position: "RB14", drafted: false, draftedBy: null, pickNumber: null },
  { id: 39, name: "Terry McLaurin", tag: "39", position: "WR19", drafted: false, draftedBy: null, pickNumber: null },
  { id: 40, name: "Jalen Hurts", tag: "40", position: "QB4", drafted: false, draftedBy: null, pickNumber: null },
  { id: 41, name: "Kenneth Walker III", tag: "41", position: "RB15", drafted: false, draftedBy: null, pickNumber: null },
  { id: 42, name: "Alvin Kamara", tag: "42", position: "RB16", drafted: false, draftedBy: null, pickNumber: null },
  { id: 43, name: "Marvin Harrison Jr.", tag: "43", position: "WR20", drafted: false, draftedBy: null, pickNumber: null },
  { id: 44, name: "DJ Moore", tag: "44", position: "WR21", drafted: false, draftedBy: null, pickNumber: null },
  { id: 45, name: "Chuba Hubbard", tag: "45", position: "RB17", drafted: false, draftedBy: null, pickNumber: null },
  { id: 46, name: "Joe Burrow", tag: "46", position: "QB5", drafted: false, draftedBy: null, pickNumber: null },
  { id: 47, name: "James Conner", tag: "47", position: "RB18", drafted: false, draftedBy: null, pickNumber: null },
  { id: 48, name: "DK Metcalf", tag: "48", position: "WR22", drafted: false, draftedBy: null, pickNumber: null },
  { id: 49, name: "Joe Mixon", tag: "49", position: "RB19", drafted: false, draftedBy: null, pickNumber: null },
  { id: 50, name: "Courtland Sutton", tag: "50", position: "WR23", drafted: false, draftedBy: null, pickNumber: null },
  { id: 51, name: "DeVonta Smith", tag: "51", position: "WR24", drafted: false, draftedBy: null, pickNumber: null },
  { id: 52, name: "Zay Flowers", tag: "52", position: "WR25", drafted: false, draftedBy: null, pickNumber: null },
  { id: 53, name: "Omarion Hampton", tag: "53", position: "RB20", drafted: false, draftedBy: null, pickNumber: null },
  { id: 54, name: "Jameson Williams", tag: "54", position: "WR26", drafted: false, draftedBy: null, pickNumber: null },
  { id: 55, name: "David Montgomery", tag: "55", position: "RB21", drafted: false, draftedBy: null, pickNumber: null },
  { id: 56, name: "Sam LaPorta", tag: "56", position: "TE4", drafted: false, draftedBy: null, pickNumber: null },
  { id: 57, name: "D'Andre Swift", tag: "57", position: "RB22", drafted: false, draftedBy: null, pickNumber: null },
  { id: 58, name: "RJ Harvey", tag: "58", position: "RB23", drafted: false, draftedBy: null, pickNumber: null },
  { id: 59, name: "Patrick Mahomes II", tag: "59", position: "QB6", drafted: false, draftedBy: null, pickNumber: null },
  { id: 60, name: "Xavier Worthy", tag: "60", position: "WR27", drafted: false, draftedBy: null, pickNumber: null },
  { id: 61, name: "Aaron Jones Sr.", tag: "61", position: "RB24", drafted: false, draftedBy: null, pickNumber: null },
  { id: 62, name: "Jaylen Waddle", tag: "62", position: "WR28", drafted: false, draftedBy: null, pickNumber: null },
  { id: 63, name: "TreVeyon Henderson", tag: "63", position: "RB25", drafted: false, draftedBy: null, pickNumber: null },
  { id: 64, name: "Tetairoa McMillan", tag: "64", position: "WR29", drafted: false, draftedBy: null, pickNumber: null },
  { id: 65, name: "Baker Mayfield", tag: "65", position: "QB7", drafted: false, draftedBy: null, pickNumber: null },
  { id: 66, name: "Chris Olave", tag: "66", position: "WR30", drafted: false, draftedBy: null, pickNumber: null },
  { id: 67, name: "Quinshon Judkins", tag: "67", position: "RB26", drafted: false, draftedBy: null, pickNumber: null },
  { id: 68, name: "Tony Pollard", tag: "68", position: "RB27", drafted: false, draftedBy: null, pickNumber: null },
  { id: 69, name: "Travis Hunter", tag: "69", position: "WR31", drafted: false, draftedBy: null, pickNumber: null },
  { id: 70, name: "Chris Godwin", tag: "70", position: "WR32", drafted: false, draftedBy: null, pickNumber: null },
  { id: 71, name: "Calvin Ridley", tag: "71", position: "WR33", drafted: false, draftedBy: null, pickNumber: null },
  { id: 72, name: "Isiah Pacheco", tag: "72", position: "RB28", drafted: false, draftedBy: null, pickNumber: null },
  { id: 73, name: "Kaleb Johnson", tag: "73", position: "RB29", drafted: false, draftedBy: null, pickNumber: null },
  { id: 74, name: "T.J. Hockenson", tag: "74", position: "TE5", drafted: false, draftedBy: null, pickNumber: null },
  { id: 75, name: "George Pickens", tag: "75", position: "WR34", drafted: false, draftedBy: null, pickNumber: null },
  { id: 76, name: "Jordan Addison", tag: "76", position: "WR35", drafted: false, draftedBy: null, pickNumber: null },
  { id: 77, name: "Brian Robinson Jr.", tag: "77", position: "RB30", drafted: false, draftedBy: null, pickNumber: null },
  { id: 78, name: "Bo Nix", tag: "78", position: "QB8", drafted: false, draftedBy: null, pickNumber: null },
  { id: 79, name: "Jerry Jeudy", tag: "79", position: "WR36", drafted: false, draftedBy: null, pickNumber: null },
  { id: 80, name: "Kyler Murray", tag: "80", position: "QB9", drafted: false, draftedBy: null, pickNumber: null },
  { id: 81, name: "Rome Odunze", tag: "81", position: "WR37", drafted: false, draftedBy: null, pickNumber: null },
  { id: 82, name: "Travis Kelce", tag: "82", position: "TE6", drafted: false, draftedBy: null, pickNumber: null },
  { id: 83, name: "Mark Andrews", tag: "83", position: "TE7", drafted: false, draftedBy: null, pickNumber: null },
  { id: 84, name: "Jauan Jennings", tag: "84", position: "WR38", drafted: false, draftedBy: null, pickNumber: null },
  { id: 85, name: "David Njoku", tag: "85", position: "TE8", drafted: false, draftedBy: null, pickNumber: null },
  { id: 86, name: "Evan Engram", tag: "86", position: "TE9", drafted: false, draftedBy: null, pickNumber: null },
  { id: 87, name: "Jaylen Warren", tag: "87", position: "RB31", drafted: false, draftedBy: null, pickNumber: null },
  { id: 88, name: "Khalil Shakir", tag: "88", position: "WR39", drafted: false, draftedBy: null, pickNumber: null },
  { id: 89, name: "Jakobi Meyers", tag: "89", position: "WR40", drafted: false, draftedBy: null, pickNumber: null },
  { id: 90, name: "Justin Fields", tag: "90", position: "QB10", drafted: false, draftedBy: null, pickNumber: null },
  { id: 91, name: "Tyrone Tracy Jr.", tag: "91", position: "RB32", drafted: false, draftedBy: null, pickNumber: null },
  { id: 92, name: "Brock Purdy", tag: "92", position: "QB11", drafted: false, draftedBy: null, pickNumber: null },
  { id: 93, name: "Najee Harris", tag: "93", position: "RB33", drafted: false, draftedBy: null, pickNumber: null },
  { id: 94, name: "Caleb Williams", tag: "94", position: "QB12", drafted: false, draftedBy: null, pickNumber: null },
  { id: 95, name: "Travis Etienne Jr.", tag: "95", position: "RB34", drafted: false, draftedBy: null, pickNumber: null },
  { id: 96, name: "Justin Herbert", tag: "96", position: "QB13", drafted: false, draftedBy: null, pickNumber: null },
  { id: 97, name: "Deebo Samuel Sr.", tag: "97", position: "WR41", drafted: false, draftedBy: null, pickNumber: null },
  { id: 98, name: "Jayden Reed", tag: "98", position: "WR42", drafted: false, draftedBy: null, pickNumber: null },
  { id: 99, name: "Dak Prescott", tag: "99", position: "QB14", drafted: false, draftedBy: null, pickNumber: null },
  { id: 100, name: "Jared Goff", tag: "100", position: "QB15", drafted: false, draftedBy: null, pickNumber: null },
  { id: 101, name: "Tucker Kraft", tag: "101", position: "TE10", drafted: false, draftedBy: null, pickNumber: null },
  { id: 102, name: "Stefon Diggs", tag: "102", position: "WR43", drafted: false, draftedBy: null, pickNumber: null },
  { id: 103, name: "Javonte Williams", tag: "103", position: "RB35", drafted: false, draftedBy: null, pickNumber: null },
  { id: 104, name: "Josh Downs", tag: "104", position: "WR44", drafted: false, draftedBy: null, pickNumber: null },
  { id: 105, name: "Rhamondre Stevenson", tag: "105", position: "RB36", drafted: false, draftedBy: null, pickNumber: null },
  { id: 106, name: "Zach Charbonnet", tag: "106", position: "RB37", drafted: false, draftedBy: null, pickNumber: null },
  { id: 107, name: "Ricky Pearsall", tag: "107", position: "WR45", drafted: false, draftedBy: null, pickNumber: null },
  { id: 108, name: "Drake Maye", tag: "108", position: "QB16", drafted: false, draftedBy: null, pickNumber: null },
  { id: 109, name: "Jordan Love", tag: "109", position: "QB17", drafted: false, draftedBy: null, pickNumber: null },
  { id: 110, name: "Jordan Mason", tag: "110", position: "RB38", drafted: false, draftedBy: null, pickNumber: null },
  { id: 111, name: "Michael Pittman Jr.", tag: "111", position: "WR46", drafted: false, draftedBy: null, pickNumber: null },
  { id: 112, name: "Cooper Kupp", tag: "112", position: "WR47", drafted: false, draftedBy: null, pickNumber: null },
  { id: 113, name: "Brandon Aiyuk", tag: "113", position: "WR48", drafted: false, draftedBy: null, pickNumber: null },
  { id: 114, name: "Cam Skattebo", tag: "114", position: "RB39", drafted: false, draftedBy: null, pickNumber: null },
  { id: 115, name: "Trevor Lawrence", tag: "115", position: "QB18", drafted: false, draftedBy: null, pickNumber: null },
  { id: 116, name: "C.J. Stroud", tag: "116", position: "QB19", drafted: false, draftedBy: null, pickNumber: null },
  { id: 117, name: "Tyjae Spears", tag: "117", position: "RB40", drafted: false, draftedBy: null, pickNumber: null },
  { id: 118, name: "Dalton Kincaid", tag: "118", position: "TE11", drafted: false, draftedBy: null, pickNumber: null },
  { id: 119, name: "Darnell Mooney", tag: "119", position: "WR49", drafted: false, draftedBy: null, pickNumber: null },
  { id: 120, name: "Rachaad White", tag: "120", position: "RB41", drafted: false, draftedBy: null, pickNumber: null },
  { id: 121, name: "Jake Ferguson", tag: "121", position: "TE12", drafted: false, draftedBy: null, pickNumber: null },
  { id: 122, name: "Tank Bigsby", tag: "122", position: "RB42", drafted: false, draftedBy: null, pickNumber: null },
  { id: 123, name: "Tyler Warren", tag: "123", position: "TE13", drafted: false, draftedBy: null, pickNumber: null },
  { id: 124, name: "Dallas Goedert", tag: "124", position: "TE14", drafted: false, draftedBy: null, pickNumber: null },
  { id: 125, name: "Jonnu Smith", tag: "125", position: "TE15", drafted: false, draftedBy: null, pickNumber: null },
  { id: 126, name: "J.J. McCarthy", tag: "126", position: "QB20", drafted: false, draftedBy: null, pickNumber: null },
  { id: 127, name: "Keon Coleman", tag: "127", position: "WR50", drafted: false, draftedBy: null, pickNumber: null },
  { id: 128, name: "Ray Davis", tag: "128", position: "RB43", drafted: false, draftedBy: null, pickNumber: null },
  { id: 129, name: "Rashid Shaheed", tag: "129", position: "WR51", drafted: false, draftedBy: null, pickNumber: null },
  { id: 130, name: "Matthew Stafford", tag: "130", position: "QB21", drafted: false, draftedBy: null, pickNumber: null },
  { id: 131, name: "Matthew Golden", tag: "131", position: "WR52", drafted: false, draftedBy: null, pickNumber: null },
  { id: 132, name: "Tua Tagovailoa", tag: "132", position: "QB22", drafted: false, draftedBy: null, pickNumber: null },
  { id: 133, name: "Austin Ekeler", tag: "133", position: "RB44", drafted: false, draftedBy: null, pickNumber: null },
  { id: 134, name: "Christian Kirk", tag: "134", position: "WR53", drafted: false, draftedBy: null, pickNumber: null },
  { id: 135, name: "Trey Benson", tag: "135", position: "RB45", drafted: false, draftedBy: null, pickNumber: null },
  { id: 136, name: "Emeka Egbuka", tag: "136", position: "WR54", drafted: false, draftedBy: null, pickNumber: null },
  { id: 137, name: "Rico Dowdle", tag: "137", position: "RB46", drafted: false, draftedBy: null, pickNumber: null },
  { id: 138, name: "Tyler Allgeier", tag: "138", position: "RB47", drafted: false, draftedBy: null, pickNumber: null },
  { id: 139, name: "Colston Loveland", tag: "139", position: "TE16", drafted: false, draftedBy: null, pickNumber: null },
  { id: 140, name: "Rashod Bateman", tag: "140", position: "WR55", drafted: false, draftedBy: null, pickNumber: null },
  { id: 141, name: "Luther Burden III", tag: "141", position: "WR56", drafted: false, draftedBy: null, pickNumber: null },
  { id: 142, name: "J.K. Dobbins", tag: "142", position: "RB48", drafted: false, draftedBy: null, pickNumber: null },
  { id: 143, name: "Isaac Guerendo", tag: "143", position: "RB49", drafted: false, draftedBy: null, pickNumber: null },
  { id: 144, name: "Hunter Henry", tag: "144", position: "TE17", drafted: false, draftedBy: null, pickNumber: null },
  { id: 145, name: "Bryce Young", tag: "145", position: "QB23", drafted: false, draftedBy: null, pickNumber: null },
  { id: 146, name: "Marvin Mims Jr.", tag: "146", position: "WR57", drafted: false, draftedBy: null, pickNumber: null },
  { id: 147, name: "Bhayshul Tuten", tag: "147", position: "RB50", drafted: false, draftedBy: null, pickNumber: null },
  { id: 148, name: "Cedric Tillman", tag: "148", position: "WR58", drafted: false, draftedBy: null, pickNumber: null },
  { id: 149, name: "Jaylen Wright", tag: "149", position: "RB51", drafted: false, draftedBy: null, pickNumber: null },
  { id: 150, name: "Kyle Pitts", tag: "150", position: "TE18", drafted: false, draftedBy: null, pickNumber: null },
  { id: 151, name: "Michael Penix Jr.", tag: "151", position: "QB24", drafted: false, draftedBy: null, pickNumber: null },
  { id: 152, name: "Marquise Brown", tag: "152", position: "WR59", drafted: false, draftedBy: null, pickNumber: null },
  { id: 153, name: "Jaydon Blue", tag: "153", position: "RB52", drafted: false, draftedBy: null, pickNumber: null },
  { id: 154, name: "Zach Ertz", tag: "154", position: "TE19", drafted: false, draftedBy: null, pickNumber: null },
  { id: 155, name: "Braelon Allen", tag: "155", position: "RB53", drafted: false, draftedBy: null, pickNumber: null },
  { id: 156, name: "Romeo Doubs", tag: "156", position: "WR60", drafted: false, draftedBy: null, pickNumber: null },
  { id: 157, name: "Tre Harris", tag: "157", position: "WR61", drafted: false, draftedBy: null, pickNumber: null },
  { id: 158, name: "Geno Smith", tag: "158", position: "QB25", drafted: false, draftedBy: null, pickNumber: null },
  { id: 159, name: "Isaiah Likely", tag: "159", position: "TE20", drafted: false, draftedBy: null, pickNumber: null },
  { id: 160, name: "Adam Thielen", tag: "160", position: "WR62", drafted: false, draftedBy: null, pickNumber: null },
  { id: 161, name: "Roschon Johnson", tag: "161", position: "RB54", drafted: false, draftedBy: null, pickNumber: null },
  { id: 162, name: "Jalen McMillan", tag: "162", position: "WR63", drafted: false, draftedBy: null, pickNumber: null },
  { id: 163, name: "Quentin Johnston", tag: "163", position: "WR64", drafted: false, draftedBy: null, pickNumber: null },
  { id: 164, name: "Kyle Williams", tag: "164", position: "WR65", drafted: false, draftedBy: null, pickNumber: null },
  { id: 165, name: "MarShawn Lloyd", tag: "165", position: "RB55", drafted: false, draftedBy: null, pickNumber: null },
  { id: 166, name: "Blake Corum", tag: "166", position: "RB56", drafted: false, draftedBy: null, pickNumber: null },
  { id: 167, name: "Wan'Dale Robinson", tag: "167", position: "WR66", drafted: false, draftedBy: null, pickNumber: null },
  { id: 168, name: "Jerome Ford", tag: "168", position: "RB57", drafted: false, draftedBy: null, pickNumber: null },
  { id: 169, name: "Denver Broncos", tag: "169", position: "DST1", drafted: false, draftedBy: null, pickNumber: null },
  { id: 170, name: "Jayden Higgins", tag: "170", position: "WR67", drafted: false, draftedBy: null, pickNumber: null },
  { id: 171, name: "Xavier Legette", tag: "171", position: "WR68", drafted: false, draftedBy: null, pickNumber: null },
  { id: 172, name: "Philadelphia Eagles", tag: "172", position: "DST2", drafted: false, draftedBy: null, pickNumber: null },
  { id: 173, name: "Nick Chubb", tag: "173", position: "RB58", drafted: false, draftedBy: null, pickNumber: null },
  { id: 174, name: "Sam Darnold", tag: "174", position: "QB26", drafted: false, draftedBy: null, pickNumber: null },
  { id: 175, name: "Pat Freiermuth", tag: "175", position: "TE21", drafted: false, draftedBy: null, pickNumber: null },
  { id: 176, name: "Mike Gesicki", tag: "176", position: "TE22", drafted: false, draftedBy: null, pickNumber: null },
  { id: 177, name: "Cameron Ward", tag: "177", position: "QB27", drafted: false, draftedBy: null, pickNumber: null },
  { id: 178, name: "Joshua Palmer", tag: "178", position: "WR69", drafted: false, draftedBy: null, pickNumber: null },
  { id: 179, name: "DeAndre Hopkins", tag: "179", position: "WR70", drafted: false, draftedBy: null, pickNumber: null },
  { id: 180, name: "Brenton Strange", tag: "180", position: "TE23", drafted: false, draftedBy: null, pickNumber: null },
  { id: 181, name: "Baltimore Ravens", tag: "181", position: "DST3", drafted: false, draftedBy: null, pickNumber: null },
  { id: 182, name: "Minnesota Vikings", tag: "182", position: "DST4", drafted: false, draftedBy: null, pickNumber: null },
  { id: 183, name: "DeMario Douglas", tag: "183", position: "WR71", drafted: false, draftedBy: null, pickNumber: null },
  { id: 184, name: "Cade Otton", tag: "184", position: "TE24", drafted: false, draftedBy: null, pickNumber: null },
  { id: 185, name: "Pittsburgh Steelers", tag: "185", position: "DST5", drafted: false, draftedBy: null, pickNumber: null },
  { id: 186, name: "Jack Bech", tag: "186", position: "WR72", drafted: false, draftedBy: null, pickNumber: null },
  { id: 187, name: "Dylan Sampson", tag: "187", position: "RB59", drafted: false, draftedBy: null, pickNumber: null },
  { id: 188, name: "Alec Pierce", tag: "188", position: "WR73", drafted: false, draftedBy: null, pickNumber: null },
  { id: 189, name: "Kansas City Chiefs", tag: "189", position: "DST6", drafted: false, draftedBy: null, pickNumber: null },
  { id: 190, name: "Houston Texans", tag: "190", position: "DST7", drafted: false, draftedBy: null, pickNumber: null },
  { id: 191, name: "Buffalo Bills", tag: "191", position: "DST8", drafted: false, draftedBy: null, pickNumber: null },
  { id: 192, name: "Jalen Coker", tag: "192", position: "WR74", drafted: false, draftedBy: null, pickNumber: null },
  { id: 193, name: "Brandon Aubrey", tag: "193", position: "K1", drafted: false, draftedBy: null, pickNumber: null },
  { id: 194, name: "Kareem Hunt", tag: "194", position: "RB60", drafted: false, draftedBy: null, pickNumber: null },
  { id: 195, name: "Jake Bates", tag: "195", position: "K2", drafted: false, draftedBy: null, pickNumber: null },
  { id: 196, name: "Chig Okonkwo", tag: "196", position: "TE25", drafted: false, draftedBy: null, pickNumber: null },
  { id: 197, name: "Aaron Rodgers", tag: "197", position: "QB28", drafted: false, draftedBy: null, pickNumber: null },
  { id: 198, name: "DJ Giddens", tag: "198", position: "RB61", drafted: false, draftedBy: null, pickNumber: null },
  { id: 199, name: "Michael Wilson", tag: "199", position: "WR75", drafted: false, draftedBy: null, pickNumber: null },
  { id: 200, name: "Justice Hill", tag: "200", position: "RB62", drafted: false, draftedBy: null, pickNumber: null },
  { id: 201, name: "Cameron Dicker", tag: "201", position: "K3", drafted: false, draftedBy: null, pickNumber: null },
  { id: 202, name: "Mason Taylor", tag: "202", position: "TE26", drafted: false, draftedBy: null, pickNumber: null },
  { id: 203, name: "Dontayvion Wicks", tag: "203", position: "WR76", drafted: false, draftedBy: null, pickNumber: null },
  { id: 204, name: "Detroit Lions", tag: "204", position: "DST9", drafted: false, draftedBy: null, pickNumber: null },
  { id: 205, name: "Wil Lutz", tag: "205", position: "K4", drafted: false, draftedBy: null, pickNumber: null },
  { id: 206, name: "Dalton Schultz", tag: "206", position: "TE27", drafted: false, draftedBy: null, pickNumber: null },
  { id: 207, name: "Los Angeles Chargers", tag: "207", position: "DST10", drafted: false, draftedBy: null, pickNumber: null },
  { id: 208, name: "Kendre Miller", tag: "208", position: "RB63", drafted: false, draftedBy: null, pickNumber: null },
  { id: 209, name: "Chris Boswell", tag: "209", position: "K5", drafted: false, draftedBy: null, pickNumber: null },
  { id: 210, name: "Green Bay Packers", tag: "210", position: "DST11", drafted: false, draftedBy: null, pickNumber: null },
  { id: 211, name: "Los Angeles Rams", tag: "211", position: "DST12", drafted: false, draftedBy: null, pickNumber: null },
  { id: 212, name: "Seattle Seahawks", tag: "212", position: "DST13", drafted: false, draftedBy: null, pickNumber: null },
  { id: 213, name: "Chase McLaughlin", tag: "213", position: "K6", drafted: false, draftedBy: null, pickNumber: null },
  { id: 214, name: "Adonai Mitchell", tag: "214", position: "WR77", drafted: false, draftedBy: null, pickNumber: null },
  { id: 215, name: "Darius Slayton", tag: "215", position: "WR78", drafted: false, draftedBy: null, pickNumber: null },
  { id: 216, name: "Ka'imi Fairbairn", tag: "216", position: "K7", drafted: false, draftedBy: null, pickNumber: null },
  { id: 217, name: "New York Jets", tag: "217", position: "DST14", drafted: false, draftedBy: null, pickNumber: null },
  { id: 218, name: "Devin Neal", tag: "218", position: "RB64", drafted: false, draftedBy: null, pickNumber: null },
  { id: 219, name: "Andrei Iosivas", tag: "219", position: "WR79", drafted: false, draftedBy: null, pickNumber: null },
  { id: 220, name: "Jaleel McLaughlin", tag: "220", position: "RB65", drafted: false, draftedBy: null, pickNumber: null },
  { id: 221, name: "Harrison Butker", tag: "221", position: "K8", drafted: false, draftedBy: null, pickNumber: null },
  { id: 222, name: "Jaylin Noel", tag: "222", position: "WR80", drafted: false, draftedBy: null, pickNumber: null },
  { id: 223, name: "Evan McPherson", tag: "223", position: "K9", drafted: false, draftedBy: null, pickNumber: null },
  { id: 224, name: "Ja'Tavion Sanders", tag: "224", position: "TE28", drafted: false, draftedBy: null, pickNumber: null },
  { id: 225, name: "Miles Sanders", tag: "225", position: "RB66", drafted: false, draftedBy: null, pickNumber: null },
  { id: 226, name: "Kyle Monangai", tag: "226", position: "RB67", drafted: false, draftedBy: null, pickNumber: null },
  { id: 227, name: "Tyler Bass", tag: "227", position: "K10", drafted: false, draftedBy: null, pickNumber: null },
  { id: 228, name: "Juwan Johnson", tag: "228", position: "TE29", drafted: false, draftedBy: null, pickNumber: null },
  { id: 229, name: "Anthony Richardson Sr.", tag: "229", position: "QB29", drafted: false, draftedBy: null, pickNumber: null },
  { id: 230, name: "Will Shipley", tag: "230", position: "RB68", drafted: false, draftedBy: null, pickNumber: null },
  { id: 231, name: "Audric Estime", tag: "231", position: "RB69", drafted: false, draftedBy: null, pickNumber: null },
  { id: 232, name: "Jake Elliott", tag: "232", position: "K11", drafted: false, draftedBy: null, pickNumber: null },
  { id: 233, name: "Keenan Allen", tag: "233", position: "WR81", drafted: false, draftedBy: null, pickNumber: null },
  { id: 234, name: "Raheem Mostert", tag: "234", position: "RB70", drafted: false, draftedBy: null, pickNumber: null },
  { id: 235, name: "Cole Kmet", tag: "235", position: "TE30", drafted: false, draftedBy: null, pickNumber: null },
  { id: 236, name: "Devaughn Vele", tag: "236", position: "WR82", drafted: false, draftedBy: null, pickNumber: null },
  { id: 237, name: "San Francisco 49ers", tag: "237", position: "DST15", drafted: false, draftedBy: null, pickNumber: null },
  { id: 238, name: "Calvin Austin III", tag: "238", position: "WR83", drafted: false, draftedBy: null, pickNumber: null },
  { id: 239, name: "Keaton Mitchell", tag: "239", position: "RB71", drafted: false, draftedBy: null, pickNumber: null },
  { id: 240, name: "Russell Wilson", tag: "240", position: "QB30", drafted: false, draftedBy: null, pickNumber: null },
  { id: 241, name: "Tyler Lockett", tag: "241", position: "WR84", drafted: false, draftedBy: null, pickNumber: null },
  { id: 242, name: "Jason Sanders", tag: "242", position: "K12", drafted: false, draftedBy: null, pickNumber: null },
  { id: 243, name: "Jalen Tolbert", tag: "243", position: "WR85", drafted: false, draftedBy: null, pickNumber: null },
  { id: 244, name: "Pat Bryant", tag: "244", position: "WR86", drafted: false, draftedBy: null, pickNumber: null },
  { id: 245, name: "Elijah Mitchell", tag: "245", position: "RB72", drafted: false, draftedBy: null, pickNumber: null },
  { id: 246, name: "Elijah Arroyo", tag: "246", position: "TE31", drafted: false, draftedBy: null, pickNumber: null },
  { id: 247, name: "Elic Ayomanor", tag: "247", position: "WR87", drafted: false, draftedBy: null, pickNumber: null },
  { id: 248, name: "Younghoe Koo", tag: "248", position: "K13", drafted: false, draftedBy: null, pickNumber: null },
  { id: 249, name: "Jarquez Hunter", tag: "249", position: "RB73", drafted: false, draftedBy: null, pickNumber: null },
  { id: 250, name: "Daniel Jones", tag: "250", position: "QB31", drafted: false, draftedBy: null, pickNumber: null },
  { id: 251, name: "Tampa Bay Buccaneers", tag: "251", position: "DST16", drafted: false, draftedBy: null, pickNumber: null },
  { id: 252, name: "Brandin Cooks", tag: "252", position: "WR88", drafted: false, draftedBy: null, pickNumber: null },
  { id: 253, name: "Dallas Cowboys", tag: "253", position: "DST17", drafted: false, draftedBy: null, pickNumber: null },
  { id: 254, name: "Devin Singletary", tag: "254", position: "RB74", drafted: false, draftedBy: null, pickNumber: null },
  { id: 255, name: "Ollie Gordon II", tag: "255", position: "RB75", drafted: false, draftedBy: null, pickNumber: null },
  { id: 256, name: "Trevor Etienne", tag: "256", position: "RB76", drafted: false, draftedBy: null, pickNumber: null },
  { id: 257, name: "Diontae Johnson", tag: "257", position: "WR89", drafted: false, draftedBy: null, pickNumber: null },
  { id: 258, name: "Antonio Gibson", tag: "258", position: "RB77", drafted: false, draftedBy: null, pickNumber: null },
  { id: 259, name: "Joshua Karty", tag: "259", position: "K14", drafted: false, draftedBy: null, pickNumber: null },
  { id: 260, name: "Kenneth Gainwell", tag: "260", position: "RB78", drafted: false, draftedBy: null, pickNumber: null },
  { id: 261, name: "Roman Wilson", tag: "261", position: "WR90", drafted: false, draftedBy: null, pickNumber: null },
  { id: 262, name: "Brashard Smith", tag: "262", position: "RB79", drafted: false, draftedBy: null, pickNumber: null },
  { id: 263, name: "Nick Westbrook-Ikhine", tag: "263", position: "WR91", drafted: false, draftedBy: null, pickNumber: null },
  { id: 264, name: "Kayshon Boutte", tag: "264", position: "WR92", drafted: false, draftedBy: null, pickNumber: null },
  { id: 265, name: "Dyami Brown", tag: "265", position: "WR93", drafted: false, draftedBy: null, pickNumber: null },
  { id: 266, name: "Tahj Brooks", tag: "266", position: "RB80", drafted: false, draftedBy: null, pickNumber: null },
  { id: 267, name: "Amari Cooper", tag: "267", position: "WR94", drafted: false, draftedBy: null, pickNumber: null },
  { id: 268, name: "Noah Gray", tag: "268", position: "TE32", drafted: false, draftedBy: null, pickNumber: null },
  { id: 269, name: "Matt Gay", tag: "269", position: "K15", drafted: false, draftedBy: null, pickNumber: null },
  { id: 270, name: "Khalil Herbert", tag: "270", position: "RB81", drafted: false, draftedBy: null, pickNumber: null },
  { id: 271, name: "Cleveland Browns", tag: "271", position: "DST18", drafted: false, draftedBy: null, pickNumber: null },
  { id: 272, name: "Elijah Moore", tag: "272", position: "WR95", drafted: false, draftedBy: null, pickNumber: null },
  { id: 273, name: "Ty Johnson", tag: "273", position: "RB82", drafted: false, draftedBy: null, pickNumber: null },
  { id: 274, name: "Mike Williams", tag: "274", position: "WR96", drafted: false, draftedBy: null, pickNumber: null },
  { id: 275, name: "Sean Tucker", tag: "275", position: "RB83", drafted: false, draftedBy: null, pickNumber: null },
  { id: 276, name: "Noah Fant", tag: "276", position: "TE33", drafted: false, draftedBy: null, pickNumber: null },
  { id: 277, name: "Zack Moss", tag: "277", position: "RB84", drafted: false, draftedBy: null, pickNumber: null },
  { id: 278, name: "Jalen Royals", tag: "278", position: "WR97", drafted: false, draftedBy: null, pickNumber: null },
  { id: 279, name: "Jordan James", tag: "279", position: "RB85", drafted: false, draftedBy: null, pickNumber: null },
  { id: 280, name: "Malik Washington", tag: "280", position: "WR98", drafted: false, draftedBy: null, pickNumber: null },
  { id: 281, name: "Tyler Shough", tag: "281", position: "QB32", drafted: false, draftedBy: null, pickNumber: null },
  { id: 282, name: "Woody Marks", tag: "282", position: "RB86", drafted: false, draftedBy: null, pickNumber: null },
  { id: 283, name: "Isaiah Davis", tag: "283", position: "RB87", drafted: false, draftedBy: null, pickNumber: null },
  { id: 284, name: "Harold Fannin Jr.", tag: "284", position: "TE34", drafted: false, draftedBy: null, pickNumber: null },
  { id: 285, name: "Joe Flacco", tag: "285", position: "QB33", drafted: false, draftedBy: null, pickNumber: null },
  { id: 286, name: "Tre Tucker", tag: "286", position: "WR99", drafted: false, draftedBy: null, pickNumber: null },
  { id: 287, name: "Chicago Bears", tag: "287", position: "DST19", drafted: false, draftedBy: null, pickNumber: null },
  { id: 288, name: "Tim Patrick", tag: "288", position: "WR100", drafted: false, draftedBy: null, pickNumber: null },
  { id: 289, name: "Theo Johnson", tag: "289", position: "TE35", drafted: false, draftedBy: null, pickNumber: null },
  { id: 290, name: "Taysom Hill", tag: "290", position: "TE36", drafted: false, draftedBy: null, pickNumber: null },
  { id: 291, name: "Alexander Mattison", tag: "291", position: "RB88", drafted: false, draftedBy: null, pickNumber: null },
  { id: 292, name: "Kimani Vidal", tag: "292", position: "RB89", drafted: false, draftedBy: null, pickNumber: null },
  { id: 293, name: "Jaxson Dart", tag: "293", position: "QB34", drafted: false, draftedBy: null, pickNumber: null },
  { id: 294, name: "Sincere McCormick", tag: "294", position: "RB90", drafted: false, draftedBy: null, pickNumber: null },
  { id: 295, name: "Dameon Pierce", tag: "295", position: "RB91", drafted: false, draftedBy: null, pickNumber: null },
  { id: 296, name: "Terrance Ferguson", tag: "296", position: "TE37", drafted: false, draftedBy: null, pickNumber: null },
  { id: 297, name: "Daniel Carlson", tag: "297", position: "K16", drafted: false, draftedBy: null, pickNumber: null },
  { id: 298, name: "Xavier Restrepo", tag: "298", position: "WR101", drafted: false, draftedBy: null, pickNumber: null },
  { id: 299, name: "Parker Washington", tag: "299", position: "WR102", drafted: false, draftedBy: null, pickNumber: null },
  { id: 300, name: "Jalen Nailor", tag: "300", position: "WR103", drafted: false, draftedBy: null, pickNumber: null },
  { id: 301, name: "Darren Waller", tag: "301", position: "TE38", drafted: false, draftedBy: null, pickNumber: null },
  { id: 302, name: "Christian Watson", tag: "302", position: "WR104", drafted: false, draftedBy: null, pickNumber: null },
  { id: 303, name: "Damien Martinez", tag: "303", position: "RB92", drafted: false, draftedBy: null, pickNumber: null },
  { id: 304, name: "Gabe Davis", tag: "304", position: "WR105", drafted: false, draftedBy: null, pickNumber: null },
  { id: 305, name: "Jason Myers", tag: "305", position: "K17", drafted: false, draftedBy: null, pickNumber: null },
  { id: 306, name: "Tory Horton", tag: "306", position: "WR106", drafted: false, draftedBy: null, pickNumber: null },
  { id: 307, name: "Luke McCaffrey", tag: "307", position: "WR107", drafted: false, draftedBy: null, pickNumber: null },
  { id: 308, name: "Phil Mafah", tag: "308", position: "RB93", drafted: false, draftedBy: null, pickNumber: null },
  { id: 309, name: "Ty Chandler", tag: "309", position: "RB94", drafted: false, draftedBy: null, pickNumber: null },
  { id: 310, name: "Emanuel Wilson", tag: "310", position: "RB95", drafted: false, draftedBy: null, pickNumber: null },
  { id: 311, name: "Isaac TeSlaa", tag: "311", position: "WR108", drafted: false, draftedBy: null, pickNumber: null },
  { id: 312, name: "Oronde Gadsden II", tag: "312", position: "TE39", drafted: false, draftedBy: null, pickNumber: null },
  { id: 313, name: "Ben Sinnott", tag: "313", position: "TE40", drafted: false, draftedBy: null, pickNumber: null },
  { id: 314, name: "Chris Brooks", tag: "314", position: "RB96", drafted: false, draftedBy: null, pickNumber: null },
  { id: 315, name: "Tyler Higbee", tag: "315", position: "TE41", drafted: false, draftedBy: null, pickNumber: null },
  { id: 316, name: "Tez Johnson", tag: "316", position: "WR109", drafted: false, draftedBy: null, pickNumber: null },
  { id: 317, name: "Shedeur Sanders", tag: "317", position: "QB35", drafted: false, draftedBy: null, pickNumber: null },
  { id: 318, name: "Jermaine Burton", tag: "318", position: "WR110", drafted: false, draftedBy: null, pickNumber: null },
  { id: 319, name: "Tyler Conklin", tag: "319", position: "TE42", drafted: false, draftedBy: null, pickNumber: null },
  { id: 320, name: "Chris Rodriguez Jr.", tag: "320", position: "RB97", drafted: false, draftedBy: null, pickNumber: null },
  { id: 321, name: "Miami Dolphins", tag: "321", position: "DST20", drafted: false, draftedBy: null, pickNumber: null },
  { id: 322, name: "Raheim Sanders", tag: "322", position: "RB98", drafted: false, draftedBy: null, pickNumber: null },
  { id: 323, name: "Tutu Atwell", tag: "323", position: "WR111", drafted: false, draftedBy: null, pickNumber: null },
  { id: 324, name: "Will Dissly", tag: "324", position: "TE43", drafted: false, draftedBy: null, pickNumber: null },
  { id: 325, name: "Dont'e Thornton Jr.", tag: "325", position: "WR112", drafted: false, draftedBy: null, pickNumber: null },
  { id: 326, name: "Will Reichard", tag: "326", position: "K18", drafted: false, draftedBy: null, pickNumber: null },
  { id: 327, name: "Gus Edwards", tag: "327", position: "RB99", drafted: false, draftedBy: null, pickNumber: null },
  { id: 328, name: "Zamir White", tag: "328", position: "RB100", drafted: false, draftedBy: null, pickNumber: null },
  { id: 329, name: "Jacory Croskey-Merritt", tag: "329", position: "RB101", drafted: false, draftedBy: null, pickNumber: null },
  { id: 330, name: "New England Patriots", tag: "330", position: "DST21", drafted: false, draftedBy: null, pickNumber: null },
  { id: 331, name: "Arizona Cardinals", tag: "331", position: "DST22", drafted: false, draftedBy: null, pickNumber: null },
  { id: 332, name: "Jordan Whittington", tag: "332", position: "WR113", drafted: false, draftedBy: null, pickNumber: null },
  { id: 333, name: "Tai Felton", tag: "333", position: "WR114", drafted: false, draftedBy: null, pickNumber: null },
  { id: 334, name: "Ray-Ray McCloud III", tag: "334", position: "WR115", drafted: false, draftedBy: null, pickNumber: null },
  { id: 335, name: "Tyler Loop", tag: "335", position: "K19", drafted: false, draftedBy: null, pickNumber: null },
  { id: 336, name: "A.J. Dillon", tag: "336", position: "RB102", drafted: false, draftedBy: null, pickNumber: null },
  { id: 337, name: "Samaje Perine", tag: "337", position: "RB103", drafted: false, draftedBy: null, pickNumber: null },
  { id: 338, name: "John Metchie III", tag: "338", position: "WR116", drafted: false, draftedBy: null, pickNumber: null },
  { id: 339, name: "Cam Akers", tag: "339", position: "RB104", drafted: false, draftedBy: null, pickNumber: null },
  { id: 340, name: "Jalen Milroe", tag: "340", position: "QB36", drafted: false, draftedBy: null, pickNumber: null },
  { id: 341, name: "Justin Tucker", tag: "341", position: "K20", drafted: false, draftedBy: null, pickNumber: null },
  { id: 342, name: "Marquez Valdes-Scantling", tag: "342", position: "WR117", drafted: false, draftedBy: null, pickNumber: null },
  { id: 343, name: "Savion Williams", tag: "343", position: "WR118", drafted: false, draftedBy: null, pickNumber: null },
  { id: 344, name: "Josh Reynolds", tag: "344", position: "WR119", drafted: false, draftedBy: null, pickNumber: null },
  { id: 345, name: "Troy Franklin", tag: "345", position: "WR120", drafted: false, draftedBy: null, pickNumber: null },
  { id: 346, name: "Dawson Knox", tag: "346", position: "TE44", drafted: false, draftedBy: null, pickNumber: null },
  { id: 347, name: "Michael Mayer", tag: "347", position: "TE45", drafted: false, draftedBy: null, pickNumber: null },
  { id: 348, name: "Demarcus Robinson", tag: "348", position: "WR121", drafted: false, draftedBy: null, pickNumber: null },
  { id: 349, name: "Noah Brown", tag: "349", position: "WR122", drafted: false, draftedBy: null, pickNumber: null },
  { id: 350, name: "KaVontae Turpin", tag: "350", position: "WR123", drafted: false, draftedBy: null, pickNumber: null },
  { id: 351, name: "New York Giants", tag: "351", position: "DST23", drafted: false, draftedBy: null, pickNumber: null },
  { id: 352, name: "Jake Moody", tag: "352", position: "K21", drafted: false, draftedBy: null, pickNumber: null },
  { id: 353, name: "Cam Little", tag: "353", position: "K22", drafted: false, draftedBy: null, pickNumber: null },
  { id: 354, name: "Donovan Edwards", tag: "354", position: "RB105", drafted: false, draftedBy: null, pickNumber: null },
  { id: 355, name: "Jameis Winston", tag: "355", position: "QB37", drafted: false, draftedBy: null, pickNumber: null },
  { id: 356, name: "Spencer Rattler", tag: "356", position: "QB38", drafted: false, draftedBy: null, pickNumber: null },
  { id: 357, name: "Austin Hooper", tag: "357", position: "TE46", drafted: false, draftedBy: null, pickNumber: null },
  { id: 358, name: "Chimere Dike", tag: "358", position: "WR124", drafted: false, draftedBy: null, pickNumber: null },
  { id: 359, name: "Luke Musgrave", tag: "359", position: "TE47", drafted: false, draftedBy: null, pickNumber: null },
  { id: 360, name: "Tank Dell", tag: "360", position: "WR125", drafted: false, draftedBy: null, pickNumber: null },
  { id: 361, name: "Mack Hollins", tag: "361", position: "WR126", drafted: false, draftedBy: null, pickNumber: null },
  { id: 362, name: "LeQuint Allen Jr.", tag: "362", position: "RB106", drafted: false, draftedBy: null, pickNumber: null },
  { id: 363, name: "Brandon McManus", tag: "363", position: "K23", drafted: false, draftedBy: null, pickNumber: null },
  { id: 364, name: "Kirk Cousins", tag: "364", position: "QB39", drafted: false, draftedBy: null, pickNumber: null },
  { id: 365, name: "Allen Lazard", tag: "365", position: "WR127", drafted: false, draftedBy: null, pickNumber: null },
  { id: 366, name: "Greg Dortch", tag: "366", position: "WR128", drafted: false, draftedBy: null, pickNumber: null },
  { id: 367, name: "Gunnar Helm", tag: "367", position: "TE48", drafted: false, draftedBy: null, pickNumber: null },
  { id: 368, name: "Isaiah Bond", tag: "368", position: "WR129", drafted: false, draftedBy: null, pickNumber: null },
  { id: 369, name: "Jaylin Lane", tag: "369", position: "WR130", drafted: false, draftedBy: null, pickNumber: null },
  { id: 370, name: "Curtis Samuel", tag: "370", position: "WR131", drafted: false, draftedBy: null, pickNumber: null },
  { id: 371, name: "Kenny Pickett", tag: "371", position: "QB40", drafted: false, draftedBy: null, pickNumber: null },
  { id: 372, name: "Foster Moreau", tag: "372", position: "TE49", drafted: false, draftedBy: null, pickNumber: null },
  { id: 373, name: "Tommy Tremble", tag: "373", position: "TE50", drafted: false, draftedBy: null, pickNumber: null },
  { id: 374, name: "Washington Commanders", tag: "374", position: "DST24", drafted: false, draftedBy: null, pickNumber: null },
  { id: 375, name: "Van Jefferson", tag: "375", position: "WR132", drafted: false, draftedBy: null, pickNumber: null },
  { id: 376, name: "Trey Sermon", tag: "376", position: "RB107", drafted: false, draftedBy: null, pickNumber: null },
  { id: 377, name: "Robert Woods", tag: "377", position: "WR133", drafted: false, draftedBy: null, pickNumber: null },
  { id: 378, name: "Emari Demercado", tag: "378", position: "RB108", drafted: false, draftedBy: null, pickNumber: null },
  { id: 379, name: "Jahan Dotson", tag: "379", position: "WR134", drafted: false, draftedBy: null, pickNumber: null },
  { id: 380, name: "Ameer Abdullah", tag: "380", position: "RB109", drafted: false, draftedBy: null, pickNumber: null },
  { id: 381, name: "Dillon Gabriel", tag: "381", position: "QB41", drafted: false, draftedBy: null, pickNumber: null },
  { id: 382, name: "Arian Smith", tag: "382", position: "WR135", drafted: false, draftedBy: null, pickNumber: null },
  { id: 383, name: "Kendrick Bourne", tag: "383", position: "WR136", drafted: false, draftedBy: null, pickNumber: null },
  { id: 384, name: "Eddy Pineiro", tag: "384", position: "K24", drafted: false, draftedBy: null, pickNumber: null },
  { id: 385, name: "Mason Rudolph", tag: "385", position: "QB42", drafted: false, draftedBy: null, pickNumber: null },
  { id: 386, name: "Kalel Mullings", tag: "386", position: "RB110", drafted: false, draftedBy: null, pickNumber: null },
  { id: 387, name: "Jeremy McNichols", tag: "387", position: "RB111", drafted: false, draftedBy: null, pickNumber: null },
  { id: 388, name: "Luke Schoonmaker", tag: "388", position: "TE51", drafted: false, draftedBy: null, pickNumber: null },
  { id: 389, name: "Atlanta Falcons", tag: "389", position: "DST25", drafted: false, draftedBy: null, pickNumber: null },
  { id: 390, name: "Will Levis", tag: "390", position: "QB43", drafted: false, draftedBy: null, pickNumber: null },
  { id: 391, name: "Craig Reynolds", tag: "391", position: "RB112", drafted: false, draftedBy: null, pickNumber: null },
  { id: 392, name: "Jacob Cowing", tag: "392", position: "WR137", drafted: false, draftedBy: null, pickNumber: null },
  { id: 393, name: "Antwane Wells Jr.", tag: "393", position: "WR138", drafted: false, draftedBy: null, pickNumber: null },
  { id: 394, name: "Theo Wease Jr.", tag: "394", position: "WR139", drafted: false, draftedBy: null, pickNumber: null },
  { id: 395, name: "Ja'Lynn Polk", tag: "395", position: "WR140", drafted: false, draftedBy: null, pickNumber: null },
  { id: 396, name: "Matt Prater", tag: "396", position: "K25", drafted: false, draftedBy: null, pickNumber: null },
  { id: 397, name: "Olamide Zaccheaus", tag: "397", position: "WR141", drafted: false, draftedBy: null, pickNumber: null },
  { id: 398, name: "Blake Grupe", tag: "398", position: "K26", drafted: false, draftedBy: null, pickNumber: null },
  { id: 399, name: "Cairo Santos", tag: "399", position: "K27", drafted: false, draftedBy: null, pickNumber: null },
  { id: 400, name: "Ja'Quinden Jackson", tag: "400", position: "RB113", drafted: false, draftedBy: null, pickNumber: null },
  { id: 401, name: "Chad Ryland", tag: "401", position: "K28", drafted: false, draftedBy: null, pickNumber: null },
  { id: 402, name: "JuJu Smith-Schuster", tag: "402", position: "WR142", drafted: false, draftedBy: null, pickNumber: null },
  { id: 403, name: "Josh Oliver", tag: "403", position: "TE52", drafted: false, draftedBy: null, pickNumber: null },
  { id: 404, name: "Cordarrelle Patterson", tag: "404", position: "RB114", drafted: false, draftedBy: null, pickNumber: null },
  { id: 405, name: "Zay Jones", tag: "405", position: "WR143", drafted: false, draftedBy: null, pickNumber: null },
  { id: 406, name: "Jalin Hyatt", tag: "406", position: "WR144", drafted: false, draftedBy: null, pickNumber: null },
  { id: 407, name: "Cade Stover", tag: "407", position: "TE53", drafted: false, draftedBy: null, pickNumber: null },
  { id: 408, name: "Malachi Corley", tag: "408", position: "WR145", drafted: false, draftedBy: null, pickNumber: null },
  { id: 409, name: "Graham Gano", tag: "409", position: "K29", drafted: false, draftedBy: null, pickNumber: null },
  { id: 410, name: "Kenny McIntosh", tag: "410", position: "RB115", drafted: false, draftedBy: null, pickNumber: null },
  { id: 411, name: "Jeremy Ruckert", tag: "411", position: "TE54", drafted: false, draftedBy: null, pickNumber: null },
  { id: 412, name: "D'Ernest Johnson", tag: "412", position: "RB116", drafted: false, draftedBy: null, pickNumber: null },
  { id: 413, name: "Joe Milton III", tag: "413", position: "QB44", drafted: false, draftedBy: null, pickNumber: null },
  { id: 414, name: "Hunter Luepke", tag: "414", position: "RB117", drafted: false, draftedBy: null, pickNumber: null },
  { id: 415, name: "Jonathon Brooks", tag: "415", position: "RB118", drafted: false, draftedBy: null, pickNumber: null },
  { id: 416, name: "Josh Whyle", tag: "416", position: "TE55", drafted: false, draftedBy: null, pickNumber: null },
  { id: 417, name: "Grant Calcaterra", tag: "417", position: "TE56", drafted: false, draftedBy: null, pickNumber: null },
  { id: 418, name: "Elijah Higgins", tag: "418", position: "TE57", drafted: false, draftedBy: null, pickNumber: null },
  { id: 419, name: "Kyle Juszczyk", tag: "419", position: "RB119", drafted: false, draftedBy: null, pickNumber: null },
  { id: 420, name: "Stone Smartt", tag: "420", position: "TE58", drafted: false, draftedBy: null, pickNumber: null },
  { id: 421, name: "Marcus Yarns", tag: "421", position: "RB120", drafted: false, draftedBy: null, pickNumber: null },
  { id: 422, name: "Javon Baker", tag: "422", position: "WR146", drafted: false, draftedBy: null, pickNumber: null },
  { id: 423, name: "Indianapolis Colts", tag: "423", position: "DST26", drafted: false, draftedBy: null, pickNumber: null },
  { id: 424, name: "Kalif Raymond", tag: "424", position: "WR147", drafted: false, draftedBy: null, pickNumber: null },
  { id: 425, name: "AJ Barner", tag: "425", position: "TE59", drafted: false, draftedBy: null, pickNumber: null },
  { id: 426, name: "KeAndre Lambert-Smith", tag: "426", position: "WR148", drafted: false, draftedBy: null, pickNumber: null },
  { id: 427, name: "Clyde Edwards-Helaire", tag: "427", position: "RB121", drafted: false, draftedBy: null, pickNumber: null },
  { id: 428, name: "Cincinnati Bengals", tag: "428", position: "DST27", drafted: false, draftedBy: null, pickNumber: null },
  { id: 429, name: "Zach Wilson", tag: "429", position: "QB45", drafted: false, draftedBy: null, pickNumber: null },
  { id: 430, name: "Las Vegas Raiders", tag: "430", position: "DST28", drafted: false, draftedBy: null, pickNumber: null },
  { id: 431, name: "Darnell Washington", tag: "431", position: "TE60", drafted: false, draftedBy: null, pickNumber: null },
  { id: 432, name: "New Orleans Saints", tag: "432", position: "DST29", drafted: false, draftedBy: null, pickNumber: null },
  { id: 433, name: "Hassan Haskins", tag: "433", position: "RB122", drafted: false, draftedBy: null, pickNumber: null },
  { id: 434, name: "Marcus Mariota", tag: "434", position: "QB46", drafted: false, draftedBy: null, pickNumber: null },
  { id: 435, name: "Tyler Goodson", tag: "435", position: "RB123", drafted: false, draftedBy: null, pickNumber: null },
  { id: 436, name: "KhaDarel Hodge", tag: "436", position: "WR149", drafted: false, draftedBy: null, pickNumber: null },
  { id: 437, name: "Aidan O'Connell", tag: "437", position: "QB47", drafted: false, draftedBy: null, pickNumber: null },
  { id: 438, name: "Colby Parkinson", tag: "438", position: "TE61", drafted: false, draftedBy: null, pickNumber: null },
  { id: 439, name: "Will Howard", tag: "439", position: "QB48", drafted: false, draftedBy: null, pickNumber: null },
  { id: 440, name: "Alec Ingold", tag: "440", position: "RB124", drafted: false, draftedBy: null, pickNumber: null },
  { id: 441, name: "Treylon Burks", tag: "441", position: "WR150", drafted: false, draftedBy: null, pickNumber: null },
  { id: 442, name: "Deuce Vaughn", tag: "442", position: "RB125", drafted: false, draftedBy: null, pickNumber: null },
  { id: 443, name: "Carson Steele", tag: "443", position: "RB126", drafted: false, draftedBy: null, pickNumber: null },
  { id: 444, name: "Brevin Jordan", tag: "444", position: "TE62", drafted: false, draftedBy: null, pickNumber: null },
  { id: 445, name: "Mitchell Evans", tag: "445", position: "TE63", drafted: false, draftedBy: null, pickNumber: null },
  { id: 446, name: "Julian Hill", tag: "446", position: "TE64", drafted: false, draftedBy: null, pickNumber: null },
  { id: 447, name: "Jamari Thrash", tag: "447", position: "WR151", drafted: false, draftedBy: null, pickNumber: null },
  { id: 448, name: "Jake Bobo", tag: "448", position: "WR152", drafted: false, draftedBy: null, pickNumber: null },
  { id: 449, name: "Jake Browning", tag: "449", position: "QB49", drafted: false, draftedBy: null, pickNumber: null },
  { id: 450, name: "Greg Dulcich", tag: "450", position: "TE65", drafted: false, draftedBy: null, pickNumber: null },
  { id: 451, name: "Kaden Prather", tag: "451", position: "WR153", drafted: false, draftedBy: null, pickNumber: null },
  { id: 452, name: "Tanner Hudson", tag: "452", position: "TE66", drafted: false, draftedBy: null, pickNumber: null },
  { id: 453, name: "Sam Howell", tag: "453", position: "QB50", drafted: false, draftedBy: null, pickNumber: null },
  { id: 454, name: "Efton Chism III", tag: "454", position: "WR154", drafted: false, draftedBy: null, pickNumber: null },
  { id: 455, name: "Julius Chestnut", tag: "455", position: "RB127", drafted: false, draftedBy: null, pickNumber: null },
  { id: 456, name: "Pharaoh Brown", tag: "456", position: "TE67", drafted: false, draftedBy: null, pickNumber: null },
  { id: 457, name: "Michael Carter", tag: "457", position: "RB128", drafted: false, draftedBy: null, pickNumber: null },
  { id: 458, name: "Tyrod Taylor", tag: "458", position: "QB51", drafted: false, draftedBy: null, pickNumber: null },
  { id: 459, name: "Chris Tyree", tag: "459", position: "RB129", drafted: false, draftedBy: null, pickNumber: null },
  { id: 460, name: "Malik Willis", tag: "460", position: "QB52", drafted: false, draftedBy: null, pickNumber: null },
  { id: 461, name: "Tyler Johnson", tag: "461", position: "WR155", drafted: false, draftedBy: null, pickNumber: null },
  { id: 462, name: "Pierre Strong Jr.", tag: "462", position: "RB130", drafted: false, draftedBy: null, pickNumber: null },
  { id: 463, name: "Daniel Bellinger", tag: "463", position: "TE68", drafted: false, draftedBy: null, pickNumber: null },
  { id: 464, name: "Jonathan Mingo", tag: "464", position: "WR156", drafted: false, draftedBy: null, pickNumber: null },
  { id: 465, name: "Brock Wright", tag: "465", position: "TE69", drafted: false, draftedBy: null, pickNumber: null },
  { id: 466, name: "Rondale Moore", tag: "466", position: "WR157", drafted: false, draftedBy: null, pickNumber: null },
  { id: 467, name: "Bub Means", tag: "467", position: "WR158", drafted: false, draftedBy: null, pickNumber: null },
  { id: 468, name: "Dare Ogunbowale", tag: "468", position: "RB131", drafted: false, draftedBy: null, pickNumber: null },
  { id: 469, name: "Ezekiel Elliott", tag: "469", position: "RB132", drafted: false, draftedBy: null, pickNumber: null },
  { id: 470, name: "Luke Lachey", tag: "470", position: "TE70", drafted: false, draftedBy: null, pickNumber: null },
  { id: 471, name: "Johnny Mundt", tag: "471", position: "TE71", drafted: false, draftedBy: null, pickNumber: null },
  { id: 472, name: "Jimmy Horn Jr.", tag: "472", position: "WR159", drafted: false, draftedBy: null, pickNumber: null },
  { id: 473, name: "Jordan Watkins", tag: "473", position: "WR160", drafted: false, draftedBy: null, pickNumber: null },
  { id: 474, name: "Jacksonville Jaguars", tag: "474", position: "DST30", drafted: false, draftedBy: null, pickNumber: null },
  { id: 475, name: "Derius Davis", tag: "475", position: "WR161", drafted: false, draftedBy: null, pickNumber: null },
  { id: 476, name: "Drew Sample", tag: "476", position: "TE72", drafted: false, draftedBy: null, pickNumber: null },
  { id: 477, name: "Dylan Laube", tag: "477", position: "RB133", drafted: false, draftedBy: null, pickNumber: null },
  { id: 478, name: "C.J. Ham", tag: "478", position: "RB134", drafted: false, draftedBy: null, pickNumber: null },
  { id: 479, name: "Harrison Bryant", tag: "479", position: "TE73", drafted: false, draftedBy: null, pickNumber: null },
  { id: 480, name: "Michael Gallup", tag: "480", position: "WR162", drafted: false, draftedBy: null, pickNumber: null },
  { id: 481, name: "Michael Burton", tag: "481", position: "RB135", drafted: false, draftedBy: null, pickNumber: null },
  { id: 482, name: "Patrick Taylor Jr.", tag: "482", position: "RB136", drafted: false, draftedBy: null, pickNumber: null },
  { id: 483, name: "Tyler Badie", tag: "483", position: "RB137", drafted: false, draftedBy: null, pickNumber: null },
  { id: 484, name: "Hunter Renfrow", tag: "484", position: "WR163", drafted: false, draftedBy: null, pickNumber: null },
  { id: 485, name: "Devontez Walker", tag: "485", position: "WR164", drafted: false, draftedBy: null, pickNumber: null },
  { id: 486, name: "DeAndre Carter", tag: "486", position: "WR165", drafted: false, draftedBy: null, pickNumber: null },
  { id: 487, name: "Adam Trautman", tag: "487", position: "TE74", drafted: false, draftedBy: null, pickNumber: null },
  { id: 488, name: "David Moore", tag: "488", position: "WR166", drafted: false, draftedBy: null, pickNumber: null },
  { id: 489, name: "Kylen Granson", tag: "489", position: "TE75", drafted: false, draftedBy: null, pickNumber: null },
  { id: 490, name: "Cooper Rush", tag: "490", position: "QB53", drafted: false, draftedBy: null, pickNumber: null },
  { id: 491, name: "Jared Wiley", tag: "491", position: "TE76", drafted: false, draftedBy: null, pickNumber: null },
  { id: 492, name: "Justin Watson", tag: "492", position: "WR167", drafted: false, draftedBy: null, pickNumber: null },
  { id: 493, name: "Payne Durham", tag: "493", position: "TE77", drafted: false, draftedBy: null, pickNumber: null },
  { id: 494, name: "Brevyn Spann-Ford", tag: "494", position: "TE78", drafted: false, draftedBy: null, pickNumber: null },
  { id: 495, name: "Mac Jones", tag: "495", position: "QB54", drafted: false, draftedBy: null, pickNumber: null },
  { id: 496, name: "Jacoby Brissett", tag: "496", position: "QB55", drafted: false, draftedBy: null, pickNumber: null },
  { id: 497, name: "Mecole Hardman Jr.", tag: "497", position: "WR168", drafted: false, draftedBy: null, pickNumber: null },
  { id: 498, name: "Ricky White III", tag: "498", position: "WR169", drafted: false, draftedBy: null, pickNumber: null },
  { id: 499, name: "Luke Farrell", tag: "499", position: "TE79", drafted: false, draftedBy: null, pickNumber: null },
  { id: 500, name: "Rasheen Ali", tag: "500", position: "RB138", drafted: false, draftedBy: null, pickNumber: null },
  { id: 501, name: "Patrick Ricard", tag: "501", position: "RB139", drafted: false, draftedBy: null, pickNumber: null },
  { id: 502, name: "Charlie Woerner", tag: "502", position: "TE80", drafted: false, draftedBy: null, pickNumber: null },
  { id: 503, name: "Jimmy Garoppolo", tag: "503", position: "QB56", drafted: false, draftedBy: null, pickNumber: null },
  { id: 504, name: "Michael Woods II", tag: "504", position: "WR170", drafted: false, draftedBy: null, pickNumber: null },
  { id: 505, name: "Ronnie Rivers", tag: "505", position: "RB140", drafted: false, draftedBy: null, pickNumber: null },
  { id: 506, name: "Xavier Smith", tag: "506", position: "WR171", drafted: false, draftedBy: null, pickNumber: null },
  { id: 507, name: "Mo Alie-Cox", tag: "507", position: "TE81", drafted: false, draftedBy: null, pickNumber: null },
  { id: 508, name: "Travis Homer", tag: "508", position: "RB141", drafted: false, draftedBy: null, pickNumber: null },
  { id: 509, name: "Cedrick Wilson Jr.", tag: "509", position: "WR172", drafted: false, draftedBy: null, pickNumber: null },
  { id: 510, name: "Gardner Minshew II", tag: "510", position: "QB57", drafted: false, draftedBy: null, pickNumber: null },
  { id: 511, name: "Troy Hairston II", tag: "511", position: "RB142", drafted: false, draftedBy: null, pickNumber: null },
  { id: 512, name: "Johnny Wilson", tag: "512", position: "WR173", drafted: false, draftedBy: null, pickNumber: null },
  { id: 513, name: "Jelani Woods", tag: "513", position: "TE82", drafted: false, draftedBy: null, pickNumber: null },
  { id: 514, name: "Nick Nash", tag: "514", position: "WR174", drafted: false, draftedBy: null, pickNumber: null },
  { id: 515, name: "Hendon Hooker", tag: "515", position: "QB58", drafted: false, draftedBy: null, pickNumber: null },
  { id: 516, name: "John Bates", tag: "516", position: "TE83", drafted: false, draftedBy: null, pickNumber: null },
  { id: 517, name: "Lan Larison", tag: "517", position: "RB143", drafted: false, draftedBy: null, pickNumber: null },
  { id: 518, name: "Deshaun Watson", tag: "518", position: "QB59", drafted: false, draftedBy: null, pickNumber: null },
  { id: 519, name: "David Bell", tag: "519", position: "WR175", drafted: false, draftedBy: null, pickNumber: null },
  { id: 520, name: "Velus Jones Jr.", tag: "520", position: "WR176", drafted: false, draftedBy: null, pickNumber: null },
  { id: 521, name: "DeeJay Dallas", tag: "521", position: "RB144", drafted: false, draftedBy: null, pickNumber: null },
  { id: 522, name: "Tyson Bagent", tag: "522", position: "QB60", drafted: false, draftedBy: null, pickNumber: null },
  { id: 523, name: "Sione Vaki", tag: "523", position: "RB145", drafted: false, draftedBy: null, pickNumber: null },
  { id: 524, name: "Israel Abanikanda", tag: "524", position: "RB146", drafted: false, draftedBy: null, pickNumber: null },
  { id: 525, name: "Jakob Johnson", tag: "525", position: "RB147", drafted: false, draftedBy: null, pickNumber: null },
  { id: 526, name: "Ainias Smith", tag: "526", position: "WR177", drafted: false, draftedBy: null, pickNumber: null },
  { id: 527, name: "Tanner Conner", tag: "527", position: "TE84", drafted: false, draftedBy: null, pickNumber: null },
  { id: 528, name: "Frank Gore Jr.", tag: "528", position: "RB148", drafted: false, draftedBy: null, pickNumber: null },
  { id: 529, name: "Teagan Quitoriano", tag: "529", position: "TE85", drafted: false, draftedBy: null, pickNumber: null },
  { id: 530, name: "Tylan Wallace", tag: "530", position: "WR178", drafted: false, draftedBy: null, pickNumber: null },
  { id: 531, name: "Simi Fehoko", tag: "531", position: "WR179", drafted: false, draftedBy: null, pickNumber: null },
  { id: 532, name: "Darrynton Evans", tag: "532", position: "RB149", drafted: false, draftedBy: null, pickNumber: null },
  { id: 533, name: "Eric Gray", tag: "533", position: "RB150", drafted: false, draftedBy: null, pickNumber: null },
  { id: 534, name: "Bo Melton", tag: "534", position: "WR180", drafted: false, draftedBy: null, pickNumber: null },
  { id: 535, name: "Trent Sherfield Sr.", tag: "535", position: "WR181", drafted: false, draftedBy: null, pickNumber: null },
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
