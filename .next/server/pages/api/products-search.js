"use strict";
(() => {
var exports = {};
exports.id = 29;
exports.ids = [29];
exports.modules = {

/***/ 295:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "connectToDatabase": () => (/* binding */ connectToDatabase),
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(295);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

const uri = "mongodb+srv://superadmin:superadmin@mycluster.bgop5ml.mongodb.net/fitness_app";
// process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true
};
let client;
let _db;
async function connectToDatabase() {
    if (!client) {
        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);
        await client.connect();
        _db = client.db();
    }
    return _db;
}
// const db = connectToDatabase();
const getCollection = async ()=>{
    const db = await connectToDatabase();
    return db.collection("products_v3");
};
const search = async (req, res)=>{
    const { query , skip =0 , limit =100 , category  } = req.query;
    const col = await getCollection();
    let filter = query || category ? {
        translated_name: {
            $regex: query,
            $options: "i"
        },
        category
    } : {};
    const count = await col.find(filter).count();
    console.log("skiplimit", skip, limit);
    const products = await col.find(filter).skip(+skip).limit(+limit).toArray();
    console.log("skip limit", skip, limit);
    res.status(200).json({
        products,
        count
    });
};
const update = async (req, res)=>{
    const { translated_name , origin_name  } = req.query;
    const col = await getCollection();
    await col.updateOne({
        origin_name
    }, {
        $set: {
            translated_name
        }
    });
    res.status(200).json({
        deleted: true
    });
};
const deleteItem = async (req, res)=>{
    const { translated_name  } = req.query;
    const col = await getCollection();
    const delted = await col.deleteOne({
        translated_name
    });
    res.status(200).json({
        deleted: true
    });
};
async function handler(req, res) {
    try {
        if (req.method === "GET") {
            await search(req, res);
        } else if (req.method === "DELETE") {
            await deleteItem(req, res);
        } else if (req.method === "PATCH") {
            await update(req, res);
        }
    } catch (error) {
        console.error("Error products:", error);
        res.status(500).json({
            error: "An error occurred"
        });
    }
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(798));
module.exports = __webpack_exports__;

})();