export const Objects = [	
{ location: [0,0], description: {type:'sword', imgSrc: require('../resources/images/objects/sword.png')}, interact: {"gain":"sword","remove":true}},

{ location: [2,15], description: {type:'chest', imgSrc: require('../resources/images/objects/chest.png')}, interact: {"chance":[{"coin":50},{"arrow":20},{"coin":200},{"sword":100}],"remove":true,"requires":"key"}},

{ location: [1,13], description: {type:'key', imgSrc: require('../resources/images/objects/key.png')}, interact: {"gain":"key","remove":true}},

{ location: [7,0], description: {type:'bow', imgSrc: require('../resources/images/objects/bow.png')}, interact: {"gain":"bow","remove":true}},

{ location: [6,14], description: {type:'arrow', imgSrc: require('../resources/images/objects/arrow.png')}, interact: {"gain":"arrow","remove":true}},

{ location: [0,20], description: {type:'exit', imgSrc: require('../resources/images/objects/exit.jpg')}, interact: {"nextLevel":1,"remove":false}},

{ location: [1,1], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [1,6], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [5,5], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [8,0], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [12,3], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [9,7], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [7,12], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [1,10], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [9,19], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [14,16], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [18,19], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [16,9], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [20,17], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [17,3], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},

{ location: [8,14], description: {type:'coin', imgSrc: require('../resources/images/objects/coin.gif')}, interact: {"coin":1,"remove":true}},
]
export default Objects