(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* reexport */ App)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(893);
;// CONCATENATED MODULE: external "react-pure-modal"
const external_react_pure_modal_namespaceObject = require("react-pure-modal");
var external_react_pure_modal_default = /*#__PURE__*/__webpack_require__.n(external_react_pure_modal_namespaceObject);
// EXTERNAL MODULE: ./node_modules/react-pure-modal/dist/react-pure-modal.min.css
var react_pure_modal_min = __webpack_require__(375);
// EXTERNAL MODULE: ./node_modules/react-notifications/lib/notifications.css
var notifications = __webpack_require__(13);
// EXTERNAL MODULE: ./src/pages/style.css
var style = __webpack_require__(6);
;// CONCATENATED MODULE: external "react-notifications"
const external_react_notifications_namespaceObject = require("react-notifications");
;// CONCATENATED MODULE: external "antd"
const external_antd_namespaceObject = require("antd");
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: ./src/hooks/usePagination.hook.js

const usePaginationHook = ({ countPerPage , defaultPage  })=>{
    const [page, setPage] = (0,external_react_.useState)(defaultPage ?? 1);
    const [countPerPageState, setCountPerPage] = (0,external_react_.useState)(countPerPage ?? 10);
    const onChangePage = (pageNumber, recordsPerPage)=>{
        setPage(pageNumber);
        if (recordsPerPage) setCountPerPage(recordsPerPage);
    };
    return {
        countPerPage: countPerPageState,
        page,
        onChangePage
    };
};

;// CONCATENATED MODULE: ./src/hooks/useApp.hook.js



