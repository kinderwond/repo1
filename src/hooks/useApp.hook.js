import {useEffect, useState} from "react";
import {NotificationManager} from "react-notifications";
import {usePaginationHook} from "@/hooks/usePagination.hook";

const prepareOffset = (page, limit) =>{
    if (page <= 0) return 0
   return   (page - 1) * limit
}

export const useAppHook = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState(null);
    const [category, setCategory] = useState(null);
    const [total, setTotal] = useState(0);
    const { page, countPerPage, onChangePage } = usePaginationHook({
        countPerPage: 100,
        defaultPage: 1,
    });

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/products-search?query=${encodeURIComponent(searchQuery)}&category=${category}&skip=${prepareOffset(page, 100)}&limit=100`);
            const data = await response.json();
            setSearchResults(data.products);

            setTotal(data.count)
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    useEffect(() => {
        console.log('toal chaned', total)
    }, [total])

    useEffect(() => {
        handleSearch()
    }, [category, page, searchQuery])

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

    return {
        handleSearch, saveProductName, category, searchResults, setCategory, setSearchQuery,
        setModal, setProduct, modal, product, deleteItem, searchQuery,
        openProduct, total, page, onChangePage, countPerPage
    }
}

export  function getCategories() {
    return [
        'Campina', 'Coca-Cola',
        'Mars', 'Nestle (Нестле)',
        'Баранина и дичь', 'Бобовые',
        'Варенье и джемы', 'Вода и напитки',
        'Вторые блюда', 'Выпечка',
        'Гарниры', 'Говядина и телятина',
        'Грибы', 'Десерты',
        'Жиры и масла', 'Заготовки',
        'Закуски', 'Каши',
        'Кондитерские изделия', 'Крупы, мука, макароны',
        'Макдоналдс', 'Молочные продукты',
        'Напитки', 'Овощи и зелень',
        'Орехи и семена', 'Первые блюда',
        'Птица', 'Ресторанная еда',
        'Рыба и морепродукты', 'Салаты',
        'Свинина', 'Снеки',
        'Соки', 'Сосиски и колбаса',
        'Соусы и заправки', 'Травы, специи и соусы',
        'Фаст-фуд', 'Фрукты и ягоды',
        'Хлеб и выпечка', 'Яйца и продукты из яиц'
    ]
}