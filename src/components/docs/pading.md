## 一个 react 的简单分页组件

#### ts 声明文件
```ts
import * as React from "react";
interface PaginationProps {
    total: number;
    current: number;
    onChange: (pageNumber: number) => void;
    header?: React.ReactNode | string;
    className?: string;
    style?: object;
    hideOnSinglePage?: boolean;  // 在单页时是否隐藏分页
}
export declare function Pagination(props: PaginationProps): JSX.Element;
export default Pagination;

```

#### demo

```ts
import * as React from "react";
import {Pagination} from 'pading';

function Demo() {
    const [state, setState] = React.useState({
        data: [0,1,2,3,4,5,6,7,8,9,],
        currentPage: 1
    });
    function update(object:{[key:string]: any}) {
        setState(oldState => Object.assign({},oldState, object));
    }
    return (
        <div>
            <ul>
                {
                  state.data.slice(((state.currentPage-1) * 3), state.currentPage*3).map((item) => {
                      return (
                          <li key={item}>{item}</li>    
                      )
                  })
                }
            </ul>  
            <Pagination total={10} 
                        current={1} 
                        onChange={(pageNumber) => update({currentPage: pageNumber})} />  
        </div> 
    )
}
```

#### 更新日志
[CHNAGE-LOG.md](./CHANGE-LOG.md)
