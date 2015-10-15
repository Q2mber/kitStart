describe("A suite", function () {
    var $compile, $rootScope;

    beforeEach(function () {
        module('kitStart')
        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

        })
    });

    it("Cteate a default directive", function () {
        var directive =$compile("<div kit-directive></div>")($rootScope)
        $rootScope.$apply();
        expect(directive).toBeDefined()
        expect(directive.scope().test).toBeDefined()

    });
});