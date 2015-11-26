var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://testing:tEst1ng@ds039484.mongolab.com:39484/testing');
var db = mongoose.connect('mongodb://testing:tEst1ng@ds039484.mongolab.com:39484/testing');
var test = new mongoose.Schema({
    name: 'String',
    test: 'String',
    run: 'Date',
    runName: 'String',
    suite: {
        name: 'String',
        timeElapsed: 'string',
        error: 'string'
    },
    hasPassed: 'Boolean',
    timeElapsed: 'Date',
    skipped: 'Boolean',
    error: 'String',
    fields: 'array'
});
var dbModel = db.model('starts', test)

function getRunsId(req, res) {
    dbModel.distinct("run", function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            res.write(JSON.stringify(docs))
            res.end()
        }

    })
}
function getTests(req, res) {
    dbModel.find({'run': req.run}, null, function (err, docs) {

        if (err) {
            console.log(err)
        }
        else {
            res.write(JSON.stringify(docs))
            res.end()
        }
    })
}

function putField() {
    dbModel.update( { _name: "Check \"Check Your Answer Status\" Link" } , { $push: { fields: { name:"peter", sname: "semen" } } } );
}
//putField()
exports.getRunsId = getRunsId
exports.getTests = getTests