import {useState} from 'react';
import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import 'react-notifications/lib/notifications.css';
import "./style.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';


const t = getTransalteV2()

const getStyles = () => {
    return {
        itemContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: "space-between",
            margin: '20px 0'
        },
        actionsContainer: {
            display: 'flex',
            gap: '20px'
        },
        itemTItle: {
            border: '1px #fff solid',
            maxWidth: '50%'
        },
        deleteBtn: {
            maxHeight: '30px',
            margin: 'auto 0',
            padding: "10px 10px",
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            background: '#8f0000'
        }
    }
}
export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState(null);
    const sx = getStyles()

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/products-search?query=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const openProduct = (product) => {
        setProduct(product)
        setModal(true)
    }
    const deleteItem = async (translated_name) => {
        const response = await fetch(`/api/products-search?translated_name=${translated_name}`, {
            method: "DELETE"
        });

        await response.json();
        setModal(false)
        handleSearch()
        NotificationManager.success('Success message', 'Видалено')
        // setSearchResults(data);
    }

    const saveProductName = async (origin_name, translated_name) => {
        const response = await fetch(`/api/products-search?origin_name=${origin_name}&translated_name=${translated_name}`, {
            method: "PATCH"
        });

        await response.json();
        setModal(false)
        NotificationManager.success('Success message', 'Оновлено')
        handleSearch()
    }

    return (
        <div>
            <h1>Product Search</h1>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button onClick={handleSearch}>Search</button>
            <ul>
                {searchResults.map((product) => (
                    <li key={product._id} style={sx.itemContainer}>
                        <Row
                            onOpen={openProduct}
                            onDelete={deleteItem}
                            onUpdate={saveProductName}
                            item={product}
                        />
                    </li>
                ))}
            </ul>
            <NotificationContainer/>
            <PureModal
                header={product ? product.translated_name : null}
                footer={
                    <div>
                        <button
                            style={sx.deleteBtn}
                            onClick={() => deleteItem(product.translated_name)}>Delete
                        </button>
                    </div>
                }
                isOpen={modal}
                closeButton={<CloseModalButton/>}
                closeButtonPosition="bottom"
                onClose={() => {
                    setModal(false);
                    return true;
                }}
            >
                {product ? Object.keys(product).map(key => (
                    key !== '_id' ? <p>{t[key]} : {product[key]}</p> : null
                )) : null}

            </PureModal>
        </div>
    );
}

function CloseModalButton() {
    const sx = {
        title: {
            color: '#000',
            margin: '0 7px 0 -40px',
            width: '100px',
            background: '#7582c6'
        }
    }
    return <h1 style={sx.title}>Close</h1>
}

function Row({onUpdate, item, onOpen, onDelete}) {
    const sx = getStyles()
    const [name, setName] = useState(item.translated_name ?? '');
    return (
        <div style={sx.itemContainer}>
            <div>
                <input type={'text'} value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div style={sx.actionsContainer}>
                <p onClick={() => onUpdate(item.origin_name, name)}>
                    <SaveIcon/>
                </p>
                <p onClick={() => onOpen(item)}>
                    <EyeIcon/>
                </p>

                <button
                    style={sx.deleteBtn}
                    onClick={() => onDelete(item.translated_name)}><TrashIcon/>
                </button>
            </div>

        </div>
    )
}


function EyeIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye"
                viewBox="0 0 16 16">
        <path
            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
}

function TrashIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash"
                viewBox="0 0 16 16">
        <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
}

function SaveIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="var(--ci-primary-color, currentColor)"
              d="M472.971,122.344,373.656,23.029A23.838,23.838,0,0,0,356.687,16H56A24.028,24.028,0,0,0,32,40V472a24.028,24.028,0,0,0,24,24H456a24.028,24.028,0,0,0,24-24V139.313A23.838,23.838,0,0,0,472.971,122.344ZM320,48v96H176V48ZM448,464H64V48h80V176H352V48h1.373L448,142.627Z"
              className="ci-primary"/>
        <path fill="var(--ci-primary-color, currentColor)"
              d="M252,224a92,92,0,1,0,92,92A92.1,92.1,0,0,0,252,224Zm0,152a60,60,0,1,1,60-60A60.068,60.068,0,0,1,252,376Z"
              className="ci-primary"/>
    </svg>
}

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
    }
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
        "dietary_fiber": "Харчові волокна"
    }
}
