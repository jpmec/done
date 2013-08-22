### jshint -W093 ###

'use strict'




quotesModule = angular.module 'quotesModule',
[]




quotesModule.service 'quotesService', [ ->

  @quotes = [
    who: 'Aristotle'
    said: 'We are what we repeatedly do. ' \
    + 'Excellence, therefore, is not an act but a habit.'
  ,
    who: 'Lucretius'
    said: 'Constant dripping hollows out a stone.'
  ,
    who: 'Greek Proverb'
    said: 'Well begun is half done.'
  ,
    who: 'Robert Frost'
    said: 'The best way out is always through.'
  ,
    who: 'Voltaire'
    said: 'Work spares us from three evils: boredom, vice, and need.'
  ]

  @index = @quotes.length

  @getQuote = () ->
    @index++
    @index = 0 if @index >= @quotes.length
    return @quotes[@index]
]




quotesModule.directive 'quoteMotivate', ->
  restrict: 'A'
  templateUrl: 'quotes/quote.html'

