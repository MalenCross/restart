import { useState } from 'react';

export interface HelloWorldProps {
    grossIncome: number
}

// what triggers a rerender? set state
export function HelloWorld(props: HelloWorldProps) {
    const { grossIncome } = props;
    const [count, setCount] = useState(grossIncome);

    console.log("rendering ", count);
    return (
        <div>
            <h1>Hello World</h1>
            <div>Number is: {count}</div>
            <input
                type='number'
                value={count}
                onChange={(event: React.ChangeEvent<any>) => {
                    console.log("setting count to: ", event.target.value);
                    setCount(event.target.value)
                }} />
        </div>
    );
}
