import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [mas, setMas] = useState(props.initialData);
    const [sort, setSort] = useState(props.sorting);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState(-1);
    const [savee, setSavee] = useState('');

    useEffect(() => {
        if (props.sorting == 'DESC') {
            setMas(mas.sort((a, b) => b.id - a.id));
            setSort(props.sorting);
        } else {
            setMas(mas.sort((a, b) => a.id - b.id));
            setSort(props.sorting);
        }
    }, [props.sorting]);

    return (
        <div>
            {mas.map((item) => {
                if (!edit || item.id != id) {
                    return (
                        <div
                            onClick={(event) => {
                                setEdit(true);
                                setId(item.id);
                            }}
                            key={item.id}
                        >
                            {item.name}
                        </div>
                    );
                } else {
                    return (
                        <input
                            key={item.id}
                            defaultValue={item.name}
                            type="text"
                            onChange={function (e) {
                                setSavee(e.target.value);
                            }}
                            onKeyDown={function (e) {
                                if (e.key == 'Escape') {
                                    setEdit(false);
                                }
                                if (e.key == 'Enter') {
                                    mas.map((editItem) => {
                                        if (editItem.id == item.id) {
                                            editItem.name = savee;
                                        }
                                    });
                                    setEdit(false);
                                    setMas(mas);
                                }
                            }}
                        ></input>
                    );
                }
            })}
        </div>
    );
}
