angular-element-size
====================

Allows an Angular Scope to get to know properties of the related html element.

**Attention:** Work in progress

## Usage ##

Add as dependency to your app: `'angularElementSize'`

## Sample Use case: ##
Get to know how high an element can be depending on its position relative to the window view port:

	<div ng-element-position-top style="max-height:{{windowSize.innerHeight - elementPositionTop}}px" >
	  Window viewport: <span ng-bind="windowSize.innerHeight"></span><br>
	  Element position from top: <span ng-bind="elementPositionTopt"></span>
	</div>