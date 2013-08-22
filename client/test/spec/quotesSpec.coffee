

describe 'service: quotesService', ->
  sut = undefined

  beforeEach module('quotesModule')

  beforeEach inject(($injector) ->
    sut = $injector.get('quotesService')
  )

  describe 'getQuote', ->
    it 'returns an object', ->
      quote = sut.getQuote()
      expect(quote).toBeDefined()
