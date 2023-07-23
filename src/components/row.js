import {useState} from "react";
import {SaveIcon} from "@/components/icons/save.icon";
import {EyeIcon} from "@/components/icons/eye.icon";
import {TrashIcon} from "@/components/icons/trash.icon";

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

export  function Row({onUpdate, item, onOpen, onDelete}) {
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