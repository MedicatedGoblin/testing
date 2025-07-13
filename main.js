const players = [
  { id: 1, name: "Ja'Marr Chase", tag: "WR1", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 2, name: "Bijan Robinson", tag: "RB1", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 3, name: "Saquon Barkley", tag: "RB2", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 4, name: "Justin Jefferson", tag: "WR2", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 5, name: "Jahmyr Gibbs", tag: "RB3", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 6, name: "Christian McCaffrey", tag: "RB4", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 7, name: "CeeDee Lamb", tag: "WR3", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 8, name: "Malik Nabers", tag: "WR4", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 9, name: "Puka Nacua", tag: "WR5", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 10, name: "Ashton Jeanty", tag: "RB5", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 11, name: "De'Von Achane", tag: "RB6", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 12, name: "Amon-Ra St. Brown", tag: "WR6", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 13, name: "Brian Thomas Jr.", tag: "WR7", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 14, name: "Nico Collins", tag: "WR8", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 15, name: "Derrick Henry", tag: "RB7", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 16, name: "Jonathan Taylor", tag: "RB8", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 17, name: "A.J. Brown", tag: "WR9", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 18, name: "Drake London", tag: "WR10", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 19, name: "Brock Bowers", tag: "TE1", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 20, name: "Bucky Irving", tag: "RB9", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 21, name: "Ladd McConkey", tag: "WR11", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 22, name: "Rashee Rice", tag: "WR12", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 23, name: "Josh Jacobs", tag: "RB10", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 24, name: "Chase Brown", tag: "RB11", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 25, name: "Breece Hall", tag: "RB12", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 26, name: "Kyren Williams", tag: "RB13", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 27, name: "Tee Higgins", tag: "WR13", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 28, name: "Garrett Wilson", tag: "WR14", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 29, name: "Tyreek Hill", tag: "WR15", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 30, name: "Davante Adams", tag: "WR16", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 31, name: "Trey McBride", tag: "TE2", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 32, name: "Josh Allen", tag: "QB1", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 33, name: "Lamar Jackson", tag: "QB2", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 34, name: "Jayden Daniels", tag: "QB3", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 35, name: "James Cook", tag: "RB14", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 36, name: "Terry McLaurin", tag: "WR17", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 37, name: "Jaxon Smith-Njigba", tag: "WR18", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 38, name: "Kenneth Walker III", tag: "RB15", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 39, name: "Jalen Hurts", tag: "QB4", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 40, name: "Marvin Harrison Jr.", tag: "WR19", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 41, name: "DJ Moore", tag: "WR20", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 42, name: "George Kittle", tag: "TE3", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 43, name: "Alvin Kamara", tag: "RB16", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 44, name: "Omarion Hampton", tag: "RB17", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 45, name: "James Conner", tag: "RB18", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 46, name: "Mike Evans", tag: "WR21", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 47, name: "Chris Godwin", tag: "WR22", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 48, name: "Tetairoa McMillan", tag: "WR23", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 49, name: "DK Metcalf", tag: "WR24", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 50, name: "Travis Hunter", tag: "WR25", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 51, name: "Chuba Hubbard", tag: "RB19", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 52, name: "TreVeyon Henderson", tag: "RB20", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 53, name: "DeVonta Smith", tag: "WR26", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 54, name: "Joe Mixon", tag: "RB21", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 55, name: "Isiah Pacheco", tag: "RB22", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 56, name: "David Montgomery", tag: "RB23", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 57, name: "Jaylen Waddle", tag: "WR27", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 58, name: "Joe Burrow", tag: "QB5", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 59, name: "Xavier Worthy", tag: "WR28", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 60, name: "Chris Olave", tag: "WR29", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 61, name: "Jameson Williams", tag: "WR30", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 62, name: "Courtland Sutton", tag: "WR31", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 63, name: "Quinshon Judkins", tag: "RB24", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 64, name: "RJ Harvey", tag: "RB25", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 65, name: "Rome Odunze", tag: "WR32", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 66, name: "Zay Flowers", tag: "WR33", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 67, name: "Jauan Jennings", tag: "WR34", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 68, name: "Sam LaPorta", tag: "TE4", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 69, name: "Kaleb Johnson", tag: "RB26", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 70, name: "Tony Pollard", tag: "RB27", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 71, name: "D'Andre Swift", tag: "RB28", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 72, name: "George Pickens", tag: "WR35", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 73, name: "Calvin Ridley", tag: "WR36", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 74, name: "Jordan Addison", tag: "WR37", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 75, name: "Aaron Jones Sr.", tag: "RB29", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 76, name: "Brian Robinson Jr.", tag: "RB30", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 77, name: "Jordan Mason", tag: "RB31", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 78, name: "Jerry Jeudy", tag: "WR38", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 79, name: "Jakobi Meyers", tag: "WR39", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 80, name: "Josh Downs", tag: "WR40", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 81, name: "Stefon Diggs", tag: "WR41", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 82, name: "Jayden Reed", tag: "WR42", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 83, name: "Ricky Pearsall", tag: "WR43", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 84, name: "Patrick Mahomes II", tag: "QB6", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 85, name: "Travis Etienne Jr.", tag: "RB32", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 86, name: "T.J. Hockenson", tag: "TE5", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 87, name: "Jaylen Warren", tag: "RB33", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 88, name: "David Njoku", tag: "TE6", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 89, name: "Khalil Shakir", tag: "WR44", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 90, name: "Deebo Samuel Sr.", tag: "WR45", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 91, name: "Darnell Mooney", tag: "WR46", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 92, name: "Emeka Egbuka", tag: "WR47", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 93, name: "Travis Kelce", tag: "TE7", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 94, name: "Baker Mayfield", tag: "QB7", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 95, name: "Bo Nix", tag: "QB8", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 96, name: "Justin Fields", tag: "QB9", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 97, name: "Justin Herbert", tag: "QB10", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 98, name: "Mark Andrews", tag: "TE8", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 99, name: "Evan Engram", tag: "TE9", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 100, name: "Tyrone Tracy Jr.", tag: "RB34", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
    { id: 101, name: "Cam Skattebo", tag: "RB35", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 102, name: "J.K. Dobbins", tag: "RB36", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 103, name: "Zach Charbonnet", tag: "RB37", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 104, name: "Colston Loveland", tag: "TE10", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 105, name: "Caleb Williams", tag: "QB11", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 106, name: "Brock Purdy", tag: "QB12", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 107, name: "Brandon Aiyuk", tag: "WR48", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 108, name: "Matthew Golden", tag: "WR49", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 109, name: "Michael Pittman Jr.", tag: "WR50", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 110, name: "Trey Benson", tag: "RB38", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 111, name: "Javonte Williams", tag: "RB39", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 112, name: "Bhayshul Tuten", tag: "RB40", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 113, name: "Kyler Murray", tag: "QB13", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 114, name: "Tyjae Spears", tag: "RB41", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 115, name: "Jayden Higgins", tag: "WR51", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 116, name: "Keon Coleman", tag: "WR52", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 117, name: "Dalton Kincaid", tag: "TE11", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 118, name: "Cooper Kupp", tag: "WR53", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 119, name: "Dak Prescott", tag: "QB14", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 120, name: "J.J. McCarthy", tag: "QB15", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 121, name: "Najee Harris", tag: "RB42", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 122, name: "Ray Davis", tag: "RB43", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 123, name: "Rachaad White", tag: "RB44", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 124, name: "Isaac Guerendo", tag: "RB45", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 125, name: "Rashid Shaheed", tag: "WR54", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 126, name: "Luther Burden III", tag: "WR55", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 127, name: "Drake Maye", tag: "QB16", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 128, name: "Roschon Johnson", tag: "RB46", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 129, name: "Rhamondre Stevenson", tag: "RB47", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 130, name: "Jaydon Blue", tag: "RB48", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 131, name: "Jaylen Wright", tag: "RB49", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 132, name: "C.J. Stroud", tag: "QB17", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 133, name: "Tucker Kraft", tag: "TE12", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 134, name: "Austin Ekeler", tag: "RB50", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 135, name: "Tank Bigsby", tag: "RB51", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 136, name: "Tre Harris", tag: "WR56", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 137, name: "Kyle Williams", tag: "WR57", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 138, name: "Rashod Bateman", tag: "WR58", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 139, name: "Christian Kirk", tag: "WR59", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 140, name: "Will Shipley", tag: "RB52", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 141, name: "MarShawn Lloyd", tag: "RB53", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 142, name: "Braelon Allen", tag: "RB54", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 143, name: "Tyler Allgeier", tag: "RB55", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 144, name: "Tyler Warren", tag: "TE13", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 145, name: "Dallas Goedert", tag: "TE14", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 146, name: "Cedric Tillman", tag: "WR60", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 147, name: "Zach Ertz", tag: "TE15", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 148, name: "Jake Ferguson", tag: "TE16", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 149, name: "Xavier Legette", tag: "WR61", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 150, name: "Nick Chubb", tag: "RB56", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 151, name: "Isaiah Likely", tag: "TE17", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 152, name: "Rico Dowdle", tag: "RB57", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 153, name: "Jarquez Hunter", tag: "RB58", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 154, name: "Pat Bryant", tag: "WR62", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 155, name: "Wan'Dale Robinson", tag: "WR63", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 156, name: "Marquise Brown", tag: "WR64", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 157, name: "Adonai Mitchell", tag: "WR65", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 158, name: "Jordan Love", tag: "QB18", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 159, name: "Trevor Lawrence", tag: "QB19", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 160, name: "Kyle Pitts", tag: "TE18", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 161, name: "Bryce Young", tag: "QB20", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 162, name: "Jared Goff", tag: "QB21", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 163, name: "Darren Waller", tag: "TE19", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 164, name: "Romeo Doubs", tag: "WR66", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 165, name: "Quentin Johnston", tag: "WR67", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 166, name: "Geno Smith", tag: "QB22", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 167, name: "Matthew Stafford", tag: "QB23", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 168, name: "DeMario Douglas", tag: "WR68", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 169, name: "Devaughn Vele", tag: "WR69", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 170, name: "Jack Bech", tag: "WR70", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 171, name: "Marvin Mims Jr.", tag: "WR71", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 172, name: "Jonnu Smith", tag: "TE20", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 173, name: "Adam Thielen", tag: "WR72", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 174, name: "Joshua Palmer", tag: "WR73", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 175, name: "Tua Tagovailoa", tag: "QB24", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 176, name: "Chig Okonkwo", tag: "TE21", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 177, name: "DeAndre Hopkins", tag: "WR74", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 178, name: "Michael Penix Jr.", tag: "QB25", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 179, name: "Cameron Ward", tag: "QB26", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 180, name: "Kareem Hunt", tag: "RB59", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 181, name: "Dylan Sampson", tag: "RB60", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 182, name: "DJ Giddens", tag: "RB61", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 183, name: "Brenton Strange", tag: "TE22", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 184, name: "Michael Wilson", tag: "WR75", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 185, name: "Elic Ayomanor", tag: "WR76", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 186, name: "Brashard Smith", tag: "RB62", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 187, name: "Elijah Moore", tag: "WR77", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 188, name: "Justice Hill", tag: "RB63", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 189, name: "Kyle Monangai", tag: "RB64", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 190, name: "Miles Sanders", tag: "RB65", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 191, name: "Kendre Miller", tag: "RB66", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 192, name: "Mike Williams", tag: "WR78", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 193, name: "Diontae Johnson", tag: "WR79", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 194, name: "Hunter Henry", tag: "TE23", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 195, name: "Pat Freiermuth", tag: "TE24", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 196, name: "Sam Darnold", tag: "QB27", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 197, name: "Aaron Rodgers", tag: "QB28", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 198, name: "Keenan Allen", tag: "WR80", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 199, name: "Amari Cooper", tag: "WR81", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 200, name: "Blake Corum", tag: "RB67", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 201, name: "Tahj Brooks", tag: "RB68", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 202, name: "Jacory Croskey-Merritt", tag: "RB69", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 203, name: "Ollie Gordon II", tag: "RB70", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 204, name: "Keaton Mitchell", tag: "RB71", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 205, name: "Daniel Jones", tag: "QB29", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 206, name: "Alec Pierce", tag: "WR82", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 207, name: "Dontayvion Wicks", tag: "WR83", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 208, name: "Mike Gesicki", tag: "TE25", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 209, name: "Cade Otton", tag: "TE26", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 210, name: "Tyler Higbee", tag: "TE27", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 211, name: "Jordan Whittington", tag: "WR84", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 212, name: "Dyami Brown", tag: "WR85", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 213, name: "Theo Johnson", tag: "TE28", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 214, name: "Jaylin Noel", tag: "WR86", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 215, name: "Jalen Royals", tag: "WR87", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 216, name: "Mason Taylor", tag: "TE29", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 217, name: "Ja'Tavion Sanders", tag: "TE30", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 218, name: "Cole Kmet", tag: "TE31", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 219, name: "Juwan Johnson", tag: "TE32", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 220, name: "Sean Tucker", tag: "RB72", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 221, name: "Trevor Etienne", tag: "RB73", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 222, name: "Jalen McMillan", tag: "WR88", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 223, name: "Jalen Tolbert", tag: "WR89", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 224, name: "Anthony Richardson Sr.", tag: "QB30", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 225, name: "Jordan James", tag: "RB74", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 226, name: "Isaac TeSlaa", tag: "WR90", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 227, name: "Isaiah Davis", tag: "RB75", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 228, name: "Raheem Mostert", tag: "RB76", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 229, name: "Devin Neal", tag: "RB77", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 230, name: "Devin Singletary", tag: "RB78", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 231, name: "Zack Moss", tag: "RB79", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 232, name: "Kayshon Boutte", tag: "WR91", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 233, name: "Darius Slayton", tag: "WR92", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 234, name: "Marquez Valdes-Scantling", tag: "WR93", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 235, name: "Andrei Iosivas", tag: "WR94", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 236, name: "Calvin Austin III", tag: "WR95", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 237, name: "Jacob Cowing", tag: "WR96", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 238, name: "Malik Washington", tag: "WR97", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 239, name: "Dalton Schultz", tag: "TE33", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 240, name: "Noah Fant", tag: "TE34", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 241, name: "Tyler Conklin", tag: "TE35", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 242, name: "Tyler Shough", tag: "QB31", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 243, name: "Jaxson Dart", tag: "QB32", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 244, name: "Harold Fannin Jr.", tag: "TE36", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 245, name: "Terrance Ferguson", tag: "TE37", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 246, name: "Noah Gray", tag: "TE38", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 247, name: "Russell Wilson", tag: "QB33", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 248, name: "Jerome Ford", tag: "RB80", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 249, name: "LeQuint Allen Jr.", tag: "RB81", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 250, name: "Woody Marks", tag: "RB82", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 251, name: "Cam Akers", tag: "RB83", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 252, name: "Jaleel McLaughlin", tag: "RB84", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 253, name: "Phil Mafah", tag: "RB85", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 254, name: "Jalen Coker", tag: "WR98", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 255, name: "Josh Reynolds", tag: "WR99", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 256, name: "Christian Watson", tag: "WR100", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 257, name: "Elijah Arroyo", tag: "TE39", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 258, name: "Oronde Gadsden II", tag: "TE40", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 259, name: "Ben Sinnott", tag: "TE41", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 260, name: "Taysom Hill", tag: "TE42", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 261, name: "Austin Hooper", tag: "TE43", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 262, name: "Michael Mayer", tag: "TE44", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 263, name: "Luke Musgrave", tag: "TE45", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 264, name: "Gunnar Helm", tag: "TE46", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 265, name: "Luke Schoonmaker", tag: "TE47", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 266, name: "Joe Flacco", tag: "QB34", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 267, name: "Jalen Milroe", tag: "QB35", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 268, name: "Shedeur Sanders", tag: "QB36", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 269, name: "Spencer Rattler", tag: "QB37", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 270, name: "Tai Felton", tag: "WR101", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 271, name: "Tory Horton", tag: "WR102", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 272, name: "Savion Williams", tag: "WR103", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 273, name: "Jaylin Lane", tag: "WR104", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 274, name: "Chimere Dike", tag: "WR105", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 275, name: "Dont'e Thornton Jr.", tag: "WR106", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 276, name: "Arian Smith", tag: "WR107", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 277, name: "Roman Wilson", tag: "WR108", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 278, name: "Xavier Restrepo", tag: "WR109", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 279, name: "Jermaine Burton", tag: "WR110", position: "WR", drafted: false, draftedBy: null, pickNumber: null },
  { id: 280, name: "Raheim Sanders", tag: "RB86", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 281, name: "Kalel Mullings", tag: "RB87", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 282, name: "Elijah Mitchell", tag: "RB88", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 283, name: "Audric Estime", tag: "RB89", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 284, name: "Antonio Gibson", tag: "RB90", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 285, name: "Khalil Herbert", tag: "RB91", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 286, name: "Dameon Pierce", tag: "RB92", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 287, name: "Alexander Mattison", tag: "RB93", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 288, name: "A.J. Dillon", tag: "RB94", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 289, name: "Kenneth Gainwell", tag: "RB95", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 290, name: "Emanuel Wilson", tag: "RB96", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 291, name: "Dillon Gabriel", tag: "QB38", position: "QB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 292, name: "Marcus Yarns", tag: "RB97", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 293, name: "Dawson Knox", tag: "TE48", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 294, name: "Sincere McCormick", tag: "RB98", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 295, name: "Kimani Vidal", tag: "RB99", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 296, name: "Samaje Perine", tag: "RB100", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 297, name: "Craig Reynolds", tag: "RB101", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 298, name: "Ty Johnson", tag: "RB102", position: "RB", drafted: false, draftedBy: null, pickNumber: null },
  { id: 299, name: "Foster Moreau", tag: "TE49", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
  { id: 300, name: "Jeremy Ruckert", tag: "TE50", position: "TE", drafted: false, draftedBy: null, pickNumber: null },
];


let currentFilter = "ALL";
let draftOrder = [];
let currentPick = 0;
let teamNames = [];
let myTeamIndex = -1;

// Tiers are array of {name: "Tier X", index: i}
let tiers = [
  { name: "Tier 1", index: 0 }
];
// Assign the first N players to tier 1 by default, rest will be organized as tiers are added

let editMode = false;

const searchInput = document.getElementById("searchInput");
const tableBody = document.querySelector("#playerTable tbody");
const teamCountSelect = document.getElementById("teamCount");
const yourTeamSelect = document.getElementById("yourTeamSelect");
const myPickSelect = document.getElementById("myPickIndex");
const startDraftBtn = document.getElementById("startDraftBtn");
const currentPickDisplay = document.getElementById("currentPickDisplay");
const teamNamesContainer = document.getElementById("teamNames");
const editBtn = document.getElementById("editTiersBtn");

// ---- TEAM INPUT LOGIC ----
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

// ---- DRAFT LOGIC ----

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

  if (currentPick >= draftOrder.length) currentPick = 0; // reset if draft finished previously

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

// --- FILTER & RESET ---
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

// ---- TIER LOGIC ----
function initDefaultTiers() {
  tiers = [{ name: "Tier 1", index: 0 }];
  let tierNum = 2;
  // Example: after every 5, place a tier, adjust as needed for your flow
  for (let i = 5; i < players.length; i += 5) {
    tiers.push({ name: `Tier ${tierNum++}`, index: i });
  }
}

function movePlayer(oldIdx, newIdx) {
  if (oldIdx === newIdx || newIdx < 0 || newIdx >= players.length) return;
  const p = players.splice(oldIdx, 1)[0];
  players.splice(newIdx, 0, p);
  // update player numbers to match new ranking
  players.forEach((pl, i) => pl.id = i + 1);
  saveAll();
  renderTable();
}

// --- ADD, REMOVE, and MOVE TIERS ---
function addTierAt(idx) {
  const num = tiers.length + 1;
  tiers.push({ name: `Tier ${num}`, index: idx });
  tiers.sort((a, b) => a.index - b.index);
  saveAll();
  renderTable();
}
function removeTierAt(idx) {
  if (tiers.length <= 1) return; // always keep at least Tier 1
  const tierIdx = tiers.findIndex(t => t.index === idx);
  if (tierIdx > 0) { // Don't remove Tier 1
    tiers.splice(tierIdx, 1);
    saveAll();
    renderTable();
  }
}
function moveTier(idx, dir) {
  const tierIdx = tiers.findIndex(t => t.index === idx);
  if (tierIdx === -1) return;
  const swapWith = tierIdx + dir;
  if (swapWith < 1 || swapWith >= tiers.length) return; // don't move above tier 1
  [tiers[tierIdx], tiers[swapWith]] = [tiers[swapWith], tiers[tierIdx]];
  saveAll();
  renderTable();
}

// ---- MAIN RENDER ----
function renderTable() {
  // Order tiers by index
  tiers.sort((a, b) => a.index - b.index);

  const keyword = searchInput.value.toLowerCase();
  const hidePicked = document.getElementById("hidePickedCheckbox").checked;
  const visiblePlayers = players.filter(player => {
    const matchesFilter = currentFilter === "ALL" || player.position === currentFilter;
    const matchesSearch = player.name.toLowerCase().includes(keyword);
    return matchesFilter && matchesSearch && (!hidePicked || !player.drafted);
  });

  tableBody.innerHTML = "";
  document.getElementById("myQB").innerHTML = "";
  document.getElementById("myRB").innerHTML = "";
  document.getElementById("myWR").innerHTML = "";
  document.getElementById("myTE").innerHTML = "";

  let tierPtr = 0;
  for (let i = 0; i <= visiblePlayers.length; i++) {
    // Insert Tier Bar
    if (tierPtr < tiers.length && i === tiers[tierPtr].index) {
      const tr = document.createElement("tr");
      tr.className = "tier-divider-tr";
      const td = document.createElement("td");
      td.className = "tier-divider-td";
      td.colSpan = 5;

      // --- Tier Bar Content ---
      const bar = document.createElement("div");
      bar.className = "tier-divider-bar";
      bar.innerHTML = `
        <span class="tier-divider-label">${tiers[tierPtr].name}</span>
        ${editMode && tierPtr > 0 ? `
          <button class="tier-move-btn" onclick="moveTier(${tiers[tierPtr].index},-1)">&#8593;</button>
          <button class="tier-move-btn" onclick="moveTier(${tiers[tierPtr].index},1)">&#8595;</button>
          <button class="tier-remove-btn" onclick="removeTierAt(${tiers[tierPtr].index})">&times;</button>
        ` : ''}
      `;
      td.appendChild(bar);
      tr.appendChild(td);
      tableBody.appendChild(tr);
      tierPtr++;
    }
    if (i < visiblePlayers.length) {
      const player = visiblePlayers[i];
      const tr = document.createElement("tr");
      tr.classList.add(player.position);
      if (player.drafted) tr.classList.add("strikethrough");
      if (player.draftedBy === teamNames[myTeamIndex]) tr.classList.add("highlight");
      if (player.pickNumber === currentPick && player.draftedBy !== teamNames[myTeamIndex]) tr.classList.add("recent-pick");
      tr.addEventListener("dblclick", () => {
        toggleDrafted(player.id);
      });

      // --- Add Plus for New Tier (editMode) ---
      if (editMode) {
        const plusTr = document.createElement("tr");
        plusTr.className = "tier-plus-row";
        const plusTd = document.createElement("td");
        plusTd.colSpan = 5;
        plusTd.innerHTML = `<button class="add-tier-btn" onclick="addTierAt(${i})">+</button>`;
        plusTr.appendChild(plusTd);
        tableBody.appendChild(plusTr);
      }

      // --- Player Row ---
      const cbCell = document.createElement("td");
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = player.drafted;
      cb.dataset.id = player.id;
      cb.addEventListener("change", () => {
        toggleDrafted(player.id);
      });
      cbCell.appendChild(cb);

      const numCell = document.createElement("td");
      numCell.textContent = player.id;

      const nameCell = document.createElement("td");
      nameCell.textContent = player.name;
      if (tr.classList.contains("recent-pick")) {
        const pickNumberBox = document.createElement("span");
        pickNumberBox.className = "pick-number-box";
        pickNumberBox.textContent = `Pick ${player.pickNumber}`;
        nameCell.appendChild(pickNumberBox);
      }

      const posCell = document.createElement("td");
      posCell.textContent = player.position;
      const draftedByCell = document.createElement("td");
      draftedByCell.textContent = player.draftedBy || "";

      tr.appendChild(cbCell);
      tr.appendChild(numCell);
      tr.appendChild(nameCell);
      tr.appendChild(posCell);
      tr.appendChild(draftedByCell);

      // --- Move Player Buttons in Edit Mode ---
      if (editMode) {
        const upBtn = document.createElement("button");
        upBtn.className = "player-move-btn";
        upBtn.innerHTML = "&#8593;";
        upBtn.onclick = (e) => { e.stopPropagation(); movePlayer(i, i - 1); };
        const downBtn = document.createElement("button");
        downBtn.className = "player-move-btn";
        downBtn.innerHTML = "&#8595;";
        downBtn.onclick = (e) => { e.stopPropagation(); movePlayer(i, i + 1); };
        tr.appendChild(upBtn);
        tr.appendChild(downBtn);
      }

      tableBody.appendChild(tr);

      // "My picks" lists
      if (player.draftedBy === teamNames[myTeamIndex]) {
        const li = document.createElement("li");
        li.textContent = `${player.name} (${player.tag})`;
        document.getElementById("my" + player.position).appendChild(li);
      }
    }
  }
}

// --- INIT ---
populateTeamCountOptions();
generateTeamNameInputs();
initDefaultTiers();
loadAll();
renderTable();
updateCurrentPickDisplay();
validateStartDraftButton();

searchInput.addEventListener("input", renderTable);

if (editBtn) {
  editBtn.addEventListener("click", () => {
    editMode = !editMode;
    editBtn.textContent = editMode ? "Done" : "Edit Tiers";
    renderTable();
  });
}

window.addEventListener("message", (event) => {
  if (event.source !== window) return;
  if (event.data?.type === "DRAFTED_PLAYERS") {
    const picks = event.data.payload;
    picks.forEach(pickedName => {
      const rows = document.querySelectorAll("#playerTable tbody tr");
      for (const row of rows) {
        const nameCell = row.cells[2];
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
