var myapp=angular.module('myLogin.filters', []);
myapp.filter('nulltozero', function() {
  return function(input) {
      if(input==null){
    return 0;}
      return input;
  };
})
myapp.filter('cutyear', function() {
    return function(input) {
         return  input.substring(0,4);
    };
})
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
});