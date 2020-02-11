import { useState, useEffect } from 'react';
import { getLiuliList, SearchType } from '../../core/net/http.service';
import { Button } from 'antd';
import { Title } from './title';
import { Filter } from './filter';
import { List } from './list';
import './index.less';
export default () => {
    const [list, setList] = useState();
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getLiuliList(page, filter as SearchType).then(re => {
            if (!list) {
                setList(re);
            } else {
                const newList = {
                    data: [...list.data, ...re.data],
                };
                setList(newList);
            }
            setLoading(false);
        });
    }, [filter, page]);

    const onFilterChange = (value: string) => {
        setFilter(value);
    };

    const onPageChange = () => {
        setPage(page + 1);
    };
    return <div className='liuliget'>
    <Title></Title>
    <Filter onChange = {onFilterChange}></Filter>
    <List list = {list}></List>
    {loading ? <div className='load-container'><div className='boxLoading'></div></div> : null}
    {list && !loading ? <div onClick={onPageChange} className='load-more'><Button>加载更多</Button></div> : null }
</div>;
};
