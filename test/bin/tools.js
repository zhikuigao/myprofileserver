let tools = {
    /**
     * 同步到本地数据库
     */
    dbClone: function*(localUrl, remoteUrl, fromdb, todb) {
        let MongoClient = require('mongodb').MongoClient;

        let db = yield MongoClient.connect(localUrl);
        let mongoCommand = { copydb: 1, fromhost: remoteUrl, fromdb: fromdb, todb: todb };
        // let mongoCommand = { copydb: 1, fromhost: "localhost", fromdb: "cynomys", todb: "cynomystest" };
        let admin = db.admin();
        try { //删除已有db
            yield db.command({ dropDatabase: 1 });
        } catch (err) {
            console.log('drop err ===> ', err)
        }
        let data = yield admin.command(mongoCommand);
        db.close();
    }
}

module.exports = tools;
