"use strict";
(() => {
var exports = {};
exports.id = 453;
exports.ids = [453];
exports.modules = {

/***/ 295:
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),

/***/ 543:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "connectToDatabase": () => (/* binding */ connectToDatabase),
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(295);
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

const uri = "mongodb+srv://superadmin:*****@mycluster.bgop5ml.mongodb.net/fitness_app";
// process.env.MONGODB_URI;
const options = {
    useUnifiedTopology: true
};
let client;
let db;
async function connectToDatabase() {
    if (!client) {
        client = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri, options);
        await client.connect();
        db = client.db();
    }
    return {
        db
    };
}
async function handler(req, res) {
    const { query  } = req.query;
    try {
        const { db  } = await connectToDatabase();
        const products = await db.collection("products_v2").find({
            translated_name: {
                $regex: query,
                $options: "i"
            }
        }).toArray();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({
            error: "An error occurred while searching products"
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
var __webpack_exports__ = (__webpack_exec__(543));
module.exports = __webpack_exports__;

})();