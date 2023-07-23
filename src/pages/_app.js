import PureModal from 'react-pure-modal';
import 'react-pure-modal/dist/react-pure-modal.min.css';
import 'react-notifications/lib/notifications.css';
import "./style.css"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Button, Select} from "antd";
import {getCategories, useAppHook} from "@/hooks/useApp.hook";
import {Pagination} from "@/components/pagination";
import {CloseModalButton} from "@/components/closeModal.button";
import {getTransalteV2} from "@/constants";
import {Row} from "@/components/row";


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
    const sx = getStyles()
    const ctx = useAppHook()

    return (
        <div>
            <h1>Product Search</h1>
            <Select
                style={{width: '300px'}}
                options={getCategories().map(el => ({
                    label: el,
                    value: el
                }))}
                defaultValue={ctx.category}
                onChange={val => ctx.setCategory(val)}

            ></Select>
            <input type="text" value={ctx.searchQuery} onChange={(e) => ctx.setSearchQuery(e.target.value)}/>
            <button onClick={ctx.handleSearch}>Search</button>

            <ul>
                {ctx.searchResults.map((product) => (
                    <li key={product._id} style={sx.itemContainer}>
                        <Row
                            onOpen={ctx.openProduct}
                            onDelete={ctx.deleteItem}
                            onUpdate={ctx.saveProductName}
                            item={product}
                        />
                    </li>
                ))}
            </ul>
            <Button>Ant design buttion</Button>
            <NotificationContainer/>
            <PureModal
                header={ctx.product ? ctx.product.translated_name : null}
                footer={
                    <div>
                        <button
                            style={sx.deleteBtn}
                            onClick={() => ctx.deleteItem(ctx.product.translated_name)}>Delete
                        </button>
                    </div>
                }
                isOpen={ctx.modal}
                closeButton={<CloseModalButton/>}
                closeButtonPosition="bottom"
                onClose={() => {
                    ctx.setModal(false);
                    return true;
                }}
            >
                {ctx.product ? Object.keys(ctx.product).map(key => (
                    key !== '_id' ? <p>{t[key]} : {ctx.product[key]}</p> : null
                )) : null}

            </PureModal>
            <Pagination
                totalItems={ctx.total}
                defaultPage={ctx.page}
                onChangePage={ctx.onChangePage}
                defaultPageSize={ctx.countPerPage}
            />
        </div>
    );
}
