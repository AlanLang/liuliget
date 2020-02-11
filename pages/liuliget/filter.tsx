import { Radio } from 'antd';

export const Filter = (prop: PropStyle) => {
    const {onChange} = prop;

    return <div style={{padding: '15px'}}>
        <Radio.Group defaultValue="all" onChange= {
            (e) => {
                onChange(e.target.value);
            }
        }>
            <Radio.Button value="all">全部</Radio.Button>
            <Radio.Button value="anime">动画</Radio.Button>
            <Radio.Button value="comic">漫画</Radio.Button>
            <Radio.Button value="game">游戏</Radio.Button>
            <Radio.Button value="op">音乐</Radio.Button>
            <Radio.Button value="book">图书</Radio.Button>
        </Radio.Group>
    </div>
}

interface PropStyle {
    onChange: (value: string) =>  void;
}