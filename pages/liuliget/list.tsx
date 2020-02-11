import { PageResult, PageData } from '../../core/net/http.service';
import { getDownloadUrl } from '../../core/net/http.service';
import { message, Icon } from 'antd';
import copy from 'copy-to-clipboard';
import { useEffect } from 'react';

const getUrl = (link: string): Promise<string> => {
    const loading = message.loading('正在获取下载链接');
    return getDownloadUrl(link).then(re => {
        loading();
        return re;
    });
};

const ListItem = (prop: {
    key: string;
    data: PageData;
}) => {
    const {title, description, img, moreLink, type} = prop.data;
    const copyUrl = () => {
        getUrl(moreLink).then(downUrl => {
            if (copy(downUrl)) {
                message.success('下载链接已复制到剪切板');
              } else {
                message.error('获取下载链接失败');
            }
        });
    };

    return <div className='list-content'>
        <div className='list-item-content'>
            <div className='list-title' onClick = {() => {window.open(moreLink); }}>{title.trim()}</div>
            <div className='list-description'>{description.trim() ? description : '无'}</div>
            <div className='list-actions'>
                {
                    type.map(item => <div key={item} className='type'>{item}</div>)
                }
                <div onClick={copyUrl}><Icon type='copy' />拷贝</div>
            </div>
        </div>
        <div className='list-image-content'>
            <img className='list-image' src = {img}></img>
        </div>
    </div>;
};

export const List = (prop: PropStyle) => {
    const { list } = prop;

    const renderDataList = () => {
        if (!list) {
            return   <div></div>;
        }
        return list.data.filter(item => item.title).map(item => <ListItem data = {item} key = {item.title}/>);
    };
    return <div className='liuliget-list'>
        {renderDataList()}
    </div>;
};

interface PropStyle {
    list: PageResult;
}