const prepareOffset = (page, limit)=>{
    if (page <= 0) return 0;
    return (page - 1) * limit;
};
const useAppHook = ()=>{
    const [searchQuery, setSearchQuery] = (0,external_react_.useState)("");
    const [searchResults, setSearchResults] = (0,external_react_.useState)([]);
    const [modal, setModal] = (0,external_react_.useState)(false);
    const [product, setProduct] = (0,external_react_.useState)(null);
    const [category, setCategory] = (0,external_react_.useState)(null);
    const [total, setTotal] = (0,external_react_.useState)(0);
    const { page , countPerPage , onChangePage  } = usePaginationHook({
        countPerPage: 100,
        defaultPage: 1
    });
    const handleSearch = async ()=>{
        try {
            const response = await fetch(`/api/products-search?query=${encodeURIComponent(searchQuery)}&category=${category}&skip=${prepareOffset(page, 100)}&limit=100`);
            const data = await response.json();
            setSearchResults(data.products);
            setTotal(data.count);
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };
    (0,external_react_.useEffect)(()=>{
        console.log("toal chaned", total);
    }, [
        total
    ]);
    (0,external_react_.useEffect)(()=>{
        handleSearch();
    }, [
        category,
        page,
        searchQuery
    ]);
    const openProduct = (product)=>{
        setProduct(product);
        setModal(true);
    };
    const deleteItem = async (translated_name)=>{
        const response = await fetch(`/api/products-search?translated_name=${translated_name}`, {
            method: "DELETE"
        });
        await response.json();
        setModal(false);
        handleSearch();
        external_react_notifications_namespaceObject.NotificationManager.success("Success message", "Видалено");
    // setSearchResults(data);
    };
    const saveProductName = async (origin_name, translated_name)=>{
        const response = await fetch(`/api/products-search?origin_name=${origin_name}&translated_name=${translated_name}`, {
            method: "PATCH"
        });
        await response.json();
        setModal(false);
        external_react_notifications_namespaceObject.NotificationManager.success("Success message", "Оновлено");
        handleSearch();
    };
    return {
        handleSearch,
        saveProductName,
        category,
        searchResults,
        setCategory,
        setSearchQuery,
        setModal,
        setProduct,
        modal,
        product,
        deleteItem,
        searchQuery,
        openProduct,
        total,
        page,
        onChangePage,
        countPerPage
    };
};
function getCategories() {
    return [
        "Campina",
        "Coca-Cola",
        "Mars",
        "Nestle (Нестле)",
        "Баранина и дичь",
        "Бобовые",
        "Варенье и джемы",
        "Вода и напитки",
        "Вторые блюда",
        "Выпечка",
        "Гарниры",
        "Говядина и телятина",
        "Грибы",
        "Десерты",
        "Жиры и масла",
        "Заготовки",
        "Закуски",
        "Каши",
        "Кондитерские изделия",
        "Крупы, мука, макароны",
        "Макдоналдс",
        "Молочные продукты",
        "Напитки",
        "Овощи и зелень",
        "Орехи и семена",
        "Первые блюда",
        "Птица",
        "Ресторанная еда",
        "Рыба и морепродукты",
        "Салаты",
        "Свинина",
        "Снеки",
        "Соки",
        "Сосиски и колбаса",
        "Соусы и заправки",
        "Травы, специи и соусы",
        "Фаст-фуд",
        "Фрукты и ягоды",
        "Хлеб и выпечка",
        "Яйца и продукты из яиц"
    ];
}

;// CONCATENATED MODULE: ./src/components/pagination.js



const Pagination = ({ totalItems , defaultPage , onChangePage , defaultPageSize  })=>{
    const [page, setPage] = (0,external_react_.useState)(defaultPage ?? 1);
    (0,external_react_.useEffect)(()=>{
        setPage(defaultPage);
    }, [
        defaultPage
    ]);
    return /*#__PURE__*/ jsx_runtime.jsx(external_antd_namespaceObject.Pagination, {
        total: totalItems,
        pageSize: defaultPageSize ?? 10,
        onChange: (pageNum, pageSize)=>onChangePage(pageNum)
    });
};

;// CONCATENATED MODULE: ./src/components/closeModal.button.js

function CloseModalButton() {
    const sx = {
        title: {
            color: "#000",
            margin: "0 7px 0 -40px",
            width: "100px",
            background: "#7582c6"
        }
    };
    return /*#__PURE__*/ jsx_runtime.jsx("h1", {
        style: sx.title,
        children: "Close"
    });
}

;// CONCATENATED MODULE: ./src/constants/index.js
function getTranslate() {
    return {
        "category": "категорія",
        "origin_name": "назва походження",
        "proteins": "білки",
        "fats": "жири",
        "water": "вода",
        "ash": "зола",
        "vitamin_b1_thiamine": "вітамін В1_тіамін",
        "vitamin_b2_riboflavin": "вітамін В2_рибофлавін",
        "potassium_k": "калій",
        "calcium_ca": "кальцій",
        "magnesium_mg": "магній",
        "sodium_na": "натрій",
        "sulfur_s": "сірка",
        "phosphorus_p": "фосфор",
        "iron_fe": "залізо",
        "manganese_mn": "марганець",
        "copper_cu": "мідь",
        "selenium_se": "селен",
        "zinc_zn": "цинк",
        "cholesterol": "холестерин",
        "saturated_fatty_acids": "насичені жирні_кислоти",
        "palmitic_acid": "пальмітинова кислота",
        "stearic_acid": "стеаринова кислота",
        "monounsaturated_fatty_acids": "одноненасичені жирні_кислоти",
        "polyunsaturated_fatty_acids": "багатоненасичені жирні_кислоти",
        "linoleic_acid": "лінолева кислота",
        "linolenic_acid": "ліноленова кислота",
        "omega_3_fatty_acids": "омега 3_жирні_кислоти",
        "omega_6_fatty_acids": "омега 6_жирні_кислоти",
        "translated_name": "перекладена назва"
    };
}
function getTransalteV2() {
    return {
        "category": "Категорія",
        "origin_name": "Назва походження",
        "proteins": "Білки",
        "fats": "Жири",
        "water": "Вода",
        "ash": "Зола",
        "vitamin_b1_thiamine": "Вітамін B1 (Тіамін)",
        "vitamin_b2_riboflavin": "Вітамін B2 (Рибофлавін)",
        "vitamin_b4_choline": "Вітамін B4 (Холін)",
        "vitamin_b5_pantothenic_acid": "Вітамін B5 (Пантотенова кислота)",
        "vitamin_b6_pyridoxine": "Вітамін B6 (Піридоксин)",
        "vitamin_b9_folate": "Вітамін B9 (Фолієва кислота)",
        "vitamin_b12_cobalamin": "Вітамін B12 (Кобаламін)",
        "vitamin_e_alpha_tocopherol": "Вітамін E (Альфа-токоферол)",
        "vitamin_h_biotin": "Вітамін H (Біотин)",
        "vitamin_pp_ne": "Вітамін PP (Ніацин еквівалент)",
        "potassium_k": "Калій",
        "calcium_ca": "Кальцій",
        "magnesium_mg": "Магній",
        "sodium_na": "Натрій",
        "sulfur_s": "Сірка",
        "phosphorus_p": "Фосфор",
        "chlorine_cl": "Хлор",
        "iron_fe": "Залізо",
        "iodine_i": "Йод",
        "cobalt_co": "Кобальт",
        "manganese_mn": "Марганець",
        "copper_cu": "Мідь",
        "molybdenum_mo": "Молібден",
        "fluorine_f": "Фтор",
        "chromium_cr": "Хром",
        "zinc_zn": "Цинк",
        "cholesterol": "Холестерин",
        "saturated_fatty_acids": "Насичені жирні кислоти",
        "palmitic_acid": "Пальмітинова кислота",
        "stearic_acid": "Стеаринова кислота",
        "monounsaturated_fatty_acids": "Мононенасичені жирні кислоти",
        "polyunsaturated_fatty_acids": "Багатоненасичені жирні кислоти",
        "linoleic_acid": "Лінолева кислота",
        "linolenic_acid": "Ліноленова кислота",
        "omega_3_fatty_acids": "Омега-3 жирні кислоти",
        "omega_6_fatty_acids": "Омега-6 жирні кислоти",
        "translated_name": "Перекладена назва",
        "carbohydrates": "Вуглеводи",
        "dietary_fiber": "Харчові волокна",
        "trans_fats": "трансжири"
    };
}

;// CONCATENATED MODULE: ./src/components/icons/save.icon.js

function SaveIcon() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                fill: "var(--ci-primary-color, currentColor)",
                d: "M472.971,122.344,373.656,23.029A23.838,23.838,0,0,0,356.687,16H56A24.028,24.028,0,0,0,32,40V472a24.028,24.028,0,0,0,24,24H456a24.028,24.028,0,0,0,24-24V139.313A23.838,23.838,0,0,0,472.971,122.344ZM320,48v96H176V48ZM448,464H64V48h80V176H352V48h1.373L448,142.627Z",
                className: "ci-primary"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                fill: "var(--ci-primary-color, currentColor)",
                d: "M252,224a92,92,0,1,0,92,92A92.1,92.1,0,0,0,252,224Zm0,152a60,60,0,1,1,60-60A60.068,60.068,0,0,1,252,376Z",
                className: "ci-primary"
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/icons/eye.icon.js

function EyeIcon() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16",
        fill: "currentColor",
        className: "bi bi-eye",
        viewBox: "0 0 16 16",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                d: "M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                d: "M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/icons/trash.icon.js

function TrashIcon() {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "16",
        height: "16",
        fill: "currentColor",
        className: "bi bi-trash",
        viewBox: "0 0 16 16",
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                d: "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("path", {
                "fill-rule": "evenodd",
                d: "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/components/row.js





const getStyles = ()=>{
    return {
        itemContainer: {
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-between",
            margin: "20px 0"
        },
        actionsContainer: {
            display: "flex",
            gap: "20px"
        },
        itemTItle: {
            border: "1px #fff solid",
            maxWidth: "50%"
        },
        deleteBtn: {
            maxHeight: "30px",
            margin: "auto 0",
            padding: "10px 10px",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            background: "#8f0000"
        }
    };
};
function Row({ onUpdate , item , onOpen , onDelete  }) {
    const sx = getStyles();
    const [name, setName] = (0,external_react_.useState)(item.translated_name ?? "");
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        style: sx.itemContainer,
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("div", {
                children: /*#__PURE__*/ jsx_runtime.jsx("input", {
                    type: "text",
                    value: name,
                    onChange: (e)=>setName(e.target.value)
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                style: sx.actionsContainer,
                children: [
                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                        onClick: ()=>onUpdate(item.origin_name, name),
                        children: /*#__PURE__*/ jsx_runtime.jsx(SaveIcon, {})
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("p", {
                        onClick: ()=>onOpen(item),
                        children: /*#__PURE__*/ jsx_runtime.jsx(EyeIcon, {})
                    }),
                    /*#__PURE__*/ jsx_runtime.jsx("button", {
                        style: sx.deleteBtn,
                        onClick: ()=>onDelete(item.translated_name),
                        children: /*#__PURE__*/ jsx_runtime.jsx(TrashIcon, {})
                    })
                ]
            })
        ]
    });
}

;// CONCATENATED MODULE: ./src/pages/_app.js












const t = getTransalteV2();
const _app_getStyles = ()=>{
    return {
        itemContainer: {
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "space-between",
            margin: "20px 0"
        },
        actionsContainer: {
            display: "flex",
            gap: "20px"
        },
        itemTItle: {
            border: "1px #fff solid",
            maxWidth: "50%"
        },
        deleteBtn: {
            maxHeight: "30px",
            margin: "auto 0",
            padding: "10px 10px",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            background: "#8f0000"
        }
    };
};
function App() {
    const sx = _app_getStyles();
    const ctx = useAppHook();
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
        children: [
            /*#__PURE__*/ jsx_runtime.jsx("h1", {
                children: "Product Search"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(external_antd_namespaceObject.Select, {
                style: {
                    width: "300px"
                },
                options: getCategories().map((el)=>({
                        label: el,
                        value: el
                    })),
                defaultValue: ctx.category,
                onChange: (val)=>ctx.setCategory(val)
            }),
            /*#__PURE__*/ jsx_runtime.jsx("input", {
                type: "text",
                value: ctx.searchQuery,
                onChange: (e)=>ctx.setSearchQuery(e.target.value)
            }),
            /*#__PURE__*/ jsx_runtime.jsx("button", {
                onClick: ctx.handleSearch,
                children: "Search"
            }),
            /*#__PURE__*/ jsx_runtime.jsx("ul", {
                children: ctx.searchResults.map((product)=>/*#__PURE__*/ jsx_runtime.jsx("li", {
                        style: sx.itemContainer,
                        children: /*#__PURE__*/ jsx_runtime.jsx(Row, {
                            onOpen: ctx.openProduct,
                            onDelete: ctx.deleteItem,
                            onUpdate: ctx.saveProductName,
                            item: product
                        })
                    }, product._id))
            }),
            /*#__PURE__*/ jsx_runtime.jsx(external_antd_namespaceObject.Button, {
                children: "Ant design buttion"
            }),
            /*#__PURE__*/ jsx_runtime.jsx(external_react_notifications_namespaceObject.NotificationContainer, {}),
            /*#__PURE__*/ jsx_runtime.jsx((external_react_pure_modal_default()), {
                header: ctx.product ? ctx.product.translated_name : null,
                footer: /*#__PURE__*/ jsx_runtime.jsx("div", {
                    children: /*#__PURE__*/ jsx_runtime.jsx("button", {
                        style: sx.deleteBtn,
                        onClick: ()=>ctx.deleteItem(ctx.product.translated_name),
                        children: "Delete"
                    })
                }),
                isOpen: ctx.modal,
                closeButton: /*#__PURE__*/ jsx_runtime.jsx(CloseModalButton, {}),
                closeButtonPosition: "bottom",
                onClose: ()=>{
                    ctx.setModal(false);
                    return true;
                },
                children: ctx.product ? Object.keys(ctx.product).map((key)=>key !== "_id" ? /*#__PURE__*/ (0,jsx_runtime.jsxs)("p", {
                        children: [
                            t[key],
                            " : ",
                            ctx.product[key]
                        ]
                    }) : null) : null
            }),
            /*#__PURE__*/ jsx_runtime.jsx(Pagination, {
                totalItems: ctx.total,
                defaultPage: ctx.page,
                onChangePage: ctx.onChangePage,
                defaultPageSize: ctx.countPerPage
            })
        ]
    });
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader.js?page=%2F_app&absolutePagePath=private-next-pages%2F_app.js&preferredRegion=!

        // Next.js Route Loader
        
        
    

/***/ }),

/***/ 13:
/***/ (() => {



/***/ }),

/***/ 375:
/***/ (() => {



/***/ }),

/***/ 6:
/***/ (() => {



/***/ }),

/***/ 689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [893], () => (__webpack_exec__(777)));
module.exports = __webpack_exports__;

})();