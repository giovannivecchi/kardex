const array = require("./db.json");

Object.defineProperty(array, "toString", {
  value: function() {
    return Object.values(this);
  },
  enumerable: false
});


//console.log(array.toString());
/*
console.log(array.filter((p)=>{
    return p.favorecido.id == 2478
}))
*/
var maior = Math.max.apply(null, array.produce );

console.log(maior);
