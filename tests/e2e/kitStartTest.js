describe('integration test', function(){

    it('should be load', function(){
        browser.get('http://localhost:8888/')
        browser.waitForAngular();
        $('.active a').click();
        expect($('.main h2').getText()).toEqual('KitStart');

        browser.sleep(2000)
    })
})