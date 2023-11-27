import { generateGrossIncomes } from "./ChartHelpers";



test('get the taxable income', () => {
    expect(generateGrossIncomes(40000, 50000)).toEqual([40000, 45000, 50000]);
});