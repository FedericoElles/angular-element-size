/**
 * Library containing everything needed to make elements behave according to the 
 * window viewport or their own size.
 * In progress
 *
 */

angular.module('angularElementSize', [])

/**
 * Return a service which provides a variable "innerHeight" with
 * the value of the current window inner height
 */
.factory('windowSize',function($window, $timeout){
  var common = {};
  // screen height
  var w = angular.element($window);
  common.innerHeight = w[0].innerHeight;
  w.bind('resize', function () {
    common.innerHeight = w[0].innerHeight;
  });
  return common;
})

/**
 * elementPositionTop: the absolute position of the element relative to the viewpart
 */
.directive('ngSize', function ($window) {
  return{
    scope:true,
    priority: 0,
    link: function (scope, element) {
      scope.$watch(function(){return element[0].scrollHeight ; }, function(newValue, oldValue) {
        //console.log('element[0].scrollHeight',element[0].scrollHeight)
        //WTF only assign new value, if difference larger than 50px
        if (Math.abs(newValue-oldValue) > 50){
          scope.elementHeight=element[0].scrollHeight;
        }
      });
    }
  }
})

/**
 * elementPositionTop: the absolute position of the element relative to the viewpart
 */
.directive('ngElementPositionTop', function ($window) {
  return{
    scope:true,
    priority: 0,
    link: function (scope, element) {
      var _update = function(){
        scope.elementPositionTop = element[0].getBoundingClientRect().top;      
      };
      angular.element($window).bind('resize', function () {
        _update();
      });
      _update();
    }
  }
})

/**
 *  Example:
 *  ng-has-scrollbar="sidebar-container-search"
 *  ng-class="{'no-scroll': !hasScrollbar}"
 * 
 */
.directive('ngHasScrollbar', function ($window) {
  return{
    scope:true,
    priority: 0,
    link: function (scope, element, attrs) {
      var tag = element[0],
          altTag;
      
      //use alternative tag if value passed
      if (attrs.ngHasScrollbar){
        altTag = document.getElementById(attrs.ngHasScrollbar);
        if (altTag){
          tag = altTag;
        }
      }
      
      scope.$watch(function(newVal){
          return tag.scrollHeight > tag.clientHeight; 
        }, function(newValue, oldValue) {
        console.log('ngHasScrollbar', newValue, tag);
        if (newValue === true || newValue === false){
          scope.hasScrollbar = newValue;
          //console.log('ngHasScrollbar: true');
        }
      });
    }
  }
})



;
